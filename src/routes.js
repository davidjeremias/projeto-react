import React from "react";

import { BrowserRouter, Route, Switch} from "react-router-dom";
import PrivateRoute from "./privateRoute"

import Login from "./components/Login/Login"
import Home from "./components/Home/Home"
import BuscaCliente from "./components/Cliente/BuscaCliente"
import NovoCliente from "./components/Cliente/NovoCliente"

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={ Login }/>
            <PrivateRoute exact path="/home" component={ Home }/>
            <PrivateRoute exact path="/buscaCliente" component={ BuscaCliente }/>
            <PrivateRoute exact path="/novoCliente" component={ NovoCliente }/>
        </Switch>
    </BrowserRouter>
);

export default Routes;