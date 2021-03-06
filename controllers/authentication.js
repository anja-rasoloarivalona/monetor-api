import ev from 'express-validator'
import { acceptTerms, generateAccessToken, generateHashedPassword, verifyPassword, verifyToken} from '../services/authService.js'
import { getUserById, getUserByEMail} from '../services/userService.js'
import { User, AccessTokens } from '../models/index.js'
import { generateId } from '../utils/index.js'
import { sanitizeUser } from '../services/userService.js'
import { getIpDetails } from '../helpers/index.js'
import requestIp from 'request-ip'
import { addLocation } from '../services/locationService.js'

const signup = async (req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){
        const { body : data } = req
        const { email } = data
        const existingUser = await getUserByEMail(email)

        if(!existingUser){
            const hashedPassword = await generateHashedPassword(data.password)
            const userId = generateId()
            const ipAddress = requestIp.getClientIp(req)
            let locationData = {
                id: generateId(),
                userId
            }   
            console.log({
                data
            })         
            if(data.lat && data.lng){
                locationData = {
                    ...locationData,
                    city: data.city,
                    region: data.region,
                    country: data.country,
                    lat: data.lat,
                    lng: data.lng,
                    regionCode: data.regionCode,
                    countryCode: data.countryCode 
                }
            } else {
                locationData = {
                    ...locationData,
                    ...getIpDetails(req)
                }
            }

            console.log({
                locationData
            })

            await User.create({
                id: userId,
                email: data.email,
                firstname: data.firstname,
                lastname: data.lastname,
                password: hashedPassword,
                city: locationData.city,
                country: locationData.country,
                balance: 0,
            })

          
  
            const location = await addLocation(userId, locationData)

            await acceptTerms({
                userId,
                ipAddress,
                version: "1.0.0"
            })

            const accessToken = await generateAccessToken({ userId, res })
            const user = await sanitizeUser(userId)
            const response = {
                token: accessToken,
                ...user,
                locations: [
                    location
                ]
            }
            return res.success(response, 'Signup successful', 201);  
        }
        return res.error([], 'Email taken', 409)
    }
    return res.error(errors, 'Signup failed', 500)
}

const login = async (req, res) => {
    const errors = ev.validationResult(req);
    if(errors.isEmpty()){
        const {  email, password } = req.body
        const user = await getUserByEMail(email)
        if(user){
            const passwordIsValid = verifyPassword(password, user.password)
            if(passwordIsValid){
                const token = await generateAccessToken({
                    userId: user.id,
                    res
                })

                const userData = await sanitizeUser(user.id)
                const responseData = {
                    user: userData,
                    token
                }
                return res.success(responseData, "Login successful", 200)
            }
            return res.error("Wrong credentials", 'Failed to login', 401)
        }
        return res.error("No user found", 'Failed to login', 404)
    }
    return res.error(errors, 'Login failed', 500)
}

const verifyAccessToken = async (req, res) => {
    const errors = ev.validationResult(req)
    if(errors.isEmpty()){

        getIpDetails(req)

        const { token } = req.body
        const tokenData = verifyToken(token, res);
        const { userId, shouldRefreshToken } = tokenData

        const access = await AccessTokens.findOne({
            where: {
                token,
                userId,
                revoked: false
            }
        })

        if(access){
            const user = await sanitizeUser(userId)
            if(user){
                const response = {
                    token,
                    ...user
                }
                return res.success(response, 'Token is valid', 200)
            }
            return res.error([], 'No user found', 404)
        }
        return res.error([], 'Unauthorized', 401)
    }
    return res.error(errors, 'Verify token failed', 500)
}

export {
    login,
    signup,
    verifyAccessToken,
}