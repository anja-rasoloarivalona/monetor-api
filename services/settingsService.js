import { Settings } from '../models/index.js'

const updateDefaultBackground = async data => {
    const { userId, imageUrl } = data
    return await Settings.update({
        defaultBackground: imageUrl
    }, {
        where: { userId }
    })
}

export {
    updateDefaultBackground
}