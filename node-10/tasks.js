const mongoose = require("mongoose");
const express = require("express");
const app = express();
const { tasksrouter } = require("./routes/tasks-route");
const { userRouter } = require("./routes/user-route");

app.use(express.json());
app.use("/tasks", tasksrouter);
app.use("/users", userRouter);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/users");
  console.log("Connected Successfully! ");
}

app.listen(8080, () => {
  console.log("Server listening at the port 8080");
});
