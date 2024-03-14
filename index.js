const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./src/data/db");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const protectedRoutes = require("./src/routes/protectedRoutes");
const productRoutes = require("./src/routes/productRoutes");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || config.get("port");

// Connect to MongoDB
connectDB();

// Parse JSON request body
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// Define authentication routes
app.use("/auth", authRoutes);

// Define user routes
app.use("/user", userRoutes);

// Mount the protected route
app.use("/protected", protectedRoutes);

app.use("/api", productRoutes);

// Allow requests from other domains to access the resources
app.use(
  cors({
    origin: ["http://localhost:4000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
