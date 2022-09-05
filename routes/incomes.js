const express = require("express");
const router = express.Router();

const {
  getAllIncomes,
  getIncome,
  createIncome,
  updateIncome,
  deleteIncome,
} = require("../controllers/incomes");

router.route("/").get(getAllIncomes).post(createIncome);
router
  .route("/:id")
  .get(getIncome)
  .patch(updateIncome)
  .delete(deleteIncome);

module.exports = router;
