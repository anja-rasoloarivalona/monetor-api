import { User, UserAssociation, Budget, Settings, Wallet, TodoList, Todo, TodoChecklist, Transaction, Category, Message, Image } from '../models/index.js'
import { generateId } from '../utils/index.js'
import { upload } from './storage/services.js'
import { getFileExtention} from '../helpers/index.js'


const uploadImage = async file => {
    const id = generateId();
    const fileName = `${id}.${getFileExtention(file.originalname)}`;
    const gc = await upload(
        {
            name: fileName,
            folder: 'profile'
        },
        file
    );
    console.log({
        gc
    })
    return gc
}   


export {
    uploadImage
}