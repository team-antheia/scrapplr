import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import {LandingPage} from './components';

export default class routes extends Component {
    render() {
        return (
            <Router>
                <Route path='/'>
                    <LandingPage />
                </Route>
            </Router>
        )
    }
}
