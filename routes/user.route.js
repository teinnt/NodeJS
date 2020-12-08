var express = require("express");

var controller = require("../controller/user.controller");

var router = express.Router();

router.get('/', controller.home);

router.get('/search', controller.search);

router.get('/create', controller.createUser)

router.get('/:id', controller.getUser);

router.post('/create', controller.createUserPOST);

module.exports = router;