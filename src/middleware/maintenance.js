// Maintenance Middleware
const maintenance = false

const maintenanceMiddleware = (req, res, next) => {
    if (maintenance === true) {
        res.status(503).send("Site Under Maintenance.")
    } else {
        next()
    }
}

module.exports = maintenanceMiddleware