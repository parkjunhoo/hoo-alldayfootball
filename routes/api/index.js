var express = require('express');
var router = express.Router();
//★★★★★★★★★★★★★★★★★★★★★★★★★★★★//
var auth = require('./auth')
var board = require('./board')
var setting = require('./setting')
//★★★★★★★★★★★★★★★★★★★★★★★★★★★★//

router.use('/auth',auth);
router.use('/board',board);
router.use('/setting',setting);

router.all('*', (req,res)=>{
  console.log(req.session);
  res.sendStatus(404);
});

module.exports = router;