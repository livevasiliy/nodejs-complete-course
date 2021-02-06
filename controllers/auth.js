const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASSWORD,
	},
});

const User = require("../models/user");

exports.getLogin = (req, res, next) => {
	let message = req.flash("error");
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}
	res.render("auth/login", {
		path: "/login",
		pageTitle: "Login",
		errorMessage: message,
	});
};
exports.getSignUp = (req, res, next) => {
	let message = req.flash("error");
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}
	res.render("auth/signup", {
		path: "/signup",
		pageTitle: "SignUp",
		errorMessage: message,
	});
};
exports.postLogin = (req, res, next) => {
	const { email, password } = req.body;

	User.findOne({ email: email })
		.then((user) => {
			if (!user) {
				req.flash("error", "Invalid email or password");
				return res.redirect("/login");
			}
			bcrypt
				.compare(password, user.password)
				.then((doMatch) => {
					if (doMatch) {
						req.session.user = user;
						req.session.isLoggedIn = true;
						return req.session.save((err) => {
							console.log(err);
							res.redirect("/");
						});
					}
					req.flash("error", "Invalid email or password");
					res.redirect("/login");
				})
				.catch((err) => {
					console.log(err);
					res.redirect("/login");
				});
		})
		.catch((err) => console.log(err));
};
exports.postSignUp = (req, res, next) => {
	const { email, password, confirmPassword } = req.body;
	User.findOne({ email: email })
		.then((userDoc) => {
			if (userDoc) {
				req.flash(
					"error",
					"E-mail exists already, please pick a different one."
				);
				return res.redirect("/signup");
			}
			return bcrypt
				.hash(password, 12)
				.then((hashedPassword) => {
					const user = new User({
						email,
						password: hashedPassword,
						cart: { items: [] },
					});
					return user.save();
				})
				.then((result) => {
					res.redirect("/login");
					return transport
						.sendMail({
							from: '"Node.js" <from@example.com>',
							to: email,
							subject: "Signup succeded !",
							html: "<h1>You successfully signed up !</h1>",
						})
						.catch((err) => {
							console.log(err);
						});
				});
		})
		.catch((err) => {
			console.log(err);
		});
};
exports.postLogout = (req, res, next) => {
	req.session.destroy((err) => {
		console.log(err);
		res.redirect("/");
	});
};
