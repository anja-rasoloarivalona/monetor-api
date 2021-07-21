import { User } from '../models/index.js'
import {  verifyToken } from '../services/authService.js'

async function verifyAccessToken(req, res, next) {
    const params = req.get('Authorization')
    const [bearer, token] = params.split(' ');
    if(bearer && token){
        const tokenData = verifyToken(token, res)
        const { userId } = tokenData
        const user = await User.findOne({
            where: {
                id: userId
            }
        });
        if (user) {
            req.userId = user.id
            return next();
        }
    }
    return res.error([], 'Unauthorized', 401);
}

export default verifyAccessToken;