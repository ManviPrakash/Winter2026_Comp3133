var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST route */
router.post('/', function(req, res, next) {
  console.log('POST body:', req.body);
  res.send('POST received!');
});

module.exports = router;