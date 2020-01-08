import React from "react";

import {Route, Redirect} from "react-router-dom";
import { isAuthenticated, getRoles } from "./auth"

const PrivateRoute = ({component: Component, roles, ...rest}) =>(
    <Route {...rest} render={props => {
        if(!isAuthenticated()){
            return <Redirect to={{ pathname: "/", state: {from: props.location} }}/>
        }else if(roles && roles.indexOf(getRoles()[0]) === -1){
            return <Redirect to={{ pathname: "/notAuthorized", state: {from: props.location} }}/>
        }else{
            return <Component {...props}/>
        }  
    }
    }/>
);

export default PrivateRoute;