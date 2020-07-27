import React, { Component } from "react";
import "./App.css";
import Todoinput from "./components/TodoInput";
import TodoList from "./components/todoList";
import "bootstrap/dist/css/bootstrap.min.css";
import { v1 as uuid } from "uuid";
import "font-awesome/css/font-awesome.min.css";
class App extends Component {
  state = {
    items: [],
    id: uuid(),
    item: "",
    editItem: false,
  };
  handelChange = (e) => {
    this.setState({
      item: e.target.value,
    });
  };
  handelSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: this.state.id,
      title: this.state.item,
    };

    const updatedItems = [...this.state.items, newItem];
    this.setState({
      items: updatedItems,
      item: "",
      id: uuid(),
      editItem: false,
    });
  };

  clearList = () => {
    this.setState({
      items: [],
    });
  };
  handelDelete = (id) => {
    const filteredItems = this.state.items.filter((item) => item.id !== id);
    this.setState({
      items: filteredItems,
    });
  };
  handelEdit = (id) => {
    const filteredItems = this.state.items.filter((item) => item.id !== id);
    const selectedItem = this.state.items.find((item) => item.id === id);
    console.log(selectedItem);

    this.setState({
      items: filteredItems,
      item: selectedItem.title,
      editItem: true,
      id: id,
    });
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-8 mt-4 ">
            <h3 className="text-capilatize text-center">Todo input</h3>
            <Todoinput
              item={this.state.item}
              handelChange={this.handelChange}
              handelSubmit={this.handelSubmit}
              editItem={this.state.editItem}
            />
            <TodoList
              items={this.state.items}
              clearList={this.clearList}
              handelDelete={this.handelDelete}
              handelEdit={this.handelEdit}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
