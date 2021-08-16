const express = require('express');
const router = express.Router();
const multerFolder = require('../middlewares/multerFolderMw');
const controller = require('../controllers/userController');
const guest = require('../middlewares/users/guestMw');
const auth = require('../middlewares/users/authMw');

router.get('/register', guest, controller.indexRegister);

router.post('/save',[multerFolder('avatar', 'avatars/').single('avatar')], controller.save);

router.get('/login', guest ,controller.indexLogin);

router.post('/login', [multerFolder('user', 'user/').single()], controller.loginProcess);

router.get('/profile', auth, controller.profile);


router.get('/logout', controller.logout);


module.exports = router;