import React, { Component } from "react";
import "./App.scss";
import Layout from "../Layout/Layout";
import { Route, Switch } from "react-router-dom";
import SearchBoard from "../SearchBoard/SearchBoard";
import ItunesElement from "../ItunesElement/ItunesElement";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Layout>
          <Switch>
            <Route path="/" exact component={SearchBoard} />
            <Route path="/media-description" component={ItunesElement} />
          </Switch>
        </Layout>
      </ErrorBoundary>
    );
  }
}

export default App;
