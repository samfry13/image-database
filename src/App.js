import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Filter from "./components/Filter";
import Content from "./components/Content";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <Header />
        <Filter />
        <Content />
      </div>
    );
  }
}

export default App;
