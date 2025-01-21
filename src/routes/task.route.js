import express from 'express';
import { getTasks, getTask, createTask, updateTask, deleteTask } from '../controller/task.controller.js';


const router = express.Router();

// routes/task.route.js
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retrieve all tasks
 *     description: Fetch all tasks in the database.
 *     responses:
 *       200:
 *         description: A list of tasks.
 *       404:
 *         description: No tasks found.
 *       500:
 *         description: Server error.
 */

router.route('/').get(getTasks);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: Add a new task to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - due_date
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the task.
 *                 example: "Task Name"
 *               description:
 *                 type: string
 *                 description: Detailed description of the task.
 *                 example: "This is a sample task description."
 *               due_date:
 *                 type: string
 *                 format: date
 *                 description: Due date of the task.
 *                 example: "2025-01-21"
 *               status:
 *                 type: string
 *                 description: Status of the task.
 *                 enum:
 *                   - pending
 *                   - in_progress
 *                   - completed
 *                 example: "pending"
 *     responses:
 *       201:
 *         description: Task created successfully.
 *       400:
 *         description: Missing required fields.
 *       500:
 *         description: Server error.
 */

router.route('/').post(createTask);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Retrieve a task by ID
 *     description: Fetch a specific task by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the task.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task retrieved successfully.
 *       404:
 *         description: Task not found.
 *       500:
 *         description: Server error.
 */
router.route('/:id').get(getTask);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     description: Update the details of an existing task by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the task.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - due_date
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the task.
 *                 example: "Updated Task Name"
 *               description:
 *                 type: string
 *                 description: Detailed description of the task.
 *                 example: "This is an updated task description."
 *               due_date:
 *                 type: string
 *                 format: date
 *                 description: Due date of the task.
 *                 example: "2025-01-25"
 *               status:
 *                 type: string
 *                 description: Status of the task.
 *                 enum:
 *                   - pending
 *                   - in_progress
 *                   - completed
 *                 example: "in_progress"
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *       400:
 *         description: Missing required fields.
 *       500:
 *         description: Server error.
 */

router.route('/:id').put(updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Remove a task by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the task.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully.
 *       404:
 *         description: Task not found.
 *       500:
 *         description: Server error.
 */
router.route('/:id').delete(deleteTask);

export default router;
