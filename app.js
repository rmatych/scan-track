const express = require('express');
const json2xls = require('json2xls');

/* Set up MongoDB connection: */
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/packertracker');
var ScanModel = require('./models/scan.model.js');

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
});
