const express = require('express');
const fs = require('fs');
const uuid = require('uuid');
const mongoXlsx = require('mongo-xlsx');

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

	var mongodata = [];
	ScanSchema.find(function(err, scans) {
    	for (let i = 0; i < scans.length; i++) {
            mongodata[i] = motors[i];
        }
    });
    var datamodel = mongoXlsx.buildDynamicModel(mongodata);
    mongoXlsx.mongoData2Xlsx(mongodata, datamodel, (err, data) => {
    	if (err) {
    		throw err;
    	}
		fs.writeFile(fileName, data, (err) => {
			if (err) {
				throw err;
			}
			res.download(fileName, 'spreadSheet.xlsx', (err) => {
				if (err) {
					throw err;
				}
				fs.unlink(fileName);
			});
		});
    });
});

app.listen(8080, (err) => {
	if (err) {
		throw err;
	}
	console.log('Server started on port 8080...');
});
