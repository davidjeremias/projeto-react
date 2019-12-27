import React, { Component } from 'react'

import { withRouter } from "react-router-dom";
import { Formik, ErrorMessage, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import qs from 'qs';

class Login extends Component {
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values){
    console.log(values); 
      axios.request({
        method: 'post',
        url: 'http://localhost:9080/cadcli-backend/oauth/token',
        auth:{
          username: 'react',
          password: 're@ct0'
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf8"
        },
        data: qs.stringify({
          'client': 'react',
          'username': values.user+'',
          'password': values.password+'',
          'grant_type': 'password'
        })
      }).then(
        function(response) {
          if(response.status === 200){
            localStorage.setItem("token", response.data.access_token)
            this.props.history.push('/home');
          }else{
            localStorage.removeItem("token")
          }
          
        }
      )
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
    
  }

  validations = yup.object().shape({
    user: yup.string().required(),
    password: yup.string().min(6).required()
  })
  
  render() {
    return (
      <div className="Login">
        <Formik initialValues={{}} onSubmit={this.handleSubmit} validationSchema={this.validations}>
          <Form className="Form">
            <div className="Form-Group">
              <Field name="user" className="Form-Field"/>
              <ErrorMessage component="span" name="user" className="Form-Error"/>
            </div>
            <div className="Form-Group">
              <Field name="password" type="password" className="Form-Field"/>
              <ErrorMessage component="span" name="password" className="Form-Error"/>
            </div>
            <button className="Form-Btn" type="submit">Login</button>
          </Form>
        </Formik>
      </div>
    )
  }
}

export default withRouter(Login)
