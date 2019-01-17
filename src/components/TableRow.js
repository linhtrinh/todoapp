import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class TableRow extends Component{

    
    render(){
        return(
            <tr>
                <td>
                    {this.props.task.title}
                </td>
                <td>
                    {this.props.task.due_date}
                </td>
                <td>
                    <Link to={"/edit/"+this.props.task._id} className="btn btn-primary">Edit</Link>
                </td>
                <td>
                    <button className="btn btn-danger" onClick={this.props.onClick}>Delete</button>
                </td>
            </tr>
    )};
}
export default TableRow;