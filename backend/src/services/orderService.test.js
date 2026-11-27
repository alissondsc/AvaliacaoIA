const assert = require("node:assert/strict");
const { after, before, test } = require("node:test");
const app = require("../app");
const { createOrder } = require("./orderService");

let server;
let apiUrl;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  apiUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test("creates an order using server product prices and calculates totals", () => {
  const order = createOrder([
    { productId: 1, quantity: 2, price: 0.01 }
  ]);

  assert.equal(order.items[0].price, 25.9);
  assert.equal(order.items[0].subtotal, 51.8);
  assert.equal(order.total, 51.8);
  assert.equal(order.status, "Confirmado");
});

test("rejects empty orders and invalid quantities", () => {
  assert.throws(() => createOrder([]), /carrinho está vazio/i);
  assert.throws(
    () => createOrder([{ productId: 1, quantity: 1.5 }]),
    /inteiro positivo/i
  );
  assert.throws(
    () => createOrder([{ productId: 1, quantity: 0 }]),
    /inteiro positivo/i
  );
  assert.throws(
    () => createOrder([{ productId: 1, quantity: Number.MAX_SAFE_INTEGER + 1 }]),
    /inteiro positivo/i
  );
});

test("rejects products that do not exist", () => {
  assert.throws(
    () => createOrder([{ productId: 999, quantity: 1 }]),
    /não foram encontrados/i
  );
});

test("serves products and accepts valid orders through the API", async () => {
  const productsResponse = await fetch(`${apiUrl}/api/products`);
  const products = await productsResponse.json();
  assert.equal(productsResponse.status, 200);
  assert.equal(productsResponse.headers.get("access-control-allow-origin"), "*");
  assert.equal(products.length, 6);

  const orderResponse = await fetch(`${apiUrl}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: [{ productId: 2, quantity: 2, price: 0 }] })
  });
  const result = await orderResponse.json();
  assert.equal(orderResponse.status, 201);
  assert.equal(result.order.items[0].subtotal, 65.8);
  assert.equal(result.order.total, 65.8);
});

test("returns 400 for invalid orders and 404 for unknown routes", async () => {
  const emptyOrderResponse = await fetch(`${apiUrl}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: [] })
  });
  assert.equal(emptyOrderResponse.status, 400);

  const missingRouteResponse = await fetch(`${apiUrl}/api/missing`);
  assert.equal(missingRouteResponse.status, 404);

  const invalidProductResponse = await fetch(`${apiUrl}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: [{ productId: 999, quantity: 1 }] })
  });
  assert.equal(invalidProductResponse.status, 400);
});
