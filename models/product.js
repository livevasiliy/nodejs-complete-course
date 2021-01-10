const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		require: true,
	},
	description: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
});

module.exports = mongoose.model('Product', productSchema);

// const getDb = require("../util/database").getDb;
// const ObjectID = require("mongodb").ObjectID;

// class Product {
// 	constructor(title, price, description, imageUrl, id, userId) {
// 		this.title = title;
// 		this.price = price;
// 		this.description = description;
// 		this.imageUrl = imageUrl;
// 		this._id = id ? ObjectID(id) : null;
// 		this.userId = userId;
// 	}

// 	save() {
// 		const db = getDb();
// 		let dbOperation;

// 		if (this._id) {
// 			// Update
// 			dbOperation = db
// 				.collection("products")
// 				.updateOne({ _id: this._id }, { $set: this });
// 		} else {
// 			dbOperation = db.collection("products").insertOne(this);
// 		}
// 		return dbOperation
// 			.then((result) => {
// 				console.log(result);
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 			});
// 	}

// 	static fetchAll() {
// 		const db = getDb();
// 		return db
// 			.collection("products")
// 			.find()
// 			.toArray()
// 			.then((products) => {
// 				console.log(products);
// 				return products;
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 			});
// 	}

// 	static fetchById(id) {
// 		const db = getDb();
// 		return db
// 			.collection("products")
// 			.find({ _id: ObjectID(id) })
// 			.next()
// 			.then((product) => {
// 				return product;
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 			});
// 	}

// 	static deleteById(id) {
// 		const db = getDb();
// 		return db
// 			.collection("products")
// 			.deleteOne({ _id: ObjectID(id) })
// 			.then((result) => {
// 				console.log("DELETED");
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 			});
// 	}
// }

// module.exports = Product;
