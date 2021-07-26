import Multer from 'multer'

const multer = Multer({
    storage: Multer.memoryStorage()
})

export default {
    singleImage: multer.single('image')
}