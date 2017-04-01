const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ScanSchema = new Schema({
	location: String,
	barcode: Number,
	employee: Number,
	tag: Number,
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Scan', ScanSchema);
