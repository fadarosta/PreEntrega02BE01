import express from 'express';
import productRouter from './src/routers/products.router.js';
import cartRouter from './src/routers/carts.router.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use(errorHandler);

app.listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080');
});
