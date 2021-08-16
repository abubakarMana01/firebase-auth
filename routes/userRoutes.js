const bcrypt = require("bcrypt");
const router = require("express").Router();
const { db } = require("../db");

// Get all users from db
router.get("/all", async (req, res) => {
  const users = [];

  try {
    const snapshot = await db.collection("students").get();
    snapshot.docs.forEach((doc) => users.push(doc.data()));
    res.send(users);
  } catch (err) {
    console.log(err.message);
  }
});

// Get single users from db
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const snapshot = await db.collection("students").doc(id).get();
    const user = snapshot.data();
    res.send(user);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
