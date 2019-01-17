import React, {Component} from 'react';
const Action = require('./../actions/actions')
export default class Create extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            title : '',
            details: '',
            due_date: ''
        };
    }
    handleOnChangeTitle = (e)=>{
        this.setState({title: e.target.value});
    }
    handleOnchangeDetail = (e)=>{
        this.setState({details: e.target.value});
    }
    handleOnChangeDueDate =(e)=>{
        this.setState({due_date: e.target.value});
    }
    
    onSubmit = (e)=>{
        e.preventDefault();
        const obj = {
            title : this.state.title,
            details: this.state.details,
            due_date: this.state.due_date
        };
        Action.createTask(obj);
        this.setState({
            title: '',
            details: '',
            due_date: ''
        });
    }
    handleClickReset = (e)=>{
        e.preventDefault();
        this.setState({
            title: '',
            details: '',
            due_date: ''
        });
    }
    render()
    {
        return (
            <div className="card">
                <div className="card-header text-white bg-primary mb-3">Create Task</div>
                <div className="card-body mb-3">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group row">
                            <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="title" placeholder="Task Title"
                                    value={this.state.title}
                                    onChange={this.handleOnChangeTitle}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="details" className="col-sm-2 col-form-label">Details</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="details" placeholder="Task Details"
                                    value={this.state.details}
                                    onChange={this.handleOnchangeDetail}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="due_date" className="col-sm-2 col-form-label">Due Date</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="due_date" placeholder="mm/dd/yyyy"
                                value={this.state.due_date}
                                onChange={this.handleOnChangeDueDate}/>
                            </div>
                        </div>
                        
                            <button type="submit" className="btn btn-primary mr-sm-3 mr-3">Create Task</button> 
                            <button type="reset" className="btn btn-danger mr-sm-3" onClick={this.handleClickReset}>Cancel</button>
                    </form>
                </div>
            </div>
        );
    }
}