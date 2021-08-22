import { v4 as uuid } from 'uuid'

const getFileExtention = (fileName) => {
    const [, extension] = fileName.split('.');

    return extension;
}


const generateId = () => {
    const id = uuid()
    return id.replace(/-/g, '').toUpperCase();
}

const isArray = (a) => {
    return (!!a) && (a.constructor === Array);
};

export {
    generateId,
    getFileExtention,
    isArray
}