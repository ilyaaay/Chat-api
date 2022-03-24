const { DbApi } = require('./db-api');

class UserService {
	async userCreate(body) {
		const sql = `INSERT INTO users(name, email, password)
			VALUES ('${body.name}', '${body.email}',
			'${body.password}')`;
		const result = await DbApi.queryPromise(sql);
		console.log('Create user: \n', result);
		return result;
	}

	async userList() {
		const sql = 'SELECT * FROM users';
		const result = await DbApi.queryPromise(sql);
		console.log('Show all users: \n', result);
		return result
	}

	async userShow(id) {
		const sql = `SELECT * FROM users WHERE id=${id}`;

		if (!id) {
			throw new Error("It's not id!");
		}

		const result = await DbApi.queryPromise(sql);

		if (result.length === 0 || result === undefined) {
			throw new Error("This user doesn't exist!");
		}

		console.log(`Show user with id = ${id}:\n`, result);
		return result[0];
	}

	async userPatch(id, body) {
		const sql = `UPDATE users SET name=
			'${body.name}', email='${body.email}', password='${body.password}'
			WHERE id=${id}`;

		if (!id) {
				throw new Error("It's not id!");
		}

		await this.userShow(id);

		const result = await DbApi.queryPromise(sql);
		console.log(`Update user with id = ${id}.\n`, result)
		return result;

	}

	async userRemove(id) {
		const sql = `DELETE FROM users WHERE id=${id}`;

		if (!id) {
			throw new Error("It's not id!");
		}

		await this.userShow(id);

		const result = await DbApi.queryPromise(sql);
		console.log(`Delele user with id =  ${id}.`, result);

		return result;
	}
}

module.exports = { UserService };
