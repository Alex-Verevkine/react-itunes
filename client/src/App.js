import React, { Component } from "react";
import "./App.scss";
import Layout from "./hoc/Layout/Layout";
import { Route, Switch } from "react-router-dom";
import SearchBoard from "./containers/SearchBoard/SearchBoard";
import ItunesElement from "./containers/ItunesElement/ItunesElement";
class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={SearchBoard} />
          <Route path="/:elementId" component={ItunesElement} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
