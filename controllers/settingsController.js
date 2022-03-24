const { UserService } = require('../services/userService');
const { SettingsService } = require('../services/userSettings');

class SettingsController {
	async imageAdd(req, res, next) {
		const settingsService = new SettingsService();
		try {
			const result = await settingsService.imageAdd(
				req.body,
				req.params.id,
			);

			res.send(result);
		} catch (error) {
			return next(error);
		}
	}

	/**
	 *
	 * @param {*} req
	 * @param {import('express').Response} res
	 * @param {*} next
	 * @returns
	 */

	async userDetails(req, res, next) {
		const userService = new UserService();
		const settingsService = new SettingsService();
		 	try {
			const result = await settingsService.userDetails(req.params.id);
			const user = await userService.userShow(req.params.id);
			user.image = result;

			return res.render('userCard', {
				title: `User #${req.params.id}`,
				message: JSON.stringify(user),
			});
		} catch (error) {
			return next(error);
		}
	}

	async showImage(req, res, next) {
		const settingsService = new SettingsService();
		try {
			const stream = await settingsService.showImage(req.params.id);

			return stream.pipe(res);
		} catch (error) {
			return next(error);
		}
	}
}

module.exports = { SettingsController };
