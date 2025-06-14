const { Task } = require("../models/tasks-model");

exports.createTasks = async (req, res) => {
  const task = new Task(req.body);

  try {
    const doc = await task.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.getAllTasks = async (_, res) => {
  try {
    const tasks = await Task.find();
    res.status(201).json(tasks);
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.getAllMatchedTitleTasks = async (req, res) => {
  try {
    const matchedttletsks = await Task.find({ title: req.params.title });

    res.status(201).json(matchedttletsks);
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.updateTasks = async (req, res) => {
  try {
    const updatedTaks = await Task.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }
    );
    res.status(201).json(updatedTaks);
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.deleteTasks = async (req, res) => {
  try {
    const deletedTasks = await Task.findByIdAndDelete(req.params.id, {
      new: true,
    });
    res.status(201).json(deletedTasks);
  } catch (error) {
    res.status(404).json(error);
  }
};
