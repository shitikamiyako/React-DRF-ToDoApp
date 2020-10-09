import React from 'react';

export default class List extends React.Component {

    render() {
        if (this.props.todoList.length === 0) {
            return (
                <p>No List.</p>
            );
        }

        const listItems = this.props.todoList.map((todoObj, index) => {
            return(
                <li className="list__ul__li" key={index}>
                    <label className="this.props.todoList[index].isDone ? 'txt list__txt list__txt--done' : 'txt list__txt'">
                        <input
                            type="checkbox"
                            checked={todoObj.iChecked}
                            onChange={(event) => this.props.toggleIsChecked(index, event)}
                            className="input-checkbox list__checkbox" />
                        {todoObj.task_name}
                    </label>

                    <button
                        className="btn"
                        type="button"
                        onClick={(event) => this.props.toggleIsDone(index, event)}
                        >
                        {this.props.todoList[index].isDone ? 'Cancel' : 'Done'}
                    </button>
                </li>
            );
        });

        return (
            <div className="List">
                <ul className="list__ul">
                    {listItems}
                </ul>

                <button
                    className="btn btn__delete"
                    type="button"
                    onClick={this.props.deleteTodo}
                    >
                    Delete
                </button>
            </div>
        );
    }
}