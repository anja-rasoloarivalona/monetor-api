import ev from 'express-validator'
import { getLocations, addLocation, updateLocation, deleteLocation } from '../services/locationService.js'

const getUserLocations = async (req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const locations = await getLocations(req.userId)
        if(locations){
            return res.success(locations, "Get locations successfully", 200)
        }
    }
    return res.error(errors, 'Failed to get user locoations', 500)
}

const addUserLocation = async (req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { userId, body: data } = req
        const location = await addLocation(userId, data)
        if(location){
            return res.success(location, "Location added successfully", 200)
        }
    }
    return res.error(errors, 'Failed to add location', 500)
}

const updateUserLocation = async (req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { userId, body: data } = req
        const success = await updateLocation(userId, data)
        if(success){
            return res.success([], "Location updated successfully", 200)
        }
    }
    return res.error(errors, 'Failed to update location', 500)
}

const deleteUserLocation = async (req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { userId, body: data } = req
        const success = await deleteLocation(userId, data.id)
        if(success){
            return res.success([], "Location deleted successfully", 200)
        }
    }
    return res.error(errors, 'Failed to delete location', 500)
}

export {
    getUserLocations,
    addUserLocation,
    updateUserLocation,
    deleteUserLocation
}