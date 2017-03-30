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
	if (req.query.start == undefined || req.query.end == undefined) {
		return res.status(500).send('Please provide a date range query!');
	}

	fs.writeFile('tmp/test.txt', 'start: ' + req.query.start + '  end: ' + req.query.end, (err) => {
		if (err) {
			console.log("Failed to write file :(");
		}
		res.download('tmp/test.txt', (err) => {
			if (err) {
				console.log("Failed to send file :(");
			}
			fs.unlink('tmp/test.txt');
		});
	});
});

app.listen(8080, (err) => {
	if (err) {
		return console.log('Could not start the server!');
	}
	console.log('Server started on port 8080...');
});
