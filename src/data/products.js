import express from 'express';
const router = express.Router();

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

module.exports = router;
