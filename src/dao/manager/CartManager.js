const fs = require('fs/promises');
const { existsSync } = require('fs');

class CartManager {

    constructor(path) {
        this.path = path;
    }

    async consultarProducts() {
        if (existsSync(this.path)) {
            const data = await fs.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            return products;
        } else {
            return [];
        }
    }

    async addProduct(product) {
        const products = await this.consultarProducts();
        const newProduct = {
            id: products.length + 1,
            ...product
        };
        products.push(newProduct);
        await fs.writeFile(this.path, JSON.stringify(products, null, '\t'));
        return newProduct;
    }

    async updateProduct(pid, newProduct) {
        const products = await this.consultarProducts();
        const updateProducts = products.map(product => product.id === pid ? {
            brand: newProduct.brand,
            model: newProduct.model,
            ram: newProduct.ram,
            memory: newProduct.memory,
            price: newProduct.price,
            colour: newProduct.colour,
            image: newProduct.image
        } : product);
        await fs.writeFile(this.path, JSON.stringify(updateProducts, null, '\t'));
        return newProduct;
    }

    async deleteProduct(pid) {
        const products = await this.consultarProducts();
        const deleteProduct = products.find(product => product.id === pid);
        const filterProducts = products.filter(product => product.id != pid);
        await fs.writeFile(this.path, JSON.stringify(filterProducts, null, '\t'));
        return deleteProduct;
    }

    async getProductsById(id) {
        let products = await this.consultarProducts();
        let findProduct = products.find(product => product.id == id);
        return findProduct;
    }

}

module.exports = CartManager;