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
            let {notif} = req.query
            let data = await Incubator.findByPk(+incubatorId, {
                include: {
                    model: StartUp
                }
            })
            res.render('incubatorDetail', {data, rupiah, sumValuation, notif})
        } catch (error) {
            res.send(error)
        }
    }

    static async renderAddStartUp(req, res) {
        try {
            let {incubatorId} = req.params
            let {errors} = req.query
            let data = await Incubator.findByPk(+incubatorId, {
                include: {
                    model: StartUp
                }
            })
            res.render('addStartUp', {data, errors})
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
            let {incubatorId} = req.params
            if(error.name === 'SequelizeValidationError') {
                let errors = error.errors.map(el => el.message )
                res.redirect(`/incubators/${incubatorId}/startUp/add?errors=${errors}`)
            } else {
                res.send(error)
            }
        }
    }

    static async renderEditStartUp(req, res) {
        try {
            let {incubatorId, startUpId} = req.params
            let {errors} = req.query
            let data = await StartUp.findByPk(+startUpId, {
                include: {
                    model: Incubator
                }
            })
            res.render('editStartUp', {data, errors})
        } catch (error) {
            res.send(error)
        }
    }

    static async handlerEditStartUp(req, res) {
        try {
            let {incubatorId, startUpId} = req.params
            let {startUpName, founderName, dateFound, educationOfFounder, roleOfFounder, valuation} = req.body
            await StartUp.update(
                {
                    startUpName,
                    founderName,
                    dateFound,
                    educationOfFounder,
                    roleOfFounder,
                    valuation
                },
                { where : {
                    IncubatorId : incubatorId
                    }
                }
            )
            res.redirect(`/incubators/${incubatorId}`)
        } catch (error) {
            let {incubatorId, startUpId} = req.params
            if(error.name === 'SequelizeValidationError') {
                let errors = error.errors.map(el => el.message )
                res.redirect(`/incubators/${incubatorId}/startUp/${startUpId}/edit?errors=${errors}`)
            } else {
                res.send(error)
            }
        }
    }

    static async deleteStartUp(req, res) {
        try {
            let {incubatorId, startUpId} = req.params
            let data = await StartUp.findByPk(+startUpId, {
                include: {
                    model: Incubator
                }
            })
            await StartUp.destroy({
                where: {
                    IncubatorId : incubatorId,
                    id : startUpId
                }
            })
            let notif = `Start-Up ${data.startUpName} with ${data.founderName} has been removed`
            res.redirect(`/incubators/${incubatorId}?notif=${notif}`)
        } catch (error) {
            res.send(error)
        }
    }

    static async showDataStartUp(req, res) {
        try {
            let {filter} = req.query
            let data = await StartUp.getStartUpByRoleOfFounder(filter)
            console.log(data)
            res.render('startUp', {data})
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
}

module.exports = Controller