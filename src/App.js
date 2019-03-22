import React, { Component } from "react";
import "./App.css";
import Search from "./components/Search";
import Login from "./components/Login";
import TagFilter from "./components/TagFilter";
import Content from "./components/Content";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Database</h1>
        <Login />
        <TagFilter />
        <Search />
        <Content />
      </div>
    );
  }
}

export default App;
