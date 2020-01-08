import React, { Component } from 'react'

import { withRouter } from "react-router-dom";
import axios from 'axios';
import qs from 'qs';

import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Card} from 'primereact/card';
import {Password} from 'primereact/password';
import {Dialog} from 'primereact/dialog';
import {Messages} from 'primereact/messages';

class Login extends Component {
  constructor(props){
    super(props);
    localStorage.removeItem("token")
    this.state = {
      user: '',
      password: '',
      feedback: false,
      visible: true
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
            let jwtData = localStorage.getItem('token').split('.')[1]
            let decodedJwtJsonData = atob(jwtData)
            console.log(JSON.parse(decodedJwtJsonData).authorities[0]);
            this.handleClick()
          }else{
            localStorage.removeItem("token")
            this.showError()
          }
        }
      )
      .catch((error) =>{
        // handle error
        // console.log(error);
        localStorage.removeItem("token")
        this.showError()
      })
      .then(function() {
        // always executed
      });
  }

  onHide() {
    this.setState({visible: true});
  }

  showError() {
    this.messages.show({ severity: 'error', life: 10000, detail: 'Username ou password inválido' });
  }
  
  render() {
    return (
        <div className="p-card-subtitle">
          <Dialog header="Login" visible={this.state.visible} modal={false} closable={false} onHide={this.onHide} style={{marginTop: '-150px'}}>
            <Messages ref={(el) => this.messages = el}></Messages>
            <Card subTitle="Acessar Sistema de Clientes" style={{width: '360px'}}>
                <div className="user" style={{paddingTop: '1em'}}>
                  <span className="p-float-label">
                    <InputText id="user" size="35" value={this.state.user} onChange={(e) => this.setState({user: e.target.value})} autoComplete="off"/>
                    <label htmlFor="user">Username</label>
                  </span>
                </div>
                
                <div className="password" style={{paddingTop: '1.5em'}}>
                  <span className="p-float-label">
                    <Password id="password" size="35" promptLabel="Digite sua senha" feedback={this.state.feedback} value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} autoComplete="off"/>
                    <label htmlFor="password">Password</label>
                  </span>
                </div>

                <div className="button" style={{paddingTop: '1em', marginLeft: '16em'}}>
                  <Button label="Entrar" icon="pi pi-sign-in" onClick={this.handleSubmit}/>
                </div>
            </Card>
          </Dialog>
        </div>
    )
  }
}

export default withRouter(Login)
