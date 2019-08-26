import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import Register from './Register';
import Countctt from './Countctt';

export default class route extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={App}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/countctt" component={Countctt}/>
                </Switch>
            </Router>
        );
    }
}