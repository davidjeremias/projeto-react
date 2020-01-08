import React from "react";

import { BrowserRouter, Route, Switch} from "react-router-dom";
import PrivateRoute from "./privateRoute"

import Login from "./components/Login/Login"
import Home from "./components/Home/Home"
import BuscaCliente from "./components/Cliente/BuscaCliente"
import NovoCliente from "./components/Cliente/NovoCliente"
import NotFound from "./components/Error/NotFound"
import NotAuthorized from "./components/Error/NotAuthorized"

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={ Login }/>
            <PrivateRoute exact path="/notFound" component={ NotFound }/>
            <PrivateRoute exact path="/notAuthorized" component={ NotAuthorized }/>
            <PrivateRoute exact path="/home" component={ Home } />
            <PrivateRoute exact path="/buscaCliente" roles={['ROLE_ADMIN', 'ROLE_USER']} component={ BuscaCliente } />
            <PrivateRoute exact path="/novoCliente" roles={['ROLE_ADMIN']} component={ NovoCliente } />
        </Switch>
    </BrowserRouter>
);

export default Routes;