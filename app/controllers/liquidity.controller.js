const db = require("../config/db.config");

// Create and Save a new Tutorial
db.query("CREATE TABLE if not exists `pools` (\
    `id` int(255) NOT NULL AUTO_INCREMENT,\
    `chain_id` int(6) DEFAULT NULL,\
    `pair_address` varchar(100) DEFAULT NULL,\
    `token1_address` varchar(100) DEFAULT NULL,\
    `token2_address` varchar(100) DEFAULT NULL,\
    `token1_amount` varchar(100) DEFAULT NULL,\
    `token2_amount` varchar(100) DEFAULT NULL,\
    `total_price` int(100) DEFAULT 0,\
    `apy` float DEFAULT 0,\
    `rate` float DEFAULT NULL,\
    `created_at` timestamp NULL DEFAULT NULL,\
    `updated_at` timestamp NULL DEFAULT NULL,\
    PRIMARY KEY (`id`)\
  ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4", function (err) {
    if (err) throw err;
    console.log("table created");
});

exports.create_pool = (req, res) => {
    var data = req.body;
    db.query("select * from pools where (token1_address = ? and token2_address = ?) or (token1_address = ? and token2_address = ?)", [data.token1_address, data.token2_address, data.token2_address, data.token1_address], (err, result) => {
        if (err) { console.log(err) }
        if (result.length) {
            var rate = data.token1_amount / data.token2_amount;
            db.query("update pools set token1_address = ?, token2_address = ?, token1_amount = ?, token2_amount = ?, rate = ?, updated_at = NOW() where pair_address = ?", [data.token1_address, data.token2_address, data.token1_amount, data.token2_amount, rate, data.pair], (err) => {
                if (err) { console.log(err) }
                res.send("Pool Update Success!");
            })
        } else {
            var rate = data.token1_amount / data.token2_amount;
            db.query("insert into pools (chain_id, pair_address, token1_address, token2_address, token1_amount, token2_amount, rate, created_at, updated_at) VALUES (?,?,?,?,?,?,?,NOW(), NOW())", [data.chain_id, data.pair, data.token1_address, data.token2_address, data.token1_amount, data.token2_amount, rate], (err) => {
                if (err) { console.log(err) }
                res.send("Pool Create Success!");
            }
            );
        }
    })
};

exports.get_pools = (req, res) => {
    db.query("select * from pools where chain_id = ?", [req.params.chain_id], (err, result) => {
        if (err) { console.log(err) }
        if (result.length) {
            res.send(result);
        } else {
            res.send("NoResult");
        }
    })
}

exports.get_pool = (req, res) => {
    db.query("select * from pools where chain_id = ? and (token1_address = ? and token2_address = ?) or (token1_address = ? and token2_address = ?)", [req.params.chain_id, req.params.token1_address, req.params.token2_address, req.params.token2_address, req.params.token1_address], (err, result) => {
        if (err) { console.log(err) }
        if (result.length) {
            res.send(result[0]);
        } else {
            res.send("NoResult");
        }
    })
}

exports.filter_pool = (req, res) => {
    var data = req.body;
    var sql = "select * from pools where ";
    data.map((dt) => {
        sql += "(token1_address = '"+dt.address+"' or token2_address = '"+dt.address+"') and "
    })

    sql += "chain_id = '"+data[0].chainId+"'";

    db.query(sql, (err, result) => {
        if (result.length) {
            res.send(result);
        } else {
            res.send("NoResult");
        }
    })
}