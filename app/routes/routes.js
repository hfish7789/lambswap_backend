const liquidityController = require('../controllers/liquidity.controller');

module.exports = (app) => {
    var router = require("express").Router();

    // Route to get all posts
    router.get("/get", (req, res) => {
        console.log("kwg");
    });

    // Route to get one post
    router.get("/getFromId/:id", (req, res) => {

        const id = req.params.id;
        db.query("SELECT * FROM posts WHERE id = ?", id, (err, result) => {
            if (err) {
                console.log(err)
            }
            res.send(result)
        }
        );
    });

    // Route for creating the post
    router.post('/pool/create_pool', (req, res) => {
        liquidityController.create_pool(req, res);
    })

    router.post('/pool/filter_pool', (req, res) => {
        liquidityController.filter_pool(req, res);
    })

    // Route for like
    router.get('/pool/get_pools/:chain_id', (req, res) => {
        liquidityController.get_pools(req, res);
    });

    router.get('/pool/get_pool/:chain_id/:token1_address/:token2_address', (req, res) => {
        liquidityController.get_pool(req, res);
    });

    // Route to delete a post

    router.delete('/delete/:id', (req, res) => {
        const id = req.params.id;

        db.query("DELETE FROM posts WHERE id= ?", id, (err, result) => {
            if (err) {
                console.log(err)
            }
        })
    })
    app.use('/api', router);
};