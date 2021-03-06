const Product = require("../models/product");
const Order = require("../models/order");

exports.getProducts = (req, res, next) => {
	Product.find()
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
	Product.findById(productId)
		.then((product) => {
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
	Product.find()
		.then((products) => {
			res.render("shop/index", {
				prods: products,
				pageTitle: "Shop",
				path: "/"
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getCart = (req, res, next) => {
	req.user
		.populate("cart.items.productId")
		.execPopulate()
		.then((user) => {
			res.render("shop/cart", {
				path: "/cart",
				pageTitle: "Your Cart",
				products: user.cart.items,
			});
		})
		.catch((err) => console.log(err));
};

exports.addToCart = (req, res, next) => {
	const productId = req.body.productId;
	Product.findById(productId)
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
		.removeFromCart(productId)
		.then(() => {
			res.redirect("/cart");
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getOrders = (req, res, next) => {
	Order.find({ "user.userId": req.user._id })
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
		.populate("cart.items.productId")
		.execPopulate()
		.then((user) => {
			const products = user.cart.items.map((item) => {
				return {
					quantity: item.quantity,
					product: { ...item.productId._doc },
				};
			});
			const order = new Order({
				user: {
					email: req.user.email,
					userId: req.user,
				},
				products,
			});
			return order.save();
		})
		.then((result) => {
			return req.user.clearCart();
		})
		.then(() => {
			res.redirect("/orders");
		})
		.catch((err) => {
			console.log(err);
		});
};
