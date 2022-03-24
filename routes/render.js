const express = require('express');

const router = express.Router();
const { DbController } = require('../controllers/dbController');
const { SettingsController } = require('../controllers/settingsController');

const dbController = new DbController();
const settingsController = new SettingsController();

router.use(dbController.dbConnect);
router.use(dbController.dbBoostrap);

router.get('/render/:id', [settingsController.userDetails]);

module.exports = router;
