var produtos = require('./db-conn').pool;
module.exports.getAll = function (callback, next) {
    produtos.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("select nome, imagem, categoria from Produto, ProdutoTipo where idProdutoTipo = ProdutoTipo_idProdutoTipo", function (err, rows) {
            conn.release();
            callback(rows);
        })
    })
}


