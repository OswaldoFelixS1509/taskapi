CREATE DATABASE IF NOT EXISTS task_management;

USE task_management;

DROP TABLE IF EXISTS tasks;

CREATE TABLE `tasks` (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	description TEXT NOT NULL,
    due_date DATE NOT NULL,
	status ENUM('pending', 'in_progress', 'completed') NOT NULL,
	created_at TIMESTAMP,
	PRIMARY KEY (`id`)
);


