var express = require('express');
var router  = express.Router();

var auth = require('../middlewares/authenticate');

var UserController = require('../controllers/user.controller');
var AuthController = require('../controllers/auth.controller');

router.route('/users').get(auth,UserController.get);
router.route('/users').post(UserController.create);
router.route('/users/:id').get(UserController.getById);
router.route('/users/:id').put(auth,UserController.update);
router.route('/users/:id').delete(auth,UserController.delete);

router.route('/register').post(AuthController.register);
router.route('/login').post(AuthController.login);
router.route('/logout').post( AuthController.logout);

module.exports = router;