const bcrypt = require("bcrypt");
const { db } = require("../db");
const router = require("express").Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

// Add user to db
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const student = {
      email: req.body.email,
      name: req.body.username,
      password: hashedPassword,
    };

    await db.collection("students").add(student);
    res.redirect("login");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Log user in
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const snapshot = await db
      .collection("students")
      .where("email", "==", email)
      .get();

    if (snapshot.docs.length === 0)
      return res.status(400).send("Email is invalid");

    const isValid = await bcrypt.compare(
      password,
      snapshot.docs[0].data().password
    );

    if (!isValid) return res.status(400).send("Password is invalid");
    // res.send(`Logged in as ${snapshot.docs[0].data().name}.`);
    res.render("home");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
