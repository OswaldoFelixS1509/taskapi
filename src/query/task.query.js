const QUERY = {
    SELECT_TASKS: 'SELECT * FROM tasks ORDER BY created_at',
    SELECT_TASK: 'SELECT * FROM tasks WHERE id = ?',
    CREATE_TASK: 'INSERT INTO tasks (name, description, due_date, status) VALUES (?, ?, ?, ?)',
    UPDATE_TASK: 'UPDATE tasks SET name = ?, description = ?, due_date = ?, status = ? WHERE id = ?',
    DELETE_TASK: 'DELETE tasks WHERE id = ?',
};

export default QUERY;