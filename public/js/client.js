const socket = io();

const listProdCart = document.getElementsByClassName('listCart');
const links = document.getElementsByClassName("addToCart");

links[0].addEventListener('click', (event) => {
    socket.emit('signal', { id: links[0].id });
});

links[1].addEventListener('click', (event) => {
    socket.emit('signal', { id: links[1].id });
});

links[2].addEventListener('click', (event) => {
    socket.emit('signal', { id: links[2].id });
});

links[3].addEventListener('click', (event) => {
    socket.emit('signal', { id: links[3].id });
});

links[4].addEventListener('click', (event) => {
    socket.emit('signal', { id: links[4].id });
});

socket.on('product', (product) => {
    listProdCart.innerHTML = `<a href="#!" class="collection-item">${product}</a>`;
});