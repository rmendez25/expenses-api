const { Expense } = require("../models/expense");
const { Category } = require("../models/category");
const { User } = require("../models/user");

const getAllExpenses = async (req, res) => {
  try {
    const expense = await Expense.find({});
    res.status(200).json({ expense });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id });
    if (!expense)
      return res
        .status(404)
        .json(`Expense with the id ${req.params.id} was not found!`);
    res.status(200).json({ expense });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createExpense = async (req, res) => {
  try {
    const category = await Category.findById(req.body.categoryId);
    if (!category) return res.status(404).send(`Invalid Category`);

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(404).send(`Invalid User`);

    const expense = await Expense.create({
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
    res.status(201).json({ expense });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateExpense = async (req, res) => {
  try {
    const category = await Category.findById(req.body.categoryId);
    if (!category) return res.status(404).send("Invalid category");

    const user = await User.findById(req.body.userId);
    if (!user) return res.status(404).send("Invalid user");
    
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id },
      {
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
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!expense)
      return res
        .status(404)
        .json(`Expense with the id ${req.params.id} was not found!`);

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete({ _id: req.params.id });
    if (!expense)
      return res
        .status(404)
        .json(`Category with the id ${req.params.id} was not found!`);

    res.status(200).json({ msg: "Expense was deleted successfully." });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
