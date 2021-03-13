const path = require('path');
const uuid = require('uuid').v1;

module.exports = {
    fileBuilderPath: (docName, itemType, itemId) => {
        const pathWithoutStatic = path.join('cars', `${itemId}`, itemType);

        const fileDir = path.join(process.cwd(), 'static', pathWithoutStatic);

        const fileExtension = docName.split('.').pop();

        const fileName = `${uuid()}.${fileExtension}`;

        const finalFilePath = path.join(fileDir, fileName);

        const uploadPath = path.join(pathWithoutStatic, fileName);

        return {
            finalFilePath,
            uploadPath,
            fileDir
        };
    }
};
