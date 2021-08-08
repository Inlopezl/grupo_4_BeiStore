const express = require('express');
const router = express.Router();
const multerFolder = require('../middlewares/multerFolderMw');
const controller = require('../controllers/userController');
//const CreateVerificator = require('../middlewares/products/createVerificator')

router.get('/login', controller.indexLogin);
router.get('/register', controller.indexRegister);

router.post('/save',[multerFolder('avatar', 'avatars/').single('avatar')], controller.save);
//router.put('/update/:id', [multerFolder('user', 'users/').single()], controller.update);
//[multerFolder('user', 'usuarios/').single("avatar")],
//router.delete('/delete/:id', controller.delete);

module.exports = router;