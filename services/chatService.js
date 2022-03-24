const { DbApi } = require('./db-api');
const { UserService } = require('./userService');

class ChatService {
	async sendMessage(body) {
		const sql = `INSERT INTO messages
			(fromUserId, toUserId, message, createdAt) VALUES
			(${body.fromUserId}, ${body.toUserId}, '${body.message}', NOW())`;
		await this.validateUserPair(body);

		const result = await DbApi.queryPromise(sql);
		console.log(
			`Send message from ${body.fromUserId} to ${body.toUserId}: `,
			result,
			`\nmessage: ${body.message}.`,
		);

			// const result1 = await DbApi.queryPromise(sql1);
			// console.log('Resolved insert query.', result1);

			// const insertId = result1[0].insertId;
			// const { insertId } = result1[0];
			// const sql2 = `SELECT * FROM messages WHERE id=
			// ${result1.insertId}`;

			// const result2 = await DbApi.queryPromise(sql2);
			// console.log('Resolved select query.', result2);

		return result;
	}

	async chatHistory(query) {
		const messagesSql = `SELECT messages.fromUserId, messages.toUserId,
			messages.message, messages.id, u1.name AS 'fromUser',
			u2.name AS 'toUser', messages.createdAt from messages
				INNER JOIN users AS u1 ON u1.id = messages.fromUserId
				INNER JOIN users AS u2 ON u2.id = messages.toUserId
			WHERE (fromUserId=${query.fromUserId}
				AND toUserId=${query.toUserId})
				OR (fromUserId=${query.toUserId}
				AND toUserId=${query.fromUserId})
			ORDER BY createdAt DESC`;

		await this.validateUserPair(query);

		const result = await DbApi.queryPromise(messagesSql);
		return result;
	}

	async validateUserPair({ fromUserId, toUserId }) {
		const sql = `SELECT u1.id AS fromUserId, u2.id AS toUserId
			FROM messages
			INNER JOIN users AS u1 ON u1.id = ${fromUserId}
			INNER JOIN users AS u2 ON u2.id = ${toUserId} LIMIT 1`;
		const result = await DbApi.queryPromise(sql);
		const userService = new UserService();

		await userService.userShow(fromUserId);

		await userService.userShow(toUserId);

		return result;
	}

	async messagesMenu() {
		// Frame menu!
		// const sql1 = `SELECT (CASE WHEN messages.fromUserId < messages.toUserId
		// 	THEN messages.fromUserId ELSE messages.toUserId END) AS fromUserId,
		// 	(CASE WHEN messages.fromUserId < messages.toUserId
		// 		THEN messages.toUserId ELSE messages.fromUserId END) AS toUserId
		// 		FROM(SELECT DISTINCT messages.fromUserId, messages.toUserId
		// 		FROM messages)	messages GROUP BY
		// 		CASE WHEN messages.fromUserId < messages.toUserId
		// 		THEN messages.fromUserId ELSE messages.toUserId END,
		// 		CASE WHEN messages.fromUserId < messages.toUserId
		// 		THEN messages.toUserId ELSE messages.fromUserId END;

		//  `;

		// const sql1 = `SELECT (CASE WHEN messages.fromUserId < messages.toUserId
		// 	THEN messages.fromUserId ELSE messages.toUserId END) AS fromUserId,
		// 	(CASE WHEN messages.fromUserId < messages.toUserId
		// 	THEN messages.toUserId ELSE messages.fromUserId END) AS toUserId,
		// 	(SELECT messages.message WHERE MAX(messages.createdAt) ) AS message

		// 		FROM(SELECT DISTINCT messages.fromUserId, messages.toUserId,
		// 			messages.message, messages.createdAt
		// 		FROM messages) messages GROUP BY
		// 		CASE WHEN messages.fromUserId < messages.toUserId
		// 		THEN messages.fromUserId ELSE messages.toUserId END,
		// 		CASE WHEN messages.fromUserId < messages.toUserId
		// 		THEN messages.toUserId ELSE messages.fromUserId END,
		// 		messages.message;

		// `;
		// const sql1 = `SELECT (CASE WHEN messages.fromUserId < messages.toUserId
		// 	THEN messages.fromUserId ELSE messages.toUserId END) AS fromUserId,
		// 	(CASE WHEN messages.fromUserId < messages.toUserId
		// 		THEN messages.toUserId ELSE messages.fromUserId END) AS toUserId,
		// 		(messages.message) AS message
		// 		FROM(SELECT messages.fromUserId, messages.toUserId,
		// 			messages.message, messages.createdAt
		// 		FROM messages) messages  GROUP BY
		// 		CASE WHEN messages.fromUserId < messages.toUserId
		// 		THEN messages.fromUserId ELSE messages.toUserId END,
		// 		CASE WHEN messages.fromUserId < messages.toUserId
		// 		THEN messages.toUserId ELSE messages.fromUserId END,
		// 		messages.message HAVING MAX(messages.createdAt);

		// `;

		// SELECT messages.message FROM messages WHERE messages.id = (SELECT MAX(messages.id) FROM messages);
		// 					QUERY!
		// SELECT max_id, join_messages.toUserId FROM messages
		// LEFT JOIN (SELECT MAX(id) AS max_id, toUserId
		// FROM messages GROUP BY toUserId) AS join_messages
		// ON max_id = messages.id AND fromUserId = 2;

		//! !!!!!!!!!!!!!!!

		const sql = `
			SELECT maxMessageId, messages.fromUserId, messages.toUserId,
            messages.message, messages.createdAt FROM messages
			INNER JOIN (
				SELECT MAX(messages.id)
            		AS maxMessageId, fromUserId
				FROM messages
				WHERE messages.toUserId = 2
            	GROUP BY messages.fromUserId) AS IUM_from
            ON messages.id = IUM_from.maxMessageId

			UNION

			SELECT maxMessageId, messages.fromUserId, messages.toUserId,
            messages.message, messages.createdAt FROM messages
			INNER JOIN (
				SELECT MAX(messages.id)
            		AS maxMessageId, toUserId
				FROM messages
				WHERE messages.fromUserId = 2
            	GROUP BY messages.toUserId) AS IUM_to
            ON messages.id = IUM_to.maxMessageId
			ORDER BY messages.id DESC;
			`;
		// ORDER BY messages.id DESC`;

		const result = await DbApi.queryPromise(sql);
		console.log('Messages menu: \n', result, '.');

		return result;
	}
}

module.exports = { ChatService };
