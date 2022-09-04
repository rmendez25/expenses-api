const express = require("express");
const { Income, validate } = require("../models/income");
const { User } = require("../models/user");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const income = await Income.find().sort("role");
    res.send(income);
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);

    res.send(income);
  } catch (ex) {
    res
      .status(404)
      .send(`The income with the given ID: ${req.params.id} was not found.`);
  }
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid user.");

  const income = new Income({
    user: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
    date: req.body.date,
    incomeSource: req.body.incomeSource,
    incomeAmount: req.body.incomeAmount,
  });

  if (!income)
    return res.status(404).send("The income with the given ID was not found.");

  await income.save();
  res.send(income);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid user.");

  const income = await Income.findByIdAndUpdate(req.params.id, {
    user: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
    date: req.body.date,
    incomeSource: req.body.incomeSource,
    incomeAmount: req.body.incomeAmount,
  });

  if (!income)
    return res.status(404).send("The income with the given ID was not found.");

  res.send(income);
});

router.delete("/:id", async (req, res) => {
  try {
    const income = await Income.findByIdAndDelete(req.params.id);

    res.send(income);
  } catch (error) {
    res
      .status(404)
      .send(`The user with the given Id: ${req.params.id} was not found`);
  }
});

module.exports = router;
