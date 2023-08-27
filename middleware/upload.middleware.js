const multer = require('multer')
const path = require('path')
const fs = require('fs')
const uuid = require('uuid')

function getMulterMiddleware(imageType) {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        const rootDir = path.resolve('./')
        const folderPath = rootDir + `/uploads/${imageType}`
        if (!fs.existsSync(folderPath)) {
          console.log(`Creating ${imageType} folder directory: `, folderPath)
          fs.mkdirSync(folderPath)
        }
        cb(null, folderPath)
      },

      filename: (req, file, cb) => {
        const fileId = uuid.v4()
        const fileExtension = path.extname(file.originalname)
        const fileName = fileId + fileExtension
        cb(null, fileName)
      },
    }),

    limits: {
      fileSize: 5242880, // max size is 5 MB for each image
      files: 10, // accept 10 files maximum
    },
  })
}

module.exports = getMulterMiddleware
