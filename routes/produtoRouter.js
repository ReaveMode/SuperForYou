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



router.get('/store', function(req, res, next) {
  produto.getStore(function(result){
    res.send(result);
  });
});

router.get('/cart', function(req, res, next) {
  produto.getCart(function(result){
    res.send(result);
  });
});



router.post('/compra', function(req, res, next) {
  produto.createCart(req.body, function(result){
    res.send(result);
  });
});
