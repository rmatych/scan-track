const express = require('express');
const json2xls = require('json2xls');

/* Set up MongoDB connection: */
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/packertracker');

/* Check connection results: */
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Can\'t connect with Mongoose!'));
db.once('open', () => {
  console.log('Connected to the packertracker database...');
});

/* Set up MongoDB schema: */
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
var ScanModel = mongoose.model('Scan', ScanSchema);

var app = express();
app.use(json2xls.middleware);

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
	res.sendFile('index.html');
});
app.get('/spreadsheet', (req, res) => {
	const startDate = req.query.start;
	const endDate = req.query.end;
	if (startDate == undefined || endDate == undefined) {
		return res.status(500).send('Please provide a date range query!');
	}
	ScanModel.find((err, mongodata) => {
    		res.xls('spreadsheet.xlsx', mongodata, {fields: ['employee', 'location', 'tag', 'date']});
    	});
});

app.listen(8080, (err) => {
	if (err) {
		throw err;
	}
	console.log('Server started on port 8080...');
});
