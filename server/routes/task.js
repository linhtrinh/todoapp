const taskcontroller = require('./../controllers/task.ctrl')
const multipart = require('connect-multiparty')
const multipartWare = multipart()

module.exports = (router) => {
    /**
     * get all tasks
     */
    router
        .route('/tasks')
        .get(taskcontroller.getAllTasks);

    /**
     * get task by id
     */
    router
        .route('/task/:id')
        .get(taskcontroller.getTaskById);

    /**
     * add task
     */
    router
        .route('/task')
        .post(multipartWare, taskcontroller.addTask);
    
    /**
     * update task
     */
    router 
        .route('/task/update/:id')
        .post(taskcontroller.updateTask);
    /**
     * delete task
     */
    router
        .route('/task/delete/:id')
        .get(taskcontroller.deleteTask);
}