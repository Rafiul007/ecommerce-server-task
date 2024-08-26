const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

require("dotenv").config();
const port = process.env.PORT || 3000;

// Import the models and associations
require("./models");

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("HEllo Fly Far International");
});

//routes
app.use("/api/users", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
//Errorhandling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

//sync database and starting servers
sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
    console.log(
      `Swagger docs available at http://localhost:${process.env.PORT}/api-docs`
    );
  });
});
