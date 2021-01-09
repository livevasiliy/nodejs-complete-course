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
	const product = new Product(
		title,
		price,
		description,
		imageUrl,
		null,
		req.user._id
	);
	product
		.save()
		.then((result) => {
			res.redirect("/admin/products");
		})
		.catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
	const { title, price, description, imageUrl, productId } = req.body;
	new Product(title, price, description, imageUrl, productId)
		.save()
		.then(() => {
			res.redirect("/admin/products");
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postDeleteProduct = (req, res, next) => {
	const id = req.body.productId;
	Product.deleteById(id)
		.then((result) => {
			res.redirect("/admin/products");
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getProducts = (req, res, next) => {
	Product.fetchAll()
		.then((products) => {
			console.log(products);
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
	Product.fetchById(productId)
		.then((product) => {
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
