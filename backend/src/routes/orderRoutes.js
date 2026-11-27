const express = require("express");
const router = express.Router();

const { createOrder } = require("../services/orderService");

router.post("/", (req, res) => {
  const order = createOrder(req.body && req.body.items);

  return res.status(201).json({
    message: "Pedido realizado com sucesso!",
    order
  });
});

module.exports = router;