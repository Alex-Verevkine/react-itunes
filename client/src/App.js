import React, { Component } from "react";
import "./App.scss";
import Layout from "./hoc/Layout/Layout";
import { Route, Switch } from "react-router-dom";
import SearchBoard from "./containers/SearchBoard/SearchBoard";
import ItunesElement from "./containers/ItunesElement/ItunesElement";
import ErrorBoundary from "./hoc/ErrorBoundary/ErrorBoundary";
class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Layout>
          <Switch>
            <Route path="/" exact component={SearchBoard} />
            <Route path="/:elementId" component={ItunesElement} />
          </Switch>
        </Layout>
      </ErrorBoundary>
    );
  }
}

export default App;
