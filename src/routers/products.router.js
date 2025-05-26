import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';
import { validateProduct } from '../validators/productValidator.js';
import { validateFields } from '../middlewares/validateFields.js';

const productsRouter = Router();
const pm = new ProductManager('./src/data/products.json');

// GET /api/products/
productsRouter.get('/', (req, res) => {
  try {
    const products = pm.getProducts();
    res.json(products);
  } catch (err) {
    console.error('Error GET /api/products →', err);
    res.status(500).json({ error: 'Error al obtener la lista de productos' });
  }
});

// GET /api/products/:pid
productsRouter.get('/:pid', (req, res) => {
  try {
    const pid = Number(req.params.pid);
    const product = pm.getProductById(pid);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (err) {
    console.error(`Error GET /api/products/${req.params.pid} →`, err);
    res.status(500).json({ error: 'Error al buscar el producto' });
  }
});

// POST /api/products/
productsRouter.post(
  '/',
  validateProduct,
  validateFields,
  (req, res) => {
    try {
      const { title, description, price, thumbnail, code, stock } = req.body;
      const newProduct = pm.addProduct(title, description, price, thumbnail, code, stock);
      if (!newProduct) {
        return res.status(400).json({ error: 'Ya existe un producto con ese código' });
      }
      res.status(201).json(newProduct);
    } catch (err) {
      console.error('Error POST /api/products →', err);
      res.status(500).json({ error: 'Error al crear el producto' });
    }
  }
);

// PUT /api/products/:pid
productsRouter.put('/:pid', (req, res) => {
  try {
    const pid = Number(req.params.pid);
    const updates = req.body;
    const updated = pm.updateProduct(pid, updates);
    if (!updated) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(updated);
  } catch (err) {
    console.error(`Error PUT /api/products/${req.params.pid} →`, err);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

// DELETE /api/products/:pid
productsRouter.delete('/:pid', (req, res) => {
  try {
    const pid = Number(req.params.pid);
    const deleted = pm.deleteProduct(pid);
    if (!deleted) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (err) {
    console.error(`Error DELETE /api/products/${req.params.pid} →`, err);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

export default productsRouter;
