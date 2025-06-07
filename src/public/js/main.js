const socket = io();

socket.on('updateProducts', (products) => {
    const productList = document.querySelector('.product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}">
      <h2>${product.title}</h2>
      <p>${product.description}</p>
      <p><strong>Precio:</strong> $${product.price}</p>
      <p><strong>Código:</strong> ${product.code}</p>
      <p><strong>Stock:</strong> ${product.stock}</p>
    `;

        productList.appendChild(productCard);
    });
});
