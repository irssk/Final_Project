const express = require("express");
const cors = require("cors");
const db = require("./models");
const bodyParser = require("body-parser");
const path = require("path");

const userRouter = require("./router/userrouter");
const produitrouter = require("./router/produitrouter");
const orderrouter = require("./router/orderrouter");

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up CORS
app.use(cors({
  origin: true,
  credentials: true,
  methods: "POST,GET,PUT,PATCH,OPTIONS,DELETE",
}));

// Static Images Folder
app.use("/Images", express.static(path.join(__dirname, "api/Images")));

// Routers
app.use("/users", userRouter);
app.use("/products", produitrouter);
app.use("/orders", orderrouter);

// Root route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Port
const PORT = process.env.PORT || 3000;

// Start server
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
