import express from 'express'
import ev from 'express-validator'
import {
    getUserLocations,
    addUserLocation,
    updateUserLocation,
    deleteUserLocation
} from '../controllers/location.js'

const location = express.Router()

location.get(
    "/",
    [],
    getUserLocations
)

location.post(
    "/",
    [
        ev.check('city').notEmpty(),
        ev.check('region').notEmpty(),
        ev.check('country').notEmpty(),
        ev.check('lat').notEmpty(),
        ev.check('lng').notEmpty(),
        ev.check('regionCode').notEmpty(),
        ev.check('countryCode').notEmpty()
    ],
    addUserLocation
)

location.put(
    "/",
    [
        ev.check('city').notEmpty(),
        ev.check('region').notEmpty(),
        ev.check('country').notEmpty(),
        ev.check('lat').notEmpty(),
        ev.check('lng').notEmpty(),
        ev.check('regionCode').notEmpty(),
        ev.check('countryCode').notEmpty()
    ],
    updateUserLocation
)

location.delete(
    "/",
    [
        ev.check("id").notEmpty()
    ],
    deleteUserLocation
)

export default location