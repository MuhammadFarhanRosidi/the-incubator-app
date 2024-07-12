const Controller = require('../controllers/controller')
const router = require('express').Router()
const routerStartUp = require('./startUp')
const routerIncubator = require('./incubator')

router.get('/', Controller.home)
router.use('/incubators', routerIncubator)
router.use('/startUp', routerStartUp)

module.exports = router