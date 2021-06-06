var express = require('express');
var router = express.Router();
//★★★★★★★★★★★★★★★★★★★★★★★★★★★★//
const controller = require('./controller')
const authMiddleware = require('../../../middlewares/auth')
//★★★★★★★★★★★★★★★★★★★★★★★★★★★★//

router.post('/register',controller.register)
router.post('/login',controller.login)
router.get('/logout',controller.logout)

router.use('/check', authMiddleware)
router.get('/check', controller.check)

module.exports = router;
