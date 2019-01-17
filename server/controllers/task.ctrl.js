const Task = require('./../models/task')
const fs = require('fs')

/*use mongoose orm */
/**
 * remove next cause res.json/res.send combined with next cause header can't set after sent error
 * suspected it due to async when work with mongoose and next() to call middleware
 */
module.exports = {
    addTask: (req, res, next) => {
        let {title, details, due_date} = req.body;
        saveTask({title, details, due_date});
        function saveTask(obj)
        {
            new Task(obj).save((err,task)=>{
                if(err)
                    res.send(err);
                else if(!task)
                    res.status(400).send("unable to save task to db");
                else{
                    res.status(200).json({'task':'task is added successfully'})
                    next();
                }
            });
            
        }
    },
    getAllTasks: (req,res,next)=>{

        Task.find().exec((err,tasks)=>{
            if (err)
                res.send(err);
            else if (!tasks)
                res.send(404);
            else
                {
                    res.json(tasks);
                    next();
                }
                
        });
    },
    getTaskById: (req,res,next) => {
        let id = req.params.id
        
        Task.findById(id).exec((err,task)=>{
            if (err)
                res.status(400).send("unable to get task from db");
            else if (!task)
                res.status(404).send("task is not found");
            else
                {
                    res.json(task);
                    next();
                }
        });
    },
    updateTask: (req,res,next) => {
        let id = req.params.id;
        let {title, details, due_date} = req.body;
        Task.findById(id).exec((err,task)=>{
            if (err)
                res.status(400).send("unable to get task from db");
            else if (!task)
                res.status(404).send("task is not found");
            else
                {
                    task.title = title;
                    task.details = details;
                    task.due_date = due_date;
                    task.save((err1,task)=>{
                        if(err)
                            res.send(err1);
                        else if(!task)
                            res.status(400).send("unable to save task to db");
                        else{
                            res.status(200).json({'task':'task is added successfully'})
                            next();
                        }
                    });
                }
        });
    },
    deleteTask: (req,res,next) => {
        let id = req.params.id;
        Task.findOneAndDelete(id).exec((err,task)=>{
            if(err)
                res.status(400).send("unable to delete");
            else 
                res.json('Successfully removed');
                next();
        });
    }
}


