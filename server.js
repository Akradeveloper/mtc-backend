require("dotenv").config();

const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const { withSpeedInsights } = require("@vercel/speed-insights");
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
// Agregar el middleware de Speed Insights
app.use(withSpeedInsights());
app.use(cors(corsOptions));
app.use(express.json());

// Montar las rutas
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
