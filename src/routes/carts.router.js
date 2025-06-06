import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const cartsRouter = Router();
const cm = new CartManager('./src/data/carts.json');

// POST /api/carts/ ----> crear carrito
cartsRouter.post('/', async (req, res) => {
    const cart = await cm.createCart();
    res.status(201).json(cart);
});

// GET /api/carts/:cid ----> ver productos de un carrito
cartsRouter.get('/:cid', async (req, res) => {
    const cart = await cm.getCartById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart.products);
});

// POST /api/carts/:cid/product/:pid ----> agregar producto
cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    const updatedCart = await cm.addProductToCart(req.params.cid, req.params.pid);
    if (!updatedCart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(updatedCart);
});

export default cartsRouter;