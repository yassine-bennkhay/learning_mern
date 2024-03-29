const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");
/* Description      get goals
   Route            GET /api/goals
   Access           private
*/
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
  res.end();
});
/* Description      add goal
   Route            POST /api/add/goal
   Access           private
*/
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field.");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(201).json(goal);
  res.end();
});
/* Description      update goal
   Route            PUT /api/update/goal
   Access           private
*/
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  const user = await User.findById(req.user.id);
  //Check for the user
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  //Make sure the logged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
  res.end();
});
/* Description      delete goal
   Route            DELETE /api/delete/goal
   Access           private
*/
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(200);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);
  //Check for the user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the logged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await Goal.findByIdAndRemove(req.params.id);
  res.status(200).json({ id: req.params.id });
  res.end();
});
module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
