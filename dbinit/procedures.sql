DELIMITER $$

CREATE PROCEDURE sp_get_all_tasks()
BEGIN
    SELECT * FROM tasks;
END $$

CREATE PROCEDURE sp_get_task(
    IN p_id INT
)
BEGIN
    SELECT * FROM tasks WHERE id = p_id;
END $$

CREATE PROCEDURE sp_create_task(
    IN p_name VARCHAR(255),
    IN p_description TEXT,
    IN p_due_date DATE,
    IN p_status ENUM('pending', 'in_progress', 'completed')
)
BEGIN
    INSERT INTO tasks (name, description, due_date, status, created_at)
    VALUES (p_name, p_description, p_due_date, p_status, NOW());

    SET @TASK_ID = LAST_INSERT_ID();

    SELECT * FROM tasks WHERE id = @TASK_ID;
END $$


CREATE PROCEDURE sp_update_task(
    IN p_id INT,
    IN p_name VARCHAR(255),
    IN p_description TEXT,
    IN p_due_date DATE,
    IN p_status ENUM('pending', 'in_progress', 'completed')
)
BEGIN
    UPDATE tasks
    SET name = p_name,
        description = p_description,
        due_date = p_due_date,
        status = p_status
    WHERE id = p_id;
END $$

CREATE PROCEDURE sp_delete_task(
    IN p_id INT
)
BEGIN
    DELETE FROM tasks
    WHERE id = p_id;
END $$;

DELIMITER ;
