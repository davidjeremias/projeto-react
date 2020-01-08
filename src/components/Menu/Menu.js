import React, { Component } from 'react';
import {Menubar} from 'primereact/menubar';
import {Button} from 'primereact/button';
import { withRouter } from "react-router-dom";

class Menu extends Component {
  constructor() {
    super();
    this.state = {
        items:[
            {
               label:'Busca',
               icon:'pi pi-fw pi-search',
               items:[
                  {
                     label:'Clientes',
                     icon:'pi pi-fw pi-search-plus',
                     command: ()=>{this.navigateToPage('/buscaCliente')},
                  }
               ]
            },
            {
               label:'Novo Cliente',
               icon:'pi pi-fw pi-plus-circle',
               command: ()=>{this.navigateToPage('/novoCliente')},
            }
         ]
    };

    if(this.isComum()){
      this.state.items.splice(1,1)
    }

    this.logon = this.logon.bind(this);
    this.getName = this.getName.bind(this);
  }

  getName(){
    let jwtData = localStorage.getItem('token').split('.')[1]
    let decodedJwtJsonData = atob(jwtData)
    return JSON.parse(decodedJwtJsonData).user_name
  }

  getAuthorities(){
    let jwtData = localStorage.getItem('token').split('.')[1]
    let decodedJwtJsonData = atob(jwtData)
    return JSON.parse(decodedJwtJsonData).authorities[0]
  }

  isAdmin(){
    return this.getAuthorities() === 'ROLE_ADMIN' ? true : false
  }

  isComum(){
    return this.getAuthorities() === 'ROLE_USER' ? true : false
  }

  navigateToPage = (path) => {
    this.props.history.push(path);  
  }

  logon = () => {
    localStorage.removeItem("token")
    this.props.history.push("/");  
  }

  render() {
    return (
      <div className="Menu">
        <Menubar model={this.state.items}>
          <span>Usuário: {this.getName()}</span>
          <Button label="Sair" icon="pi pi-power-off" onClick={this.logon} style={{marginLeft:4}}/>
        </Menubar>
      </div>
    )
  }
}

export default withRouter(Menu) 
