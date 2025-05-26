import fs from 'fs';
import path from 'path';

export default class ProductManager {
    constructor(filePath = './src/data/products.json') {
        this.path = path.resolve(filePath);
        this.products = [];
        this.lastId = 0;

        if (fs.existsSync(this.path)) {
            try {
                const data = fs.readFileSync(this.path, 'utf-8');
                this.products = JSON.parse(data);
                this.lastId = this.products.reduce((max, p) => (p.id > max ? p.id : max), 0);
            } catch (err) {
                console.error('Error al leer o parsear products.json:', err);
            }
        }
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const codeExist = this.products.some(p => p.code === code);
        if (codeExist) {
            console.log('Ya existe un producto con ese código.');
            return null;
        }

        const newProduct = {
            id: ++this.lastId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(newProduct);
        return newProduct;
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            console.log('Not found');
            return null;
        }
        return product;
    }

    updateProduct(id, updates) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
        console.log('Producto no encontrado');
        return null;
    }

    this.products[index] = { ...this.products[index], ...updates, id };
    this.saveToFile();
    return this.products[index];
    }

    deleteProduct(id) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) {
            console.log('Producto no encontrado');
            return false;
        }

        this.products.splice(index, 1);
        this.saveToFile();
        return true;
    }

    saveToFile() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error al guardar productos:', err);
    }
}
