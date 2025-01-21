import express from "express";
import { getTask, getTasks, createTask, updateTask, deleteTask } from "../../controller/task.controller.js";

const taskRoutes = express.Router();

taskRoutes.route('/')
    .get(getTasks)
    .post(createTask);

taskRoutes.route('/:id')
    .get(getTask)
    .put(updateTask)
    .delete(deleteTask);

export default taskRoutes;