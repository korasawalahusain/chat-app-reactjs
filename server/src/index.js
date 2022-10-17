const cors = require('cors');
const express = require('express');

const app = express();

const corsOptions = {
	origin: '*',
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
	allowedHeaders: ['Content-Type', 'authorization'],
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': '*',
	'Access-Control-Allow-Headers': 'Content-Type',
};

const router = require('./routes/index.routes');

app.use(cors(corsOptions));
app.use(express.json());

app.get('/health', (req, res) => {
	res.status(200).json({
		message: 'Welcome to Chat-App!',
	});
});

app.use('/api/v1', router);

module.exports = app;
