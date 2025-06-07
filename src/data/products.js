import express from 'express';
const router = express.Router();
import { io } from '../../app.js';

const products = [
    {
        title: "Mat de Yoga de TPE",
        description: "Esterilla antideslizante de 6 mm fabricada con TPE.",
        price: 45000,
        thumbnail: "https://example.com/images/esterilla-eco.jpg",
        code: "YM-ECO-001",
        stock: 25
    },
    {
        title: "Bloque de Yoga de Corcho",
        description: "Bloque resistente de corcho natural para mejorar el soporte en posturas.",
        price: 8000,
        thumbnail: "https://example.com/images/bloque-cork.jpg",
        code: "YB-CORK-002",
        stock: 40
    },
    {
        title: "Cinta de Yoga Ajustable",
        description: "Cinta de algodón con hebilla metálica para facilitar estiramientos y mejorar la flexibilidad.",
        price: 12000,
        thumbnail: "https://example.com/images/cinta-ajustable.jpg",
        code: "YS-STRAP-003",
        stock: 60
    }
];

router.get('/', (req, res) => {
    res.status(200).json(products);
});

router.post('/products', (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    const newProduct = { title, description, price, thumbnail, code, stock };
    products.push(newProduct);
    io.emit('updateProducts', products);
    res.redirect('/');
});

router.post('/products/delete/:code', (req, res) => {
    const { code } = req.params;
    products = products.filter(product => product.code !== code);
    io.emit('updateProducts', products);
    res.redirect('/');
});

export default products