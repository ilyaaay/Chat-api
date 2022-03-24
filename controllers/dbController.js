const { DbApi } = require('../services/db-api');

class DbController {
	async dbConnect(req, res, next) {
		try {
			await DbApi.connect();
			return next();
		} catch (error) {
			return next(error);
		}
	}
	async dbBoostrap(req, res, next) {
		try {
			await DbApi.boostrap();
			return next();
		} catch (error) {
			return next(error);
		}
	}
}

module.exports = { DbController };
