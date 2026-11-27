const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const { OrderValidationError } = require("./services/orderService");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "API Burguer House funcionando!"
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: "Rota não encontrada."
  });
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof OrderValidationError) {
    return res.status(400).json({
      message: error.message
    });
  }

  if (error.type === "entity.parse.failed") {
    return res.status(400).json({
      message: "O corpo da requisição contém JSON inválido."
    });
  }

  console.error("Erro interno na API:", error);
  return res.status(500).json({
    message: "Ocorreu um erro interno. Tente novamente."
  });
});

module.exports = app;
