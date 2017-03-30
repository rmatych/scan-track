const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const uuid = require('uuid');

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
			console.log("Failed to write file :(");
		}
		res.download(fileName, 'spreadSheet.txt', (err) => {
			if (err) {
				console.log("Failed to send file :(");
			}
			fs.unlink(fileName);
		});
	});
});

app.listen(8080, (err) => {
	if (err) {
		return console.log('Could not start the server!');
	}
	console.log('Server started on port 8080...');
});
