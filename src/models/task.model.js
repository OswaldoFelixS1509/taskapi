// task.model.js
import database from '../config/mysql.config.js';
import logger from '../util/logger.js';

class Task {
    static getAllTasks(callback) {
        database.query('CALL sp_get_all_tasks()', (error, results) => {
            if (error) {
                logger.error(error.message);
                return callback(new Error('Error occurred while fetching tasks.'));
            }
            callback(null, results[0]);
        });
    }

    static getTaskById(taskId, callback) {
        database.query('CALL sp_get_task(?)', [taskId], (error, results) => {
            if (error) {
                logger.error(error.message);
                return callback(new Error('Error occurred while fetching task.'));
            }
            callback(null, results[0]);
        });
    }

    static createTask(name, description, dueDate, status, callback) {

        database.query('CALL sp_create_task(?, ?, ?, ?)', [name, description, dueDate, status], (error, results) => {
            if (error) {
                logger.error(error.message);
                return callback(new Error('Error occurred while creating task.'));
            }

            callback(null, results);
        });
    }

    static updateTask(taskId, name, description, dueDate, status, callback) {
        database.query('CALL sp_update_task(?, ?, ?, ?, ?)', [taskId, name, description, dueDate, status], (error, results) => {
            if (error) {
                logger.error(error.message);
                return callback(new Error('Error occurred while updating task.'));
            }
            callback(null, results);
        });
    }

    static deleteTask(taskId, callback) {
        database.query('CALL sp_delete_task(?)', [taskId], (error, results) => {
            if (error) {
                logger.error(error.message);
                return callback(new Error('Error occurred while deleting task.'));
            }
            callback(null, results.affectedRows > 0);
        });
    }
}

export default Task;
