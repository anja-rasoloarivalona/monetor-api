import { User, AccessTokens, Terms } from '../models/index.js'
import bcrypt from 'bcrypt'
import { generateId } from '../utils/index.js'
import jwt from 'jsonwebtoken'

const secret = process.env.APP_SECRET_KEY
const tokenExpiration = process.env.TOKEN_EXPIRATION
const encryptionAlgorithm = 'aes-256-cbc'


const acceptTerms = async  data => {
    const { version, ipAddress, userId } = data
    const id = generateId()
    const accepted = await Terms.create({
        id,
        userId,
        version,
        ipAddress
    })
    return accepted ? accepted : false
}

const generateAccessToken = async data => {
    const { userId, res } = data
    const token = jwt.sign(
        {
            data: {
                userId,
            }
        },
        secret,
        {
            expiresIn: tokenExpiration
        }
    )

    const generatedToken = AccessTokens
        .upsert({
        userId,
        token,
    }).then(function(test){
        return test
    })
    if(generatedToken){
        return token
    }
    return res.error([], 'FAILED TO GENERATE TOKEN', 228)
}

const generateHashedPassword = async password => {
    const saltRounds = parseInt(process.env.SALT_ROUNDS)
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

const verifyPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

const verifyToken = (token, res) => {
    const verifiedToken = jwt.verify(token, secret, (err, decoded) => {
        return !err ? decoded : false;
    });
    if(verifiedToken){
        const { data, exp } = verifiedToken
        const tokenHasNotExpired = exp * 1000 > Date.now()
        if(tokenHasNotExpired){
            const nbDaysBeforeExpiration = Math.ceil((exp * 1000 - Date.now()) / 1000 / 60 / 60 / 24)
            return {
                ...data,
                shouldRefreshToken: nbDaysBeforeExpiration > 2
            }
        }
        return res.error(['TOKEN HAS EXPIRED'], 'Unauthorized', 401)
    }
    return res.error(['TOKEN IS INVALID'], 'Unautohorized', 401);
}

export {
    acceptTerms,
    generateAccessToken,
    generateHashedPassword,
    verifyPassword,
    verifyToken
}