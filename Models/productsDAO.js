var produtos = require('./db-conn').pool;
module.exports.getAll = function (callback, next) {
    produtos.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("Select nome from Produto", function (err, rows) {
            conn.release();
            callback(rows);
        })
    })
}