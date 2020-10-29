import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './login'

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>
                <Route exact path="/home">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}