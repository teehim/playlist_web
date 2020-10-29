import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './login'
import Home from './home'

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            access_token: '',
            user: null
        };
    }

    render(){
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Login access_token={this.state.access_token} user={this.state.user}/>
                    </Route>
                    <Route exact path="/home">
                        <Home access_token={this.state.access_token} user={this.state.user}/>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;