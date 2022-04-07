const liquidityController = require('../controllers/liquidity.controller');
const tokenManageController = require('../controllers/tokenManage.controller');

module.exports = (app) => {
    var router = require("express").Router();

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

    router.post('/token_import', (req, res) => {
        tokenManageController.token_import(req, res);
    });

    router.get('/get_tokens/:chain_id', (req, res) => {
        tokenManageController.get_tokens(req, res);
    });

    router.get('/token_filter/:data', (req, res) => {
        tokenManageController.token_filter(req, res);
    });
    app.use('/api', router);
};