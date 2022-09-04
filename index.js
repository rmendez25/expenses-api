const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi)
const express = require("express");
const mongoose = require("mongoose");

//routes
const users = require("./routes/users");
const incomes = require("./routes/incomes");
const categories = require('./routes/categories')
const expenses = require('./routes/expenses')

const app = express();

mongoose
  .connect("mongodb://localhost/family-expenses")
  .then(() => console.log("Succesfully Conected to The DB"))
  .catch((error) => console.error(error));

app.use(express.json());
app.use("/api/users", users);
app.use("/api/incomes", incomes);
app.use("/api/categories", categories);
app.use("/api/expenses", expenses);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
