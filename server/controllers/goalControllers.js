const asyncHandler = require("express-async-handler");

// @desc GET goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Get Goals!!",
  });
});

// @desc POST goals
// @route POST /api/goals
// @access Private
const setGoals = asyncHandler(async (req, res) => {
  console.log(req.body);

  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field.");
  }

  res.status(200).json({
    message: "Set Goals!!",
  });
});

// @desc UPDATE goals
// @route UPDATE /api/goals/:id
// @access Private
const updateGoals = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Update Goal ${req.params.id}!!`,
  });
});

// @desc DELETE goals
// @route DELETE /api/goals/:id
// @access Private
const deleteGoals = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Delete Goal ${req.params.id}!!`,
  });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
