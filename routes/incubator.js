const Controller = require('../controllers/controller');
const router = require('express').Router();

router.get('/', Controller.showDataIncubator)
router.get('/add', Controller.renderAddIncubator)
router.post('/add', Controller.handlerAddIncubator)

router.get('/:incubatorId', Controller.showDetailIncubator)
router.get('/:incubatorId/startUp/add', Controller.renderAddStartUp)
router.post('/:incubatorId/startUp/add', Controller.handlerAddStartUp)

router.get('/:incubatorId/startUp/:startUpId/edit', Controller.renderEditStartUp)
router.post('/:incubatorId/startUp/:startUpId/edit', Controller.handlerEditStartUp)
router.get('/:incubatorId/startUp/:startUpId/delete', Controller.deleteStartUp)

module.exports = router