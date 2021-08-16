const express = require('express');
const router = express.Router();
const multerFolder = require('../middlewares/multerFolderMw');
const controller = require('../controllers/userController');
const guest = require('../middlewares/users/guestMw');
const auth = require('../middlewares/users/authMw');

//const CreateVerificator = require('../middlewares/products/createVerificator')

router.get('/login', guest ,controller.indexLogin);
router.post('/login', [multerFolder('user', 'user/').single()], controller.loginProcess);
router.get('/profile', auth, controller.profile);

router.get('/register', guest, controller.indexRegister);
router.post('/save',[multerFolder('avatar', 'avatars/').single('avatar')], controller.save);

router.get('/logout', controller.logout);
//router.put('/update/:id', [multerFolder('user', 'users/').single()], controller.update);
//[multerFolder('user', 'usuarios/').single("avatar")],
//router.delete('/delete/:id', controller.delete);

module.exports = router;