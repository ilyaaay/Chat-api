const fs = require('fs');

const { DbApi } = require('./db-api');

const CWD = process.cwd();
const { UserService } = require('./userService');

const PATH = CWD + '/' + './resources/avatars';

class SettingsService {
	async imageAdd(body, id) {
		const sql = `UPDATE users SET imagePath='${PATH}'
			WHERE id=${id}`;

		await DbApi.queryPromise(sql);

		const path = await this.joinPath(id);
		fs.mkdirSync(PATH + '/' + id, { recursive: true });
		
		let buff = body.image.split(',')[1];
		
		buff = Buffer.from(buff, 'base64');
		fs.writeFileSync(path, buff);
		
		return 'Image was created!';
	}

	async joinPath(id) {
		const userService = new UserService();

		await userService.userShow(id);

		const path = PATH + '/' + id + '/avatar.png';
		return path;
	}

	async userDetails(id) {
		const path = await this.joinPath(id);
		const fileContent = fs.readFileSync(path, { encoding: 'base64' });
		return fileContent;
	}

	async showImage(id) {
		const path = await this.joinPath(id);
		const readStream = fs.createReadStream(path);
		return readStream;
	}
}

module.exports = { SettingsService };
