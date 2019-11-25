var express = require('express');
var router = express.Router();
var produto = require('../Models/productsDAO');

/* GET home page. */
router.get('/', function(req, res, next) {
  produto.getAll(function(result){
    res.send(result);
  });
});

module.exports = router;
