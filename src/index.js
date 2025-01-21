import express from 'express';
import ip from 'ip';
import dotenv from 'dotenv';
import cors from 'cors';
import Response from './domain/response.js';
import logger from './util/logger.js';
import HttpStatus from './util/HttpStatus.js';
import taskRoutes from './routes/task.route.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;

const app = express();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task management API project',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:3000/',
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app
    .use(cors({ origin: '*' }))
    .use(express.json())
    .use('/tasks', taskRoutes);

app.get('/', (req, res) =>
    res.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Task API'))
);

app.all('*', (req, res) =>
    res.send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Not found'))
);

app.listen(PORT, () => logger.info(`Server running on: http://${ip.address()}:${PORT}`));
