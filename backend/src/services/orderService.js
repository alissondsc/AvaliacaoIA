const products = require("../models/productModel");

class OrderValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "OrderValidationError";
  }
}

let nextOrderId = 1;

function createOrder(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new OrderValidationError("O carrinho está vazio.");
  }

  const orderItems = items.map((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      throw new OrderValidationError("Os itens do pedido são inválidos.");
    }

    const productId = Number(item.productId);
    const product = products.find((candidate) => candidate.id === productId);
    const quantity = item.quantity;

    if (!product) {
      throw new OrderValidationError("Um ou mais produtos não foram encontrados.");
    }
    if (!Number.isSafeInteger(quantity) || quantity <= 0) {
      throw new OrderValidationError("A quantidade deve ser um número inteiro positivo.");
    }

    const subtotalInCents = Math.round(product.price * 100) * quantity;
    if (!Number.isSafeInteger(subtotalInCents)) {
      throw new OrderValidationError("O valor do pedido excede o limite permitido.");
    }

    return {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      subtotal: subtotalInCents / 100
    };
  });

  const totalInCents = orderItems.reduce(
    (sum, item) => sum + Math.round(item.subtotal * 100),
    0
  );
  if (!Number.isSafeInteger(totalInCents)) {
    throw new OrderValidationError("O valor do pedido excede o limite permitido.");
  }

  return {
    id: nextOrderId++,
    items: orderItems,
    total: totalInCents / 100,
    status: "Confirmado"
  };
}

module.exports = { createOrder, OrderValidationError };