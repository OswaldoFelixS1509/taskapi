import database from '../config/mysql.config.js';
import Response from '../domain/response.js';
import logger from '../util/logger.js';
import QUERY from '../query/task.query.js';
import HttpStatus from '../util/HttpStatus.js';

export const getTasks = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching tasks`);

    // Call stored procedure sp_get_all_tasks
    database.query('CALL sp_get_all_tasks()', (error, results) => {
        if (error) {
            logger.error(error.message);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'Error occurred.'));
        }

        // results[0] contains the result set
        if (!results[0] || results[0].length === 0) {
            logger.info(`${req.method} ${req.originalUrl}, not found`);
            return res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'No tasks found.'));
        }

        res.status(HttpStatus.OK.code)
            .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Tasks retrieved.', { tasks: results[0] }));
    });
};

export const getTask = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching task`);

    // Call stored procedure sp_get_task with task id
    database.query('CALL sp_get_task(?)', [req.params.id], (error, results) => {
        if (error) {
            logger.error(error.message);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'Error occurred.'));
        }

        if (!results[0] || results[0].length === 0) {
            return res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'No task found.'));
        }

        res.status(HttpStatus.OK.code)
            .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Task retrieved.', results[0][0]));
    });
};

export const createTask = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, creating task`);

    // Call stored procedure sp_create_task
    database.query('CALL sp_create_task(?, ?, ?, ?)', [
        req.body.name,
        req.body.description,
        req.body.due_date,
        req.body.status
    ], (error, results) => {
        if (error) {
            logger.error(error.message);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'Error occurred.'));
        }
        // Assuming the procedure returns an id or success message
        const task = { id: results.insertId, ...req.body, created_at: new Date() };
        res.status(HttpStatus.CREATED.code)
            .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, 'Task created.', { task }));
    });
};

export const updateTask = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, updating task`);

    // Call stored procedure sp_update_task
    database.query('CALL sp_update_task(?, ?, ?, ?, ?)', [
        req.params.id,
        req.body.name,
        req.body.description,
        req.body.due_date,
        req.body.status
    ], (error, results) => {
        if (error) {
            logger.error(error.message);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'Error occurred.'));
        }

        // If results indicate success, return updated task
        res.status(HttpStatus.OK.code)
            .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Task updated.', { id: req.params.id, ...req.body }));
    });
};

export const deleteTask = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, deleting task`);

    // Call stored procedure sp_delete_task with task id
    database.query('CALL sp_delete_task(?)', [req.params.id], (error, results) => {
        if (error) {
            logger.error(error.message);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'Error occurred.'));
        }

        if (results[0].affectedRows > 0) {
            return res.status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Task deleted.'));
        }

        res.status(HttpStatus.NOT_FOUND.code)
            .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'No task found.'));
    });
};
