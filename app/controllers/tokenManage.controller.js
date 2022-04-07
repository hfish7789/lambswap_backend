const db = require("../config/db.config");

db.query("CREATE TABLE if not exists `tokens_list` (\
    `id` int(255) NOT NULL AUTO_INCREMENT,\
    `chain_id` int(6) DEFAULT NULL,\
    `address` varchar(100) DEFAULT NULL,\
    `name` varchar(100) DEFAULT NULL,\
    `symbol` varchar(100) DEFAULT NULL,\
    `decimals` varchar(100) DEFAULT NULL,\
    `logoURI` longtext DEFAULT NULL,\
    PRIMARY KEY (`id`)\
  ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4", function (err) {
    if (err) throw err;
    console.log("table created");
});

exports.token_import = (req, res) => {
    var data = req.body;
    db.query("select * from `tokens_list` where address=? && chain_id=?", [data.address, data.chain_id], (err, result) => {
        if (err) { console.log(err) }
        if (result.length) {
            res.send("fail");
        } else {
            db.query("insert into `tokens_list` (chain_id, address, name, symbol, decimals, logoURI) VALUES (?,?,?,?,?,?)", [data.chain_id, data.address, data.name, data.symbol, data.decimals, data.logoURI], (err) => {
                if (err) { console.log(err) }
                res.send("success");
            })
        }
    })
}

exports.get_tokens = (req, res) => {
    db.query("select * from `tokens_list` where chain_id=?", [req.params.chain_id], (err, result) => {
        if (err) { console.log(err) }
        res.send(result);
    })
}

exports.token_filter = (req, res) => {
    db.query("select * from `tokens_list` where name like '%" + req.params.data + "%' or symbol like '%" + req.params.data + "%' or address=?", [req.params.data], (err, result) => {
        if (err) { console.log(err) }
        if (result.length) {
            res.send(result);
        } else {
            res.send([]);
        }
    })
}