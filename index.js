import express from 'express';
import { AppError, globalErrorHandler } from './utils/appError.js';
import { router as userRoutes } from './routes/userRoutes.js';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config({ path: './config.env' });

const app = express();

//MiddleWare para analizar los datos del cuerpo de las solicitudes en foramto JSON
app.use(express.json());

//Configurar el MiddleWare de morgan para el registro de solicitudes en consola
app.use(morgan('combined'));

//MiddleWare para exponer mis rutas y puedan ser accedidas
app.use('/api/users', userRoutes);

app.use((req, res, next) => {
    const error = new AppError(`No se ha podido acceder a ${req.originalUrl} en el servidor`, 404);
    next(error);
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});