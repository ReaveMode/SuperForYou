var produtos = require('./db-conn').pool;
module.exports.getAll = function (callback, next) {
    produtos.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("select nome, imagem, categoria, AvgPrice, descricao from Produto, ProdutoTipo where idProdutoTipo = ProdutoTipo_idProdutoTipo", function (err, rows) {
            conn.release();
            callback(rows);
        })
    })
}

module.exports.createCart = function (obj, callback, next) {
    produtos.getConnection(function (err, conn){
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("insert into Cart(idCart, Produto, precoTotal, User_idUser, date) values (1,?,?,1,?)",[obj.produto, obj.preco, obj.date], function(err){
            conn.release();
            callback({msg:"teste"});
        })
    })


}

module.exports.getStore = function (callback, next) {
    produtos.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("select nomeSM, Latitude, Longitude from Supermercado", function (err, rows) {
            conn.release();
            callback(rows);
        })
    })
}



module.exports.getCart = function (callback, next) {
    produtos.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("select Produto, precoTotal from Cart", function (err, rows) {
            conn.release();
            callback(rows);
        })
    })
}
