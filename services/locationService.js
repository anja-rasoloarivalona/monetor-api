import { Location } from '../models/index.js'
import {generateId } from '../utils/index.js'


const getLocations = async userId => {
    return await Location.findAll({
        where: {
            userId
        }
    })
}

const addLocation = async (userId, data) => {
    return await Location.create({
        id: generateId(),
        userId,
        city: data.city,
        region: data.region,
        country: data.country,
        lat: data.lat,
        lng: data.lng,
        regionCode: data.regionCode,
        countryCode: data.countryCode
    })
}

const updateLocation = async (userId, data) => {
    return await Location.update({
        city: data.city,
        region: data.region,
        country: data.country,
        lat: data.lat,
        lng: data.lng,
        regionCode: data.regionCode,
        countryCode: data.countryCode
    }, {
        where: { 
            id: data.id,
            userId
        }
    })
}

const deleteLocation = async (userId, id) => {
    return await Location.destroy({
        where: {
            id,
            userId
        }
    })
}

export {
    getLocations,
    addLocation,
    updateLocation,
    deleteLocation
}