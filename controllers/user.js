import ev from 'express-validator'
import { User, UserAssociation } from '../models/index.js'
import Sequelize from 'sequelize'
import { createRelathionship, updateUserBalance } from '../services/userService.js'
import { uploadImage } from '../services/imageService.js'

const findUser = async (req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { username } = req.query
        const users = await User.findAll({
            where: {
                username: {
                    [Sequelize.Op.like]: `%${username}%`
                }
            },
            attributes: [
                "id", "username", "city", "country"
            ]
        })
        return res.success(users, 'Found users', 200)

    }
    return res.error(errors, 'Find user failed', 500)
}

const requestFriendship = async (req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { body : data, userId } = req
        const { fromRelation } = await createRelathionship({
            fromId: userId,
            toId: data.toId
        })
        return res.success(fromRelation, 'Request friendship successfully', 200)
    }
    return res.error(errors, 'Request friendship failed', 500)
}

const uploadeProfileImage = async(req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { file } = req
        const uploaded = await uploadImage(file)
        return res.success(uploaded, "Test", 200)
    }
    return res.error(errors, 'Request friendship failed', 500)
}

const updateBalance = async(req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { body: { balance}, userId} = req
        const success = await updateUserBalance(userId, balance)
        if(success){
            return res.success(success, "Balance updated successfully", 200)
        }
    }
    return res.error(errors, 'Failed to update balance', 500)

}

export {
    findUser,
    requestFriendship,
    uploadeProfileImage,
    updateBalance
}