const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
	res.render("admin/edit-product", {
		pageTitle: "Add Product",
		path: "/admin/add-product",
		editing: false,
	});
};

exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const price = req.body.price;
	const description = req.body.description;
	req.user
		.createProduct({
			title,
			imageUrl,
			price,
			description,
		})
		.then((result) => {
			console.log("Created Product");
			res.redirect("/admin/products");
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postEditProduct = (req, res, next) => {
	const id = req.body.productId;
	Product.findByPk(id)
		.then((product) => {
			product.title = req.body.title;
			product.imageUrl = req.body.imageUrl;
			product.description = req.body.description;
			product.price = req.body.price;
			return product.save();
		})
		.then((result) => {
			res.redirect("/admin/products");
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postDeleteProduct = (req, res, next) => {
	const id = req.body.productId;
	Product.findByPk(id)
		.then((product) => {
			return product.destroy();
		})
		.then((result) => {
			res.redirect("/admin/products");
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getProducts = (req, res, next) => {
	req.user
		.getProducts()
		.then((products) => {
			res.render("admin/products", {
				prods: products,
				pageTitle: "Admin Products",
				path: "/admin/products",
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
	req.user
		.getProducts({ where: { id: productId } })
		.then((products) => {
			const product = products[0];
			if (!product) {
				res.redirect("/admin/products");
			}
			res.render("admin/edit-product", {
				product,
				pageTitle: "Edit Product",
				path: "/admin/edit-product",
				editing: editMode,
			});
		})
		.catch((err) => {
			res.redirect("/");
			console.log(err);
		});
};
