const path = require("path");
const dotenv = require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const notFoundController = require("./controllers/error");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const User = require("./models/user");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
	User.findById("5ff9ee137d0de20954304554")
		.then((user) => {
			req.user = user;
			next();
		})
		.catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(notFoundController.get404);

mongoose
	.connect(
		process.env.MONGO_URI,
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then((result) => {
		User.findOne().then((user) => {
			if (!user) {
				const user = new User({
					email: "dev@example.com",
					name: "vasiliy",
					cart: { items: [] },
				});
				user.save();
			}
		});
		app.listen(3000);
	})
	.catch((err) => {
		console.log(err);
	});
