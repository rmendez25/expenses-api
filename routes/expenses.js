const express = require("express");
const { Expense, validate } = require("../models/expense");
const { Category } = require("../models/category");
const { User } = require("../models/user");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort("name");
    res.send(expenses);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    res.send(expense);
  } catch (error) {
    res.send("Invalid Expense ID")
  }
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(404).send(`Invalid Category`);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(404).send(`Invalid User`);

  const expense = new Expense({
    name: req.body.name,
    amount: req.body.amount,
    category: {
      _id: category._id,
      name: category.name,
    },
    purchaseDate: req.body.purchaseDate,
    user: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
    receip: req.body.receip,
    notes: req.body.notes,
  });

  await expense.save();
  res.send(expense);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(404).send("Invalid category");

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(404).send("Invalid user");

  const expense = await Expense.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    amount: req.body.amount,
    category: {
      _id: category._id,
      name: category.name,
    },
    purchaseDate: req.body.purchaseDate,
    user: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
    receip: req.body.receip,
    notes: req.body.notes,
  });

  res.send(expense);
});

module.exports = router;
