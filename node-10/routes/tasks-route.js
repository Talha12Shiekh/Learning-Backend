const expresss = require("express");
const { createTasks, getAllTasks, getAllMatchedTitleTasks, updateTasks, deleteTasks } = require("../controller/tasks-controller");

const router = expresss.Router();

exports.tasksrouter = router
  .post("/", createTasks)
  .get("/", getAllTasks)
  .get("/:title", getAllMatchedTitleTasks)
  .put("/:id",updateTasks)
  .delete("/:id",deleteTasks);
