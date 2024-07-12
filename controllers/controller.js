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
            res.render('index')
        } catch (error) {
            res.send(error)
        }
    }

    static async renderAddIncubator(req, res) {
        try {
            
        } catch (error) {
            res.send(error)
        }
    }

    static async handlerAddIncubator(req, res) {
        try {
            
        } catch (error) {
            res.send(error)
        }
    }

    static async showDetailIncubator(req, res) {
        try {
            
        } catch (error) {
            res.send(error)
        }
    }

    static async renderAddStartUp(req, res) {
        try {
            
        } catch (error) {
            res.send(error)
        }
    }

    static async handlerAddStartUp(req, res) {
        try {
            
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