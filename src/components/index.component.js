import React, {Component} from 'react';
import TableRow from './TableRow';
const Action = require('./../actions/actions');

export default class Index extends Component{
    constructor(props)
    {
        super(props);
        this.state = {tasks: []};
    }

    //get all tasks after component load
    componentDidMount(){
        Action.getAllTasks().then(response=>{
            this.setState({tasks: response.data});
        });
    }
    DeleteTask = (task,index)=>{
        
        Action.deleteTask(task._id).then(()=>{
            var tasks = this.state.tasks;
            tasks.splice(index,1);
            this.setState({tasks});
        });
    }
    buildTableRow(){
        return this.state.tasks.map((task,i)=>{
            return <TableRow task={task} key={i} onClick={()=>{this.DeleteTask(task,i)}}/>
        });
    }
    render()
    {
        return (
            <div className="card">
                <div className="card-header text-white bg-primary mb-3">Tasks Listing</div>
                <div className="card-body mb-3">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Due Date</th>
                                <th colSpan="2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.buildTableRow()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}