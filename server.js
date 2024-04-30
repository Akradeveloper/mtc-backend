require("dotenv").config();

const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");

const { withSpeedInsights } = require("@vercel/speed-insights");

const app = express();
// Agregar el middleware de Speed Insights
app.use(withSpeedInsights());
app.use(cors());
app.use(express.json());

// Montar las rutas
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
