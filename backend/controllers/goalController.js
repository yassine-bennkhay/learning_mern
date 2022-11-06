/* Description      get goals
   Route            GET /api/goals
   Access           private
*/
const getGoals = (req, res) => {
  const dummydata = {
    goal_name: "read a bit of design patterns",
    goal_time: "today at night",
    duration: "1 hour",
  };
  res.status(200).json(dummydata);
  res.end();
};
/* Description      add goal
   Route            POST /api/add/goal
   Access           private
*/
const setGoal = (req, res) => {
  res.status(201).json({ message: `A goal has been added successfully` });
  res.end()
};
/* Description      update goal
   Route            PUT /api/update/goal
   Access           private
*/
const updateGoal=(req,res)=>{
    res.status(200).json({ message: `Updated goal is ${req.params.id}` });
  res.end();
}
/* Description      delete goal
   Route            DELETE /api/delete/goal
   Access           private
*/
const deleteGoal=(req,res)=>{
    res.status(200).json({ message: `Deleted goal is ${req.params.id}` });
    res.end();
}
module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
