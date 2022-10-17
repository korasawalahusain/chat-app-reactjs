const authRouter = require('./auth.routes');
const messageRouter = require('./messages.routes');

const indexRouter = require('express').Router();

indexRouter.use('/auth', authRouter);

indexRouter.use('/messages', messageRouter);

module.exports = indexRouter;
