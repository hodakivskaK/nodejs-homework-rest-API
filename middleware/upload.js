const multer = require("multer")
const path = require("path")
 
const destination = path.resolve("tmp")

const storage = multer.diskStorage({
    destination,

    filename: (req, file, cb) => {
        const { originalName } = file;
        const uniquePrefix = `${Date.now()}` - `${Math.round(Math.random() * 1E9)}`;
        const filename = `${uniquePrefix}_${originalName}`

        cb(null, filename)
    }, 

    limit: {
         fileSize: 1048576,
    }
})

const upload = multer({
  storage: storage,
});

module.exports = upload;