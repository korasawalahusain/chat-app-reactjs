const http = require('http');
const app = require('./src');
const socket = require('socket.io');

const port = process.env.PORT || 4193;

app.set('port', port);

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

	switch (error.code) {
		case 'EACCES':
			console.error(`${bind} requires elevated privileges`);
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(`${bind} is already in use`);
			process.exit(1);
			break;
		default:
			throw error;
	}
}

function onListening() {
	console.log(`Listening to the server on http://localhost:${port}`);
}

const server = http.createServer(app);
const io = socket(server, {
	cors: {
		origin: '*',
		credentials: true,
	},
});

global.onlineUsers = new Map();
io.on('connection', (socket) => {
	global.chatSocket = socket;
	socket.on('add-user', (userId) => {
		onlineUsers.set(userId, socket.id);
	});

	socket.on('send-msg', (data) => {
		const sendUserSocket = onlineUsers.get(data.to);
		if (sendUserSocket) {
			socket.to(sendUserSocket).emit('msg-recieve', data.msg);
		}
	});
});

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
