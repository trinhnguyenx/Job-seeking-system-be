const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.Controller');

const bodyParser = require('body-parser')
router.use(bodyParser.json())


router.post('/login',AuthController.login)
router.post('/register',AuthController.register)
router.put('/:id',AuthController.updateUserInfo)
router.delete('/:id',AuthController.deleteUser)
router.post('/sendmail',AuthController.sendMail)
router.get('/refresh',AuthController.refreshToken)
router.post('/forgotpassword',AuthController.forgotpassWord)
router.post('/resetpassword',AuthController.resetPassword)



module.exports = router;