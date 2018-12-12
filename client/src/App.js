import React, { Component } from "react";
import "./App.scss";
import Layout from "./hoc/Layout/Layout";
import { Route, Switch } from "react-router-dom";
import SearchBoard from "./containers/SearchBoard/SearchBoard";
class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={SearchBoard} />
          {/* <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} /> */}
        </Switch>
      </Layout>
    );
  }
}

export default App;
