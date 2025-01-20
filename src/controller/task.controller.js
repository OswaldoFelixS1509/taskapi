import database from '../config/mysql.config.js';
import Response from '../domain/response.js';
import logger from '../util/logger.js';
import QUERY from '../query/task.query.js';
import HttpStatus from '../util/HttpStatus.js';

export const getTasks = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching tasks`);

    database.query(QUERY.SELECT_TASKS, (error, results) => {
        logger.info(`${req.method} ${req.originalUrl}, query`);
        if(!results.length === 0)
        {
            logger.info(`${req.method} ${req.originalUrl},not found`);
            return res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'No tasks found.'),);
        }

        res.status(HttpStatus.OK.code)
            .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Tasks retrieved.', {tasks: results}) );
    });
};

export const getTask = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching task`);

    database.query(QUERY.SELECT_TASK, [req.params.id], (error, results) => {
        if(!results[0])
        {
            return res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'No task found.'));
        }

        res.status(HttpStatus.OK.code)
            .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Tasks retrieved.', results[0]));
    });
};

export const createTask = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, creating task`);

    database.query(QUERY.CREATE_TASKS, Object.values(req.body), (error, results) => {
        if(!results)
        {
            logger.error(error.message);
            return res.status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'Error occurred.'));
        }

        const task = { id: results.insertedId, ...req.body, created_at: new Date() }
        res.status(HttpStatus.OK.code)
            .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, 'Tasks created.', {task}));
    });
};

export const updateTask = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching task`);

    database.query(QUERY.SELECT_TASK, [req.params.id], (error, results) => {
        if(!results[0])
        {
            return res.status(HttpStatus.NOT_FOUND.code)
                .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'No task found.'));
        }

        logger.info(`${req.method} ${req.originalUrl}, updating task`);

        database.query(QUERY.UPDATE_TASK, [...Object.values(req.body), req.params.id], (error, results) => {
            if(!error)
            {
                return res.status(HttpStatus.OK.code)
                    .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Task updated.', { id: req.params.id, ...req.body}));
            }

            logger.error(error.message);

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, 'An error has occurred.'));
        });
    });
};

export const deleteTask = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, deleting task`);

    database.query(QUERY.DELETE, [req.params.id], (error, results) => {
        if(results.affectedRows > 0)
        {
            return res.status(HttpStatus.OK.code)
                .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Task deleted.'));
        }

        res.status(HttpStatus.NOT_FOUND.code)
            .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'No task found.'));
    });
};

