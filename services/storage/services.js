import { bucket } from './config.js'


const upload = async ({ name, folder }, file) => {
    const fileName = `${folder}/${name}`
    const blob = bucket.file(fileName);
    return blob.getSignedUrl({
        action: "read",
        expires: "03-09-2491"
    }).then(urls => {
        // console.log({
        //     urls
        // })
        const url = urls[0]
        const stream = blob.createWriteStream();
        stream.on('error', err => console.log({
            err
        }));
        // stream.on('finish', async () => {
        //     await blob.makePublic();
        // });
        stream.end(file.buffer);
        return url
    })
}

export {
    upload
}