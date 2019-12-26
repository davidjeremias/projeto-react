import React from "react";

import { BrowserRouter, Route, Switch} from "react-router-dom";
import PrivateRoute from "./privateRoute"

import Login from "./components/Login/Login"
import Home from "./components/Home/Home"

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={ Login }/>
            <PrivateRoute exact path="/home" component={ Home }/>
        </Switch>
    </BrowserRouter>
);

export default Routes;