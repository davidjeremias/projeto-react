import React, { Component } from 'react'

import { withRouter } from "react-router-dom";
import axios from 'axios';
import qs from 'qs';

import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Card} from 'primereact/card';
import {Password} from 'primereact/password';

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      user: '',
      password: '',
      feedback: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () =>{
    this.props.history.push("/home");
  };

  handleSubmit(){
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
          'username': this.state.user,
          'password': this.state.password,
          'grant_type': 'password'
        })
      }).then((response) =>{
          if(response.status === 200){
            localStorage.setItem("token", response.data.access_token)
            this.handleClick()
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
  
  render() {
    const footer = <span>
                    <Button label="Entrar" icon="pi pi-check" onClick={this.handleSubmit} style={{marginRight: '.25em'}}/>
                  </span>;
    return (
        <div className="p-card-subtitle">
          <Card footer={footer} title="Login" subTitle="Acessar Cadastro de Clientes" style={{width: '360px'}}>
              <div className="user">
                <span className="p-float-label">
                  <InputText id="user" value={this.state.user} onChange={(e) => this.setState({user: e.target.value})} autoComplete="off"/>
                  <label htmlFor="user">Username</label>
                </span>
              </div>
              
              <div className="password">
                <span className="p-float-label">
                  <Password id="password" promptLabel="Digite sua senha" feedback={this.state.feedback} value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} autoComplete="off"/>
                  <label htmlFor="password">Password</label>
                </span>
              </div>
          </Card>
        </div>
    )
  }
}

export default withRouter(Login)
