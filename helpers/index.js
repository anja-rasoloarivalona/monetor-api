const getFileExtention = (fileName) => {
    const [, extension] = fileName.split('.');

    return extension;
}

export {
    getFileExtention
}