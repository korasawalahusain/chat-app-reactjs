const { compare, hash } = require('bcrypt');
const { client: prisma } = require('../services/prisma.service');

const login = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await prisma.user.findUnique({
			where: {
				username,
			},
		});

		if (!user)
			return res.json({
				msg: 'Incorrect Username or Password',
				status: false,
			});

		if (!(await compare(password, user.password)))
			return res.json({
				msg: 'Incorrect Username or Password',
				status: false,
			});

		delete user.password;
		return res.json({
			status: true,
			user,
		});
	} catch (ex) {
		next(ex);
	}
};

const register = async (req, res, next) => {
	try {
		const { username, email, password } = req.body;
		const usernameCheck = await prisma.user.findUnique({
			where: {
				username,
			},
		});

		if (usernameCheck)
			return res.json({
				msg: 'Username already used',
				status: false,
			});

		const emailCheck = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (emailCheck) {
			return res.json({
				msg: 'Email already used',
				status: false,
			});
		}

		const user = await prisma.user.create({
			data: {
				email,
				username,
				password: await hash(password, 10),
			},
		});

		delete user.password;
		return res.json({
			status: true,
			user,
		});
	} catch (ex) {
		next(ex);
	}
};

const getAllUsers = async (req, res, next) => {
	try {
		const users = await prisma.user.findMany({
			where: {
				id: {
					not: req.params.id,
				},
			},
			select: {
				email: true,
				username: true,
				avatarImage: true,
				id: true,
			},
		});

		return res.json({
			status: true,
			users,
		});
	} catch (ex) {
		next(ex);
	}
};

const setAvatar = async (req, res, next) => {
	try {
		const userId = req.params.id;
		const { image: avatarImage } = req.body;

		const userData = await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				avatarImage,
				isAvatarImageSet: true,
			},
		});

		return res.json({
			status: true,
			image: userData.avatarImage,
		});
	} catch (ex) {
		next(ex);
	}
};

const logOut = (req, res, next) => {
	try {
		onlineUsers.delete(req.params.id);
		return res.status(200).send();
	} catch (ex) {
		next(ex);
	}
};

module.exports = {
	login,
	register,
	logOut,
	getAllUsers,
	setAvatar,
};
