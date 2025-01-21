// task.model.js
import database from '../config/mysql.config.js';
import logger from '../util/logger.js';

class Task {
    static getAllTasks() {
        return new Promise((resolve, reject) => {
            database.query('CALL sp_get_all_tasks()', (error, results) => {
                if (error) {
                    logger.error(error.message);
                    reject(new Error('Error occurred while fetching tasks.'));
                }
                resolve(results[0]);
            });
        });
    }

    static getTaskById(taskId) {
        return new Promise((resolve, reject) => {
            database.query('CALL sp_get_task(?)', [taskId], (error, results) => {
                if (error) {
                    logger.error(error.message);
                    reject(new Error('Error occurred while fetching task.'));
                }
                resolve(results[0]);
            });
        });
    }

    static createTask(name, description, dueDate, status) {
        return new Promise((resolve, reject) => {
            database.query('CALL sp_create_task(?, ?, ?, ?)', [name, description, dueDate, status], (error, results) => {
                if (error) {
                    logger.error(error.message);
                    reject(new Error('Error occurred while creating task.'));
                }
                resolve(results.insertId);
            });
        });
    }

    static updateTask(taskId, name, description, dueDate, status) {
        return new Promise((resolve, reject) => {
            database.query('CALL sp_update_task(?, ?, ?, ?, ?)', [taskId, name, description, dueDate, status], (error, results) => {
                if (error) {
                    logger.error(error.message);
                    reject(new Error('Error occurred while updating task.'));
                }
                resolve(results);
            });
        });
    }

    static deleteTask(taskId) {
        return new Promise((resolve, reject) => {
            database.query('CALL sp_delete_task(?)', [taskId], (error, results) => {
                if (error) {
                    logger.error(error.message);
                    reject(new Error('Error occurred while deleting task.'));
                }
                resolve(results[0].affectedRows > 0);
            });
        });
    }
}

export default Task;
