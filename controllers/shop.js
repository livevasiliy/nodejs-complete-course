const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
	Product.fetchAll()
		.then((products) => {
			res.render("shop/product-list", {
				prods: products,
				pageTitle: "All Products",
				path: "/products",
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getProduct = (req, res, next) => {
	const productId = req.params.productId;
	Product.fetchById(productId)
		.then((product) => {
			console.log("SHOP", product);
			res.render("shop/product-detail", {
				product,
				pageTitle: product.title,
				path: "/products",
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getIndex = (req, res, next) => {
	Product.fetchAll()
		.then((products) => {
			res.render("shop/index", {
				prods: products,
				pageTitle: "Shop",
				path: "/",
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getCart = (req, res, next) => {
	req.user
		.getCart()
		.then((products) => {
			console.log("CART", products);
			res.render("shop/cart", {
				path: "/cart",
				pageTitle: "Your Cart",
				products,
			});
		})
		.catch((err) => console.log(err));
};

exports.addToCart = (req, res, next) => {
	const productId = req.body.productId;
	Product.fetchById(productId)
		.then((product) => {
			return req.user.addToCart(product);
		})
		.then((result) => {
			console.log(result);
			res.redirect("/cart");
		})
		.catch((err) => console.log(err));
};

exports.postCartDeleteItem = (req, res, next) => {
	const productId = req.body.productId;
	req.user
		.deleteItemFromCart(productId)
		.then(() => {
			res.redirect("/cart");
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getOrders = (req, res, next) => {
	req.user
		.getOrders()
		.then((orders) => {
			res.render("shop/orders", {
				path: "/orders",
				pageTitle: "Your Orders",
				orders,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getCheckout = (req, res, next) => {
	res.render("shop/checkout", {
		path: "/checkout",
		pageTitle: "Checkout",
	});
};

exports.postOrder = (req, res, next) => {
	req.user
		.addOrder()
		.then(() => {
			res.redirect("/orders");
		})
		.catch((err) => console.log(err));
};
