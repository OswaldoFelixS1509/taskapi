import express from 'express';
import ip from 'ip';
import dotenv from 'dotenv';
import cors from 'cors';
import Response from './domain/response.js';
import logger from './util/logger.js'
import HttpStatus from './util/HttpStatus.js';
import taskRoutes from './routes/api/task.route.js';

dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;

const app = express();

app
    .use(cors({ origin: '*'}))
    .use(express.json())
    .use('/tasks', taskRoutes);

app.get('/', (req, res) => res.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Task API')));

app.all('*', (req, res) => res.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Not found')))

app.listen(PORT, () => logger.info(`Server running on: ${ip.address()}:${PORT}`));