const { Router } = require('express');
const router = Router();

const ProductManager = require("../dao/manager/ProductManager");
const managerProducts = new ProductManager(__dirname + '/../data/products.json');

router.get('/', async (req, res) => {
    const products = await managerProducts.consultarProducts();
    res.render("home", { products });
});

router.post('/', async (req, res) => {
    const newProduct = req.body;
    const productAdded = await managerProducts.addProduct(newProduct);
    res.json({
        status: 'success',
        payload: productAdded
    });
});

router.put('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    const newProduct = req.body;
    const productUpdated = await managerProducts.updateProduct(pid, newProduct);
    res.json({
        status: 'success',
        payload: productUpdated
    });
});

router.delete('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    const productDelete = await managerProducts.deleteProduct(pid);
    res.json({
        status: 'success',
        payload: productDelete
    });
});

router.get('/cart', async (req, res) => {
    res.render('cart', {});
});

module.exports = router;