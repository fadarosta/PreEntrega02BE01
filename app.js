
import express from 'express';
import routes from './src/routes/index.js';
import handlebars from 'express-handlebars';
import productRouter from './src/routes/products.router.js';
import cartRouter from './src/routes/carts.router.js';
import errorHandler from './src/middlewares/errorHandler.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  'handlebars',
  handlebars.engine({
    extname: '.handlebars',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
  })
);

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('app', {
    name: 'BackEnd01',
    last_name: '2025'
  });
});

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use(errorHandler);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

/*
http://localhost:8080/api/products
http://localhost:8080/api/carts
http://localhost:8080/api/products/1
*/


