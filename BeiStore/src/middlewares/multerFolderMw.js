const path = require('path');
const multer = require('multer');

module.exports = (name, folder) =>{
    const storage = multer.diskStorage({
        destination: (req, file, cb) =>{
            cb(null, path.resolve(__dirname, '../../public/images/', folder) );
        },
        filename: (req, file, cb) => {
            let fileName = name + '_' + Date.now() + path.extname(file.originalname)
            console.log(file); 
            cb(null, fileName);
        }
    })
    return multer({storage: storage});
}