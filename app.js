import express from 'express';
import { engine } from 'express-handlebars';
import productRouter from './src/routers/products.router.js';
import cartRouter from './src/routers/carts.router.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('views engine', 'handlebars')
app.use(express.static(__dirname + '/views'))

app.get('/', (req, res)=>
    const testUser={
        name: "BackEnd01"
        last_name: "2025"
    }
    res.render('index', testUser)
)

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use(errorHandler);

app.listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080');
});
