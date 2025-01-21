import Task from '../models/task.model.js';
import Response from '../domain/response.js';
import logger from '../util/logger.js';
import HttpStatus from '../util/HttpStatus.js';

export const getTasks = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching tasks`);

    Task.getAllTasks((error, tasks) => {
        if (error) {
            logger.error(error.message);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message));
        }

        if (!tasks || tasks.length === 0) {
            logger.info(`${req.method} ${req.originalUrl}, not found`);
            return res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'No tasks found.'));
        }

        res.status(HttpStatus.OK.code)
            .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Tasks retrieved.', { tasks }));
    });
};

export const getTask = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching task`);

    Task.getTaskById(req.params.id, (error, task) => {
        if (error) {
            logger.error(error.message);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message));
        }

        if (!task || task.length === 0) {
            return res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'No task found.'));
        }

        res.status(HttpStatus.OK.code)
            .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Task retrieved.', task[0]));
    });
};

export const createTask = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, creating task`);

    const { name, description, due_date, status } = req.body;

    if (!name || !description || !due_date || !status) {
        return res.status(HttpStatus.BAD_REQUEST.code)
            .send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Missing required fields.'));
    }

    Task.createTask(name, description, due_date, status, (error, results) => {
        if (error) {
            logger.error(error.message);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message));
        }

        const task = results[0][0];
        res.status(HttpStatus.CREATED.code)
            .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, 'Task created.', { task }));
    });
};

export const updateTask = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, updating task`);

    const { name, description, due_date, status } = req.body;

    if (!name || !description || !due_date || !status) {
        return res.status(HttpStatus.BAD_REQUEST.code)
            .send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Missing required fields.'));
    }

    Task.updateTask(req.params.id, name, description, due_date, status, (error, results) => {
        if (error) {
            logger.error(error.message);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message));
        }

        res.status(HttpStatus.OK.code)
            .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Task updated.', { id: req.params.id, name, description, due_date, status }));
    });
};

export const deleteTask = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, deleting task`);

    Task.deleteTask(req.params.id, (error, deleted) => {
        if (error) {
            logger.error(error.message);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, error.message));
        }

        if (deleted) {
            return res.status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Task deleted.'));
        }

        res.status(HttpStatus.NOT_FOUND.code)
            .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'No task found.'));
    });
};
