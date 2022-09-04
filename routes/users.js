const express = require("express");
const { User, validate } = require("../models/user");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort("role");
    res.send(users);
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.send(user);
  } catch (ex) {
    res
      .status(404)
      .send(`The user with the given ID: ${req.params.id} was not found.`);
  }
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role,
  });

  try {
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send("Something went wrong trying to create the user");
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await User.findByIdAndUpdate(req.params.id, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role,
  });

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    res.send(user);
  } catch (error) {
    res
      .status(404)
      .send(`The user with the given Id: ${req.params.id} was not found`);
  }
});

module.exports = router;
