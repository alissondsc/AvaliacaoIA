import { useEffect, useMemo, useState } from 'react'
import './App.css'

const API_URL = 'http://localhost:3000/api'
const categories = ['Todos', 'Hambúrgueres', 'Porções', 'Bebidas']
const productVisuals = {
  1: { emoji: '🍔', className: 'classic' },
  2: { emoji: '🥓', className: 'bacon' },
  3: { emoji: '🧀', className: 'cheese' },
  4: { emoji: '🍟', className: 'fries' },
  5: { emoji: '🥤', className: 'soda' },
  6: { emoji: '🥤', className: 'shake' },
}

const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [category, setCategory] = useState('Todos')
  const [loading, setLoading] = useState(true)
  const [productsError, setProductsError] = useState('')
  const [orderError, setOrderError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [confirmation, setConfirmation] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadProducts() {
      try {
        const response = await fetch(`${API_URL}/products`, {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error('Não foi possível carregar o cardápio.')
        }

        const data = await response.json()
        if (!Array.isArray(data)) {
          throw new Error('A resposta do cardápio está inválida.')
        }
        setProducts(data)
        setProductsError('')
      } catch (error) {
        if (error.name !== 'AbortError') {
          setProductsError(
            'Não conseguimos conectar ao cardápio. Confira se a API está iniciada e tente novamente.',
          )
        }
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
    return () => controller.abort()
  }, [])

  const visibleProducts = useMemo(
    () =>
      category === 'Todos'
        ? products
        : products.filter((product) => product.category === category),
    [category, products],
  )

  const cartItems = useMemo(
    () =>
      products
        .filter((product) => cart[product.id])
        .map((product) => ({
          ...product,
          quantity: cart[product.id],
          subtotal: Math.round(product.price * 100) * cart[product.id],
        })),
    [cart, products],
  )

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalInCents = cartItems.reduce((sum, item) => sum + item.subtotal, 0)

  function updateQuantity(productId, amount) {
    setCart((currentCart) => {
      const nextQuantity = (currentCart[productId] || 0) + amount
      const nextCart = { ...currentCart }
      if (nextQuantity <= 0) {
        delete nextCart[productId]
      } else {
        nextCart[productId] = nextQuantity
      }
      return nextCart
    })
    setOrderError('')
    setConfirmation(null)
  }

  async function submitOrder(event) {
    event.preventDefault()
    if (!cartItems.length) {
      setOrderError('Adicione ao menos um produto antes de finalizar o pedido.')
      return
    }

    setIsSubmitting(true)
    setOrderError('')

    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems.map(({ id, quantity }) => ({
            productId: id,
            quantity,
          })),
        }),
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || 'Não foi possível enviar o pedido.')
      }

      setConfirmation(result.order)
      setCart({})
    } catch (error) {
      setOrderError(
        error.message === 'Failed to fetch'
          ? 'Não foi possível enviar o pedido. Verifique se a API está funcionando.'
          : error.message,
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Burguer House, início">
          <span className="brand-mark" aria-hidden="true">BH</span>
          <span className="brand-name">BURGUER<span>HOUSE</span></span>
        </a>
        <nav className="main-nav" aria-label="Navegação principal">
          <a href="#cardapio">Cardápio</a>
          <a href="#sobre">Nossa casa</a>
        </nav>
        <a className="header-cart" href="#cart" aria-label={`Carrinho com ${itemCount} itens`}>
          <CartIcon />
          <span>Meu pedido</span>
          <span className="cart-count">{itemCount}</span>
        </a>
      </header>

      <main id="inicio">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span /> FEITO NA HORA, DO NOSSO JEITO</p>
            <h1 id="hero-title">Seu próximo<br />hambúrguer <span>favorito.</span></h1>
            <p className="hero-description">
              Ingredientes de verdade, chapa quente e aquele sabor que faz valer cada mordida.
            </p>
            <a className="primary-button hero-button" href="#cardapio">
              Escolha o seu <span aria-hidden="true">↓</span>
            </a>
            <div className="hero-note">
              <span className="note-stars" aria-label="5 estrelas">★★★★★</span>
              <span>Um clássico da casa, desde a primeira mordida.</span>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-sticker">BOM<br />DE<br />VERDADE</div>
            <div className="hero-burger">🍔</div>
            <span className="hero-art-caption">MORDIDA<br />COM SABOR</span>
            <span className="hero-sparkle sparkle-one">✳</span>
            <span className="hero-sparkle sparkle-two">✳</span>
          </div>
        </section>

        <section className="menu-section" id="cardapio" aria-labelledby="menu-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">ESCOLHA SEM PRESSA</p>
              <h2 id="menu-title">Nosso cardápio<span>.</span></h2>
            </div>
            <p className="section-aside">Feito com carinho. Servido com sabor.</p>
          </div>

          <div className="menu-layout">
            <div className="menu-content">
              <div className="category-filters" aria-label="Filtrar por categoria">
                {categories.map((item) => (
                  <button
                    className={category === item ? 'filter-button active' : 'filter-button'}
                    key={item}
                    type="button"
                    aria-pressed={category === item}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {loading && <p className="feedback-message">Carregando nosso cardápio...</p>}
              {!loading && productsError && (
                <div className="error-panel" role="alert">
                  <p>{productsError}</p>
                  <button type="button" className="text-button" onClick={() => window.location.reload()}>
                    Tentar novamente
                  </button>
                </div>
              )}
              {!loading && !productsError && visibleProducts.length === 0 && (
                <p className="feedback-message">Nenhum produto encontrado nesta categoria.</p>
              )}

              <div className="product-grid">
                {visibleProducts.map((product) => {
                  const visual = productVisuals[product.id] || { emoji: '🍽️', className: 'classic' }
                  return (
                    <article className="product-card" key={product.id}>
                      <div className={`product-art ${visual.className}`}>
                        <span className="product-category">{product.category}</span>
                        <span className="product-emoji" aria-hidden="true">{visual.emoji}</span>
                      </div>
                      <div className="product-details">
                        <div className="product-title-row">
                          <h3>{product.name}</h3>
                          <span className="product-price">{currency.format(product.price)}</span>
                        </div>
                        <p>{product.description}</p>
                        <button
                          className="add-button"
                          type="button"
                          onClick={() => updateQuantity(product.id, 1)}
                          aria-label={`Adicionar ${product.name} ao pedido`}
                        >
                          <span aria-hidden="true">+</span> Adicionar
                        </button>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>

            <aside className="cart-panel" id="cart" aria-labelledby="cart-title">
              <div className="cart-heading">
                <div>
                  <p className="eyebrow">SUA ESCOLHA</p>
                  <h2 id="cart-title">Seu pedido<span>.</span></h2>
                </div>
                <span className="cart-count panel-count">{itemCount}</span>
              </div>

              {confirmation && (
                <div className="confirmation-panel" role="status" aria-live="polite">
                  <span className="confirmation-icon" aria-hidden="true">✓</span>
                  <h3>Pedido confirmado!</h3>
                  <p>Número do pedido: <strong>#{confirmation.id}</strong></p>
                  <ul>
                    {confirmation.items.map((item) => (
                      <li key={`${confirmation.id}-${item.productId}`}>
                        <span>{item.quantity}x {item.name}</span>
                        <span>{currency.format(item.subtotal)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="confirmation-total">
                    <span>Total do pedido</span>
                    <strong>{currency.format(confirmation.total)}</strong>
                  </div>
                </div>
              )}

              {!confirmation && cartItems.length === 0 && (
                <div className="empty-cart">
                  <span className="empty-cart-icon" aria-hidden="true">＋</span>
                  <p>Seu pedido começa aqui.</p>
                  <span>Adicione algo gostoso do cardápio.</span>
                </div>
              )}

              {cartItems.length > 0 && (
                <ul className="cart-items">
                  {cartItems.map((item) => (
                    <li className="cart-item" key={item.id}>
                      <div className="cart-item-info">
                        <strong>{item.name}</strong>
                        <span>{currency.format(item.price)}</span>
                      </div>
                      <div className="quantity-control" aria-label={`Quantidade de ${item.name}`}>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label={`Diminuir ${item.name}`}
                        >−</button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label={`Aumentar ${item.name}`}
                        >+</button>
                      </div>
                      <strong className="cart-subtotal">{currency.format(item.subtotal / 100)}</strong>
                    </li>
                  ))}
                </ul>
              )}

              {cartItems.length > 0 && (
                <form onSubmit={submitOrder}>
                  <div className="cart-total">
                    <span>Total</span>
                    <strong>{currency.format(totalInCents / 100)}</strong>
                  </div>
                  <p className="checkout-note">Pagamento combinado na retirada.</p>
                  <button className="primary-button checkout-button" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando pedido...' : 'Finalizar pedido'}
                    <span aria-hidden="true">→</span>
                  </button>
                </form>
              )}
              {orderError && <p className="error-message" role="alert">{orderError}</p>}
              <p className="cart-footnote">Sem pagamento online. Simples assim.</p>
            </aside>
          </div>
        </section>

        <section className="about-strip" id="sobre">
          <span className="about-icon" aria-hidden="true">✳</span>
          <p>Comida boa aproxima. <strong>Esse é o nosso ingrediente secreto.</strong></p>
          <a href="#cardapio">Vem provar <span aria-hidden="true">↗</span></a>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#inicio">
          <span className="brand-mark" aria-hidden="true">BH</span>
          <span className="brand-name">BURGUER<span>HOUSE</span></span>
        </a>
        <span>© 2025 Burguer House · Feito para comer feliz.</span>
      </footer>
    </div>
  )
}

function CartIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M3 4h2l2.2 10.1a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 1.9-1.4L21 8H6" />
      <circle cx="10" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </svg>
  )
}

export default App
