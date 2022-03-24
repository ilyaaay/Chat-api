const WsServer = require('ws');

class WsGateway {
	wsServer = null;

	run() {
		WsGateway.wsServer = new WsServer.Server({ port: 3000 });

		WsGateway.wsServer.on('connection', (socket) => {
			socket.send('connected...');

			socket.on('message', (data) => {
				console.log(String(data));
			});

			socket.on('error', (error) => {
				console.log(error);
			});

			socket.on('close', () => {
				console.log('Bye!');
			});
		});
	}
}

// WsGateway.wsServer = null;

module.exports = { WsGateway };
