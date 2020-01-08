import React, { Component } from 'react';
import {Menubar} from 'primereact/menubar';
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
    // this.navigateToPage = this.navigateToPage.bind(this);
  } 

  navigateToPage = (path) => {
    this.props.history.push(path);  
  }

  render() {
    return (
      <div className="Menu">
        <Menubar model={this.state.items}/>
      </div>
    )
  }
}

export default withRouter(Menu) 
