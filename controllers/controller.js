const { Op } = require("sequelize")
const {Incubator, StartUp} = require('../models/index')
const rupiah = require("../helpers/formatValuation")
const sumValuation = require("../helpers/sumValuation")

class Controller {
    static async home(req, res) {
        try {
            res.redirect('/incubators')
        } catch (error) {
            res.send(error)
        }
    }

    static async showDataIncubator(req, res) {
        try {
            let data = await Incubator.findAll()
            res.render('index', {data})
        } catch (error) {
            res.send(error)
        }
    }

    static async renderAddIncubator(req, res) {
        try {
            res.render('addIncubator')
        } catch (error) {
            res.send(error)
        }
    }

    static async handlerAddIncubator(req, res) {
        try {
            let {name, location, level} = req.body
            await Incubator.create({name, location, level})
            res.redirect('/')
        } catch (error) {
            res.send(error)
        }
    }

    static async showDetailIncubator(req, res) {
        try {
            let {incubatorId} = req.params
            let data = await Incubator.findByPk(+incubatorId, {
                include: {
                    model: StartUp
                }
            })
            res.render('incubatorDetail', {data, rupiah, sumValuation})
        } catch (error) {
            res.send(error)
        }
    }

    static async renderAddStartUp(req, res) {
        try {
            let {incubatorId} = req.params
            let data = await Incubator.findByPk(+incubatorId, {
                include: {
                    model: StartUp
                }
            })
            res.render('addStartUp', {data})
        } catch (error) {
            res.send(error)
        }
    }

    static async handlerAddStartUp(req, res) {
        try {
            let {incubatorId} = req.params
            let {startUpName, founderName, dateFound, educationOfFounder, roleOfFounder, valuation} = req.body
            await StartUp.create({startUpName, founderName, dateFound, educationOfFounder, roleOfFounder, valuation, IncubatorId : incubatorId})
            res.redirect(`/incubators/${incubatorId}`)
        } catch (error) {
            res.send(error)
        }
    }

    static async renderEditStartUp(req, res) {
        try {
            
        } catch (error) {
            res.send(error)
        }
    }

    static async handlerEditStartUp(req, res) {
        try {
            
        } catch (error) {
            res.send(error)
        }
    }

    static async deleteStartUp(req, res) {
        try {
            
        } catch (error) {
            res.send(error)
        }
    }

    static async showDataStartUp(req, res) {
        try {
            
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller