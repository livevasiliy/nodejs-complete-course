const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
	const uri =
		"mongodb+srv://develop:141ht8bsCPsJfBbM@cluster0.xvguz.mongodb.net/shop?retryWrites=true";
	MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
		.then((client) => {
			_db = client.db();
			callback();
		})
		.catch((err) => console.log(err));
};

const getDb = () => {
	if (_db) {
		return _db;
	}
	throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
