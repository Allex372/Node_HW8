const { errorMessages, ErrorHendler } = require('../error');
const { constants } = require('../constant');

module.exports = {
    checkFile: (req, res, next) => {
        try {
            const { files } = req;

            // console.log(files);

            const documents = [];
            const photos = [];
            const videos = [];

            const allFiles = Object.values(files);

            for (let i = 0; i < allFiles.length; i++) {
                const { name, size, mimetype } = allFiles[i];

                if (constants.PHOTOS_MIMETYPES.includes(mimetype)) {
                    if (constants.PHOTO_MAX_SIZE < size) {
                        throw new Error(`${name} too big`);
                    }
                    photos.push(allFiles[i]);
                } else if (constants.DOCS_MIMETYPES.includes(mimetype)) {
                    if (constants.FILE_MAX_SIZE < size) {
                        throw new Error(`${name} too big`);
                    }

                    documents.push(allFiles[i]);
                } else if (constants.VIDEOS_MIMETYPES.includes(mimetype)) {
                    if (constants.FILE_MAX_SIZE < size) {
                        throw new Error(`${name} too big`);
                    }

                    videos.push(allFiles[i]);
                } else {
                    throw new ErrorHendler(errorMessages.NOT_VALID_FILE);
                }
            }

            req.videos = videos;
            req.docs = documents;
            // eslint-disable-next-line prefer-destructuring
            req.photos = photos;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAvatarLength: (req, res, next) => {
        try {
            const [avatar] = req.photos;

            if (req.photos.length > 1) {
                throw new ErrorHendler(errorMessages.TOO_MATCH_PHOTOS);
            }

            req.avatar = avatar;

            next();
        } catch (e) {
            next(e);
        }
    },
    checkDocumentLength: (req, res, next) => {
        try {
            const [docs] = req.docs;

            if (req.docs.length > 1) {
                throw new ErrorHendler(errorMessages.TOO_MATCH_PHOTOS);
            }

            req.docs = docs;

            next();
        } catch (e) {
            next(e);
        }
    },
    checkVideoLength: (req, res, next) => {
        try {
            const [videos] = req.videos;

            if (req.videos.length > 1) {
                throw new ErrorHendler(errorMessages.TOO_MATCH_PHOTOS);
            }

            req.videos = videos;

            next();
        } catch (e) {
            next(e);
        }
    },
};
