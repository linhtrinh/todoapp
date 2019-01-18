const Task = require('./../models/task')

/*use mongoose orm */
/**
 * thinking how to catch log error and write to file
 */
module.exports = {
    addTask: (req, res, next) => {
        let {title, details, due_date} = req.body;
        saveTask({title, details, due_date});
        function saveTask(obj)
        {
            new Task(obj).save((err,task)=>{
                if(err)
                {
                    return next(err);
                }
                    
                else if(!task)
                    res.status(400).send("unable to save task to db");
                else{
                    res.status(200).json({'task':'task is added successfully'})
                }
            });
            
        }
    },
    getAllTasks: (req,res,next)=>{

        Task.find().exec((err,tasks)=>{
            if (err)
                return next(err);
            else if (!tasks)
                res.send(404);
            else
                {
                    res.json(tasks);
                }
                
        });
    },
    getTaskById: (req,res,next) => {
        let id = req.params.id
        
        Task.findById(id).exec((err,task)=>{
            if (err)
            {
                res.status(400).send("unable to get task from db");
                return next(err);
            }  
            else if (!task)
                res.status(404).send("task is not found");
            else
                {
                    res.json(task);
                }
        });
    },
    updateTask: (req,res,next) => {
        let id = req.params.id;
        let {title, details, due_date} = req.body;
        Task.findById(id).exec((err,task)=>{
            if (err)
            {
                res.status(400).send("unable to get task from db");
                return next(err);
            }
            else if (!task)
                res.status(404).send("task is not found");
            else
                {
                    task.title = title;
                    task.details = details;
                    task.due_date = due_date;
                    task.save((err1,task)=>{
                        if(err1)
                            return next(err1);
                        else if(!task)
                            res.status(400).send("unable to save task to db");
                        else{
                            res.status(200).json({'task':'task is added successfully'})
                        }
                    });
                }
        });
    },
    deleteTask: (req,res,next) => {
        let id = req.params.id;
        Task.findOneAndDelete(id).exec((err,task)=>{
            if(err)
            {
                res.status(400).send("unable to delete");
                return next(err);
            }
            else 
                res.json('Successfully removed');
                
        });
    }
}


