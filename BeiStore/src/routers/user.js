const express = require('express');
const router = express.Router();
const multerFolder = require('../middlewares/multerFolderMw');
const controller = require('../controllers/userController');
const CreateVerificator = require('../middlewares/users/createVerificator');
const loggedVerificator = require('../middlewares/users/loggedVerificator');
const guest = require('../middlewares/users/guestMw');
const auth = require('../middlewares/users/authMw');

// vista del Register
router.get('/register', guest, controller.indexRegister);

// Guardar Usuario
router.post('/register',[multerFolder('avatar', 'avatars/').single('avatar'), CreateVerificator], controller.save)

// vista del Login
router.get('/login', guest ,controller.indexLogin);

// Proceso de datos del Login
router.post('/login', [multerFolder('user', 'user/').single(), loggedVerificator], controller.loginProcess);

// users para front end
router.get('/datos', controller.datos)

router.get('/profile', auth, controller.profile);

router.get('/logout', controller.logout);


module.exports = router;