import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import "../style.css";
// import { uuid } from "uuidv4";

class Todos extends Component {
  state = { todos: JSON.parse(localStorage.getItem("todolist")) ?? [] };

  displayTodos() {
    if (this.state.todos.length === 0) {
      return <p>There are no items in your to-do list.</p>;
    } else {
      return (
        <table id="list">
          <tbody>
            {this.state.todos.map((to_do) => {
              return (
                <tr key={uuidv4()}>
                  <td>
                    <input
                      type="checkbox"
                      className="finishtask"
                      onClick={this.finishTodo}
                    />
                  </td>
                  <td className="todos">{to_do}</td>
                  <td>
                    <button
                      onClick={this.removeTodo}
                      className="delete_buttons"
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  }

  addTodo = (event) => {
    event.preventDefault();
    let newTask = event.target[0].value;
    let current_todos = JSON.parse(localStorage.getItem("todolist")) ?? [];
    // console.log(old_todos);
    current_todos.push(newTask);
    localStorage.setItem("todolist", JSON.stringify(current_todos));
    this.setState({
      todos: JSON.parse(localStorage.getItem("todolist")),
    });
    // console.log(this.state.todos);
    event.target[0].value = "";
    console.log(this.state.todos);
  };

  removeTodo = (event) => {
    let deleted_todo =
      event.target.parentNode.parentNode.querySelector(".todos").innerHTML;
    let old_todos = JSON.parse(localStorage.getItem("todolist")) ?? [];
    let new_todos = old_todos.filter((to_do) => to_do !== deleted_todo);
    localStorage.setItem("todolist", JSON.stringify(new_todos));
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
