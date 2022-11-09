import express from'express'
import userController from '../userController/userController'
const router = express.Router()

//routers

router.route('/')
    .get(userController.showUsers)

router.route('/register').post(userController.register)
router.route('/login').post(userController.login)

router.route('/:id')
    .get(userController.getUserById)
    .delete(userController.deleteUser)
    .patch(userController.updateUser)

module.exports = router