const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const mongoConnect = require("./util/database").mongoConnect;

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
	User.findById("5ff56047a98bdd4df836f64e")
		.then((user) => {
			req.user = new User(user.name, user.email, user.cart, user._id);
			next();
		})
		.catch((err) => console.log(err));	
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(notFoundController.get404);

mongoConnect(() => {
	app.listen(3000);
});
