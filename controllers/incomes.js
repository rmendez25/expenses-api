const { Income } = require("../models/income");
const { User } = require("../models/user");

const getAllIncomes = async (req, res) => {
  try {
    const income = await Income.find({});
    res.status(200).json({ income });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getIncome = async (req, res) => {
  try {
    const income = await Income.findOne({ _id: req.params.id });
    if (!income)
      return res
        .status(404)
        .json(`Income with the id ${req.params.id} was not found!`);
    res.status(200).json({ income });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createIncome = async (req, res) => {
  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid user.");

  try {
    const income = await Income.create({
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
    res.status(201).json({ income });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateIncome = async (req, res) => {
  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid user.");
  
  try {
    const income = await Income.findOneAndUpdate(
      { _id: req.params.id },
      {
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        date: req.body.date,
        incomeSource: req.body.incomeSource,
        incomeAmount: req.body.incomeAmount,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!income)
      return res
        .status(404)
        .json(`Income with the id ${req.params.id} was not found!`);

    res.status(200).json({ income });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const task = await Income.findByIdAndDelete({ _id: req.params.id });
    if (!task)
      return res
        .status(404)
        .json(`Income with the id ${req.params.id} was not found!`);

    res.status(200).json({ msg: "Income was deleted successfully." });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllIncomes,
  getIncome,
  createIncome,
  updateIncome,
  deleteIncome,
};
