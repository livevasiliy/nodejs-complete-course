const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
	res.render("admin/edit-product", {
		pageTitle: "Add Product",
		path: "/admin/add-product",
		editing: false,
		isAuthenticated: req.session.isLoggedIn,
	});
};

exports.postAddProduct = (req, res, next) => {
	const { title, price, description, imageUrl } = req.body;
	const product = new Product({
		title,
		price,
		description,
		imageUrl,
		userId: req.user,
	});
	product
		.save()
		.then((result) => {
			res.redirect("/admin/products");
		})
		.catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
	const { title, price, description, imageUrl, productId } = req.body;
	Product.findByIdAndUpdate(productId, {
		title,
		price,
		description,
		imageUrl,
		userId: req.user,
	})
		.then(() => {
			res.redirect("/admin/products");
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postDeleteProduct = (req, res, next) => {
	const id = req.body.productId;
	req.user.removeFromCart(id).then(() => {
		Product.findByIdAndDelete(id)
			.then((result) => {
				res.redirect("/admin/products");
			})
			.catch((err) => {
				console.log(err);
			});
	});
};

exports.getProducts = (req, res, next) => {
	Product.find()
		.then((products) => {
			console.log(products);
			res.render("admin/products", {
				prods: products,
				pageTitle: "Admin Products",
				path: "/admin/products",
				isAuthenticated: req.session.isLoggedIn,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		res.redirect("/");
	}
	const productId = req.params.productId;
	Product.findById(productId)
		.then((product) => {
			if (!product) {
				res.redirect("/admin/products");
			}
			res.render("admin/edit-product", {
				product,
				pageTitle: "Edit Product",
				path: "/admin/edit-product",
				editing: editMode,
				isAuthenticated: req.session.isLoggedIn,
			});
		})
		.catch((err) => {
			res.redirect("/");
			console.log(err);
		});
};
