const express = require("express");
const { Server } = require("socket.io");
const hanblebars = require("express-handlebars");
const path = require('path');
const apiRouter = require("./routes/views.routes");
const fs = require('fs/promises');

const PORT = process.env.PORT || 8080;
const app = express();

app.engine("handlebars", hanblebars.engine());
app.set('views', path.resolve(__dirname, './views'));
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../public')));

app.use("/", apiRouter);

const httpServer = app.listen(PORT, () => {
    console.log("server running in port", PORT);
});

const io = new Server(httpServer);

const ProductManager = require("./dao/manager/ProductManager");
const managerProducts = new ProductManager(__dirname + '/data/products.json');
const CartManager = require("./dao/manager/CartManager");
const managerProductsInCart = new CartManager(__dirname + '/data/cart.json');

io.on('connection', (socket) => {
    socket.on('signal', async (data) => {
        const product = await managerProducts.getProductsById(data.id);
        await managerProductsInCart.addProduct(product);
        socket.emit('product', product);
    });
});