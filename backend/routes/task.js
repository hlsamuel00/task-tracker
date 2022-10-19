import express from "express"
const router = express.Router()
import taskController from '../controllers/task.js'


// @description     Get all tasks
// @route           GET /tasks
router.get('/', taskController.getTasks)

// @description     Get single task
// @route           GET /tasks/:id
router.get('/:id', taskController.getTask)

// @description     Create new task
// @route           POST /tasks/createTask
router.post('/createTask', taskController.createTask)

// @description     Get single task
// @route           PUT /tasks/updateReminder
router.put('/updateReminder', taskController.updateReminder)

// @description     Get single task
// @route           DELETE /tasks/:id
router.delete('/:id', taskController.deleteTask)

export default router