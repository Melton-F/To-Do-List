import express from'express'
import toDoController from '../toDoController/toDoController'
const router = express.Router()

//routers

router.route('/')
    .get(toDoController.showToDos)
    .post(toDoController.createToDos)


router.route('/comment')
    .post(toDoController.addComment)

router.route('/previousdays').get(toDoController.previousToDos)

router.route('/:id')
    .get(toDoController.getToDoById)
    .delete(toDoController.deleteById)
    .patch(toDoController.updateById)

module.exports = router