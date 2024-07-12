const Controller = require('../controllers/controller');
const router = require('express').Router();

router.get('/', Controller.showDataStartUp)

module.exports = router