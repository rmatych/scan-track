const express = require('express');
const fs = require('fs');
const uuid = require('uuid');

/* Set up MongoDB connection: */
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/scantrack')

var app = express();

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
	const fileName = 'tmp/' + uuid.v1();
	fs.writeFile(fileName, 'start: ' + startDate + '  end: ' + endDate, (err) => {
		if (err) {
			throw err;
		}
		res.download(fileName, 'spreadSheet.txt', (err) => {
			if (err) {
				throw err;
			}
			fs.unlink(fileName);
		});
	});
});

app.listen(8080, (err) => {
	if (err) {
		throw err;
	}
	console.log('Server started on port 8080...');
});
