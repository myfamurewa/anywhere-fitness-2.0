import React from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

function App() {
  return (
      <div className="App">
        <Switch>
        <PrivateRoute path="/clienthome" component={Home} />
        <Route path="/register" component={Register} />
        <Route exact path="/" component={Login}/>
        </Switch>
      </div>
  );
}

export default App;