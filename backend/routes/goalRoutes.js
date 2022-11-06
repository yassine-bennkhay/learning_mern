const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  deleteGoal,
  updateGoal,
} = require("../controllers/goalController");
router.route("/").get(getGoals).post(setGoal);
/*
shortcut of / for the two routes:
router.get("/", getGoals);
router.post("/",setGoal);
*/
router.route("/:id").put(updateGoal).delete(deleteGoal);
/*
the shorcut of /:id of the two routes:
router.put("/:id", setGoal);
router.delete("/:id", deleteGoal);
*/
module.exports = router;
