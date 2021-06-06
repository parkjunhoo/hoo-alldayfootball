var express = require('express');
var router = express.Router();
//★★★★★★★★★★★★★★★★★★★★★★★★★★★★//
const controller = require('./controller')
//★★★★★★★★★★★★★★★★★★★★★★★★★★★★//

router.get('/find',controller.find)
router.put('/edit',controller.edit)

module.exports = router;
