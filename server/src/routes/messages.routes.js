const {
	addMessage,
	getMessages,
} = require('../controllers/message.controller');

const messageRouter = require('express').Router();

messageRouter.post('/addmsg/', addMessage);

messageRouter.post('/getmsg/', getMessages);

module.exports = messageRouter;
