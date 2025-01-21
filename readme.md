# Setup

- Copy .env.example and create .env file
- Run docker compose up -d in order to create the container

## API Reference

#### Get all tasks

```http
  GET /tasks
```


#### Get task

```http
  GET /task/${$id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of task to fetch |

#### Create task

```http
  POST /tasks
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of the new task |
| `description`      | `string` | **Required**. A short description about the task |
| `due_date`      | `date` | **Required**. Due date of the task |
| `status`      | `string` | **Required**. Current status of the task |

#### Update task

```http
  PUT /task/{$id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of task to update |
| `name`      | `string` | **Required**. Name of the new task |
| `description`      | `string` | **Required**. A short description about the task |
| `due_date`      | `date` | **Required**. Due date of the task |
| `status`      | `string` | **Required**. Current status of the task |

#### Delete task

```http
  DELETE /task/${$id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of task to delete |
