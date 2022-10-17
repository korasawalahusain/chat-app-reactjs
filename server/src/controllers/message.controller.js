const { client: prisma } = require('../services/prisma.service');

module.exports.getMessages = async (req, res, next) => {
	try {
		const { from, to } = req.body;

		const messages = await prisma.message.findMany({
			where: {
				OR: [
					{
						sendorId: from,
						recieverId: to,
					},
					{
						sendorId: to,
						recieverId: from,
					},
				],
			},
		});

		const projectedMessages = messages.map((msg) => {
			return {
				fromSelf: msg.sendorId.toString() === from,
				message: msg.message,
			};
		});

		res.json({
			status: true,
			messages: projectedMessages,
		});
	} catch (ex) {
		next(ex);
	}
};

module.exports.addMessage = async (req, res, next) => {
	try {
		const { from, to, message } = req.body;
		const data = await prisma.message.create({
			data: {
				message,
				sendorId: from,
				recieverId: to,
				mentions: {},
			},
		});

		if (data)
			return res.json({
				msg: 'Message added successfully.',
				status: true,
			});
		else
			return res.json({
				msg: 'Failed to add message to the database',
				status: true,
			});
	} catch (ex) {
		next(ex);
	}
};
