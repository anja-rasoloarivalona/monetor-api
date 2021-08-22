import { Attachment } from '../models/index.js'
import  { upload } from './storage/services.js'
import { generateId, getFileExtention } from '../utils/index.js'


async function createAttachment(data){
    const { file, url, ownerId, ownerType, title } = data
    const id = generateId();
    const payload = {
        id,
        url,
        ownerId,
        ownerType,
        title
    }
    if(file){
        const fileName = `${id}.${getFileExtention(file.originalname)}`;
        payload.url = await upload({
            name: fileName,
            folder: ownerType
        }, file)
    }
    const attachment = await Attachment.create(payload)
    return attachment
}

export {
    createAttachment
}