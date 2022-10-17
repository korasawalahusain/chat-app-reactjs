const {
	login,
	logOut,
	register,
	setAvatar,
	getAllUsers,
} = require('../controllers/user.controller');

const authRouter = require('express').Router();

authRouter.post('/login', login);

authRouter.get('/logout/:id', logOut);

authRouter.post('/register', register);

authRouter.post('/setavatar/:id', setAvatar);

authRouter.get('/allusers/:id', getAllUsers);

module.exports = authRouter;
