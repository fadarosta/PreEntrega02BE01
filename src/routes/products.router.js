
import { Router } from 'express'
import { validateProduct } from '../validators/productValidator.js'
import { validateFields } from '../middlewares/validateFields.js'
import products from '../data/products.js'

const productsRouter = Router()

// GET /api/products/
productsRouter.get('/', (req, res) => {
  try {
    res.json(products)
  } catch (err) {
    console.error('Error GET /api/products →', err)
    res.status(500).json({ error: 'Error al obtener la lista de productos' })
  }
})

// GET /api/products/:pid
productsRouter.get('/:pid', (req, res) => {
  try {
    const pid = Number(req.params.pid)
    const index = products.findIndex((_, i) => i + 1 === pid)

    if (index === -1) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }

    res.json(products[index])
    
  } catch (err) {
    console.error(`Error GET /api/products/${req.params.pid} →`, err)
    res.status(500).json({ error: 'Error al buscar el producto' })
  }
})

// POST /api/products/
productsRouter.post(
  '/',
  validateProduct,
  validateFields,
  (req, res) => {
    try {
      const { title, description, price, thumbnail, code, stock } = req.body

      const exists = products.some(p => p.code === code)
      if (exists) {
        return res.status(400).json({ error: 'Ya existe un producto con ese código' })
      }

      const newProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      }

      products.push(newProduct)
      res.status(201).json(newProduct)
    } catch (err) {
      console.error('Error POST /api/products →', err)
      res.status(500).json({ error: 'Error al crear el producto' })
    }
  }
)

// PUT /api/products/:pid
productsRouter.put('/:pid', (req, res) => {
  try {
    const pid = Number(req.params.pid)
    const index = products.findIndex((_, i) => i + 1 === pid)

    if (index === -1) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }

    const updates = req.body

    if (
      updates.code &&
      products.some((p, i) => p.code === updates.code && i !== index)
    ) {
      return res.status(400).json({ error: 'Ya existe un producto con ese código' })
    }

    products[index] = { ...products[index], ...updates }

    res.json(products[index])
  } catch (err) {
    console.error(`Error PUT /api/products/${req.params.pid} →`, err)
    res.status(500).json({ error: 'Error al actualizar el producto' })
  }
})

// DELETE /api/products/:pid
productsRouter.delete('/:pid', (req, res) => {
  try {
    const pid = Number(req.params.pid)
    const index = products.findIndex((_, i) => i + 1 === pid)

    if (index === -1) {
      return res.status(404).json({ error: 'Producto no encontrado' })
    }

    products.splice(index, 1)
    res.json({ message: 'Producto eliminado correctamente' })
  } catch (err) {
    console.error(`Error DELETE /api/products/${req.params.pid} →`, err)
    res.status(500).json({ error: 'Error al eliminar el producto' })
  }
})

export default productsRouter
