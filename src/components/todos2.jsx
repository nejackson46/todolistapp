import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import "../style.css";
// import { uuid } from "uuidv4";

class Todos extends Component {
  state = { todos: JSON.parse(localStorage.getItem("todolist")) ?? {} };

  displayTodos() {
    let todo_list = this.state.todos;
    console.log(todo_list);
    if (Object.keys(todo_list).length === 0) {
      return <p>There are no items in your to-do list.</p>;
    } else {
      return (
        <table id="list">
          <tbody>
            {Object.keys(todo_list).map((todo_key) => {
              return (
                <tr key={String(todo_key)}>
                  <td>
                    <input
                      type="checkbox"
                      className={`finishtask ${String(todo_key)}`}
                      onClick={this.finishTodo}
                    />
                  </td>
                  <td className={`todos ${String(todo_key)}`}>
                    {todo_list[todo_key]}
                  </td>
                  <td>
                    <button
                      onClick={this.removeTodo}
                      className={`delete_buttons ${String(todo_key)}`}
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        // Object.keys(todo_list).map((todo_keys) => {
        //   return <p key={String(todo_keys)}>{todo_list[todo_keys]}</p>;
        //     console.log(todo_list[todo_keys]);
        // })
      );
    }
  }

  addTodo = (event) => {
    event.preventDefault();
    let newTask = event.target[0].value;
    let todo_id = String(uuidv4());
    let current_todos = JSON.parse(localStorage.getItem("todolist")) ?? {};
    // console.log(old_todos);
    current_todos[todo_id] = newTask;
    localStorage.setItem("todolist", JSON.stringify(current_todos));
    this.setState({
      todos: JSON.parse(localStorage.getItem("todolist")),
    });
    // console.log(this.state.todos);
    event.target[0].value = "";
    event.target[1].style.backgroundColor = "#efefef";
    setTimeout(() => {
      event.target[1].style.backgroundColor = "aquamarine";
    }, 500);
    // console.log(this.state.todos);
  };

  removeTodo = (event) => {
    let todo_id = event.target.classList[1];
    let current_todos = JSON.parse(localStorage.getItem("todolist")) ?? {};
    delete current_todos[todo_id];
    localStorage.setItem("todolist", JSON.stringify(current_todos));
    this.setState({
      todos: JSON.parse(localStorage.getItem("todolist")),
    });
  };

  finishTodo = (event) => {
    setTimeout(() => {
      this.removeTodo(event);
    }, 500);
  };

  render() {
    return (
      <React.Fragment>
        <div id="body">
          <h1>todos</h1>
          <form onSubmit={this.addTodo}>
            <div id="inputadd">
              <input
                type="text"
                placeholder="e.g. do laundry"
                name="todoinput"
              ></input>
              <button type="Submit">+</button>
            </div>
          </form>
          {this.displayTodos()}
        </div>
      </React.Fragment>
    );
  }
}

export default Todos;
