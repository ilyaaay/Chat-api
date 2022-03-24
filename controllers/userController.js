const { UserService } = require('../services/userService');

class UserController {
	async userCreate(req, res, next) {
		const userService = new UserService();
		try {
			const user = await userService.userCreate(req.body);

			return res.json(user);
		} catch (error) {
			return next(error);
		}
	}

	async usersList(req, res, next) {
		const userService = new UserService();
		try {
			const list = await userService.userList(req.params);

			return res.json(list);
		} catch (error) {
			return next(error);
		}
	}

	async userDetails(req, res, next) {
		// return next({ code: 1, message: 'error'});
		const userService = new UserService();
		try {
			const user = await userService.userShow(req.params.id);

			return res.json(user);
		} catch (error) {
			return next(error);
		}
	}

	async userPatch(req, res, next) {
		const userService = new UserService();
		try {
			const user = await userService.userPatch(req.params.id, req.body);

			return res.json(user);
		} catch (error) {
			return next(error);
		}
	}

	async userDelete(req, res, next) {
		const userService = new UserService();
		try {
			const user = await userService.userRemove(req.params.id);

			return res.json(user);
		} catch (error) {
			return next(error);
		}
	}
}

module.exports = { UserController };
