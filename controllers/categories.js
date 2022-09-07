const { Category } = require("../models/category");
const asyncWrapper = require("../middlewares/async");

const getAllCategories = asyncWrapper(async (req, res) => {
  const category = await Category.find({});
  res.status(200).json(category);
});

const getCategory = asyncWrapper(async (req, res) => {
  const category = await Category.findOne({ _id: req.params.id });
  if (!category)
    return res
      .status(404)
      .json({message: `Category was not found!`});
  res.status(200).json(category);
});

const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateCategory = asyncWrapper(async (req, res) => {
  const category = await Category.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!category)
    return res
      .status(404)
      .json(`Category with the id ${req.params.id} was not found!`);

  res.status(200).json(category);
});

const deleteCategory = asyncWrapper(async (req, res) => {
  try {
    const task = await Category.findByIdAndDelete({ _id: req.params.id });
    if (!task)
      return res
        .status(404)
        .json(`Category with the id ${req.params.id} was not found!`);

    res.status(200).json({ msg: "Category was deleted successfully." });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
