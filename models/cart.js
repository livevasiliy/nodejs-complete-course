const fs = require('fs');
const path = require('path');

const rootPath = require('../util/path');
const p = path.join(rootPath, 'data', 'cart.json');

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = {
        products: [],
        totalPrice: 0
      }
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the => Find exist product
      const existingProductIndex = cart.products.findIndex(product => product.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updateProduct;
      // Add new product / increase quantity
      if (existingProduct) {
        updateProduct = {...existingProduct };
        updateProduct.qty = updateProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updateProduct;
      } else {
        updateProduct = { id: id, qty: 1};
        cart.products = [...cart.products, updateProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updateCart = {...JSON.parse(fileContent) };
      const product = updateCart.products.findIndex(prod => prod.id === id);
      if (!product) {
        return;
      }
      const productQty = product.qty;
      updateCart.products = updateCart.products.filter(product => product.id !== id);
      updateCart.totalPrice = updateCart.totalPrice - productPrice * productQty;
      fs.writeFile(p, JSON.stringify(updateCart), err => {
        console.log(err);
      });
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
}