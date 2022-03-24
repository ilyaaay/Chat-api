const express = require('express');

const router = express.Router();
const { ChatController } = require('../controllers/chatController');
const { DbController } = require('../controllers/dbController');
const { SettingsController } = require('../controllers/settingsController');
const { UserController } = require('../controllers/userController');

const settingsController = new SettingsController();
const dbController = new DbController();
const userController = new UserController();
const chatController = new ChatController();

router.use(dbController.dbConnect);
router.use(dbController.dbBoostrap);

router.get('/users', [userController.usersList]);

router.post('/users', [userController.userCreate]);

router.get('/users/:id', [userController.userDetails]);

router.put('/users/:id', [userController.userPatch]);

router.delete('/users/:id', [userController.userDelete]);

router.post('/messages', [chatController.sendMessage]);

router.get('/messages', [chatController.chatHistory]);

router.get('/messages/menu', [chatController.messagesMenu]);

router.post('/images/:userId', [settingsController.imageAdd]);

router.get('/images/:id', [settingsController.showImage]);

module.exports = router;
