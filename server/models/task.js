const mongoose = require('mongoose')
let TaskSchema = new mongoose.Schema(
    {

        title: String,
        details: String,
        due_date: String
    }
);
/* below are defined method for model. sth similar to ddd model */
TaskSchema.methods.getTaskByTitle = function(_title){
    Task.find({'title': _title}).then((task)=>{
        return task;
    })
}
module.exports = mongoose.model('Task',TaskSchema);
