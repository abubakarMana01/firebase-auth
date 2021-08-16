require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const express = require("express");
const morgan = require("morgan");
const app = express();

app.set("view engine", "ejs");

// Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));
// routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.render("home");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
