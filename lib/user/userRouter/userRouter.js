'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userController = require('../userController/userController');

var _userController2 = _interopRequireDefault(_userController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//routers

router.route('/').get(_userController2.default.showUsers);

router.route('/register').post(_userController2.default.register);
router.route('/login').post(_userController2.default.login);

router.route('/:id').get(_userController2.default.getUserById).delete(_userController2.default.deleteUser).patch(_userController2.default.updateUser);

module.exports = router;