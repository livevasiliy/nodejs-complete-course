const User = require("../models/user");

exports.getLogin = (req, res, next) => {
	const isLoggedIn = req.session.isLoggedIn;
	res.render("auth/login", {
		path: "/login",
		pageTitle: "Login",
		isAuthenticated: isLoggedIn,
	});
};
exports.postLogin = (req, res, next) => {
	User.findById("5ff9ee137d0de20954304554")
		.then((user) => {
			req.session.user = user;
			req.session.isLoggedIn = true;
			req.session.save((err) => {
				console.log(err);
				res.redirect("/");
			});
		})
		.catch((err) => console.log(err));
};
exports.postLogout = (req, res, next) => {
	req.session.destroy((err) => {
		console.log(err);
		res.redirect("/");
	});
};
