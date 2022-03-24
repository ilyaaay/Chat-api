const mysql = require('mysql2');

class DbApi {
	constructor() {
		throw new Error('static_class');
	}

	static connect() {
		return new Promise((resolve, reject) => {
			if (DbApi.connection === null || DbApi.connection === undefined) {
				DbApi.connection = mysql.createConnection({
					host: 'localhost',
					user: 'root',
					port: '3306',
					password: 'Ilia01082001!!!)(',
				});
				DbApi.connection
					.promise()
					.connect()
					.then((_) => resolve())
					.catch((error) => reject(error))

				// DbApi.connection.end((err) => {
				//     DbApi.connection = null;
				//     console.log( err );
				// });
			} else {
				return resolve();
			}
		});
	}

	static boostrap() {
		return new Promise(async (resolve, reject) => {
			if (DbApi.connection != null) {
				try {
					const sql1 = 'CREATE DATABASE IF NOT EXISTS Chat';
					const sql2 = 'USE Chat';
					const sql3 = `CREATE TABLE IF NOT EXISTS users(
                        id INT(11) PRIMARY KEY AUTO_INCREMENT,
                        name VARCHAR(255) DEFAULT NULL,
                        email VARCHAR(255) DEFAULT NULL UNIQUE,
                        password VARCHAR(255) DEFAULT NULL,
						imagePath VARCHAR(255) DEFAULT NULL)`;
					const sql4 = `CREATE TABLE IF NOT EXISTS messages(
                        fromUserId INT(11),
                        toUserId INT(11),
                        message VARCHAR(255) NOT NULL,
						id INT(11) PRIMARY KEY AUTO_INCREMENT,
                        createdAt DATETIME)`;

					await DbApi.queryPromise(sql1);

					await DbApi.queryPromise(sql2);

					await DbApi.queryPromise(sql3);

					await DbApi.queryPromise(sql4);

				} catch (error) {
					return console.log(error);
				}
			} else {
				return reject();
			}
			return resolve();
		});
	}

	static async queryPromise(sql) {
		const result = await DbApi.connection.promise().query(sql);
		return result[0];
	}
}

DbApi.connection = null;

module.exports = { DbApi };
