const { ChatService } = require('../services/chatService');

class ChatController {
	async sendMessage(req, res, next) {
		const chatService = new ChatService();
		try {
			const message = await chatService.sendMessage(req.body);
			return res.json(message);
		} catch (error) {
			console.log(error);

			return next(error);
		}
	}

	async chatHistory(req, res, next) {
		const chatService = new ChatService();
		try {
			const history = await chatService.chatHistory(req.query);
			return res.json(history);
		} catch (error) {
			console.log(error);

			return next(error);
		}
	}

	async messagesMenu(req, res, next) {
		const chatService = new ChatService();
		try {
			const history = await chatService.messagesMenu(req.query);
			return res.json(history);
		} catch (error) {
			console.log(error);

			return next(error);
		}
	}

	async groupChat(req, res, next) {
		const chatService = new ChatService();
		try {
			const group = await chatService.groupChat(req.query, req.body);
			return res.json(group);
		} catch (error) {
			console.log(error);

			return next(error);
		}
	}
}

module.exports = { ChatController };

// npm install -D eslint
