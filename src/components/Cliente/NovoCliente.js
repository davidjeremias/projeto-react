import React, { Component } from 'react';
import Api from '../service/Api'

import {Panel} from 'primereact/panel';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';

class NovoCliente extends Component {
  constructor(props){
    super(props)

    this.state = {
      cep:'',
      cliente: {
        nome: '',
        cpf: ''
      },
      endereco:{
        cep: '',
        logradouro: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: ''
      },
      tipoTelefone: [
        {
          id: 1,
          tipo: 'Residencial'
        },
        {
          id: 2,
          tipo: 'Comercial'
        },
        {
          id: 3,
          tipo: 'Celular'
        }
      ]
      ,
      telefone: {
        tipoTelefone: '',
        numero: ''
      },
      email: {
        email: ''
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getEndereco = this.getEndereco.bind(this);
  }

  handleSubmit(){
    Api.post('/cliente')
      .then((response) =>{
          if(response.status === 200){
           
          }
        }
      )
      .catch((error) =>{
        // handle error
        console.log(error);
      });
  }

  getEndereco(e){
    e.preventDefault();
    let cep = this.state.cep
    
    Api.get('/endereco', {params: {cep: cep}})
      .then((response) =>{
          if(response.status === 200){
           this.setState(prevState => ({
             endereco: {
               ...prevState.endereco,
               logradouro: response.data.logradouro,
               complemento: response.data.complemento,
               bairro: response.data.bairro,
               cidade: response.data.localidade,
               uf: response.data.uf
             }
           }))
          }
        }
      )
      .catch((error) =>{
        // handle error
        console.log(error);
      });
  }

  render() {
    return (
      <div className="NovoCliente container-fluid">
        <Panel header="Novo Cliente">
          <form autoComplete="off">
            
            <Panel header="Dados Pessoais" className="p-3">
              <div className="row">
                <div className="nome p-3">
                  <span className="p-float-label">
                    <InputText id="nome" size="30" value={this.state.cliente.nome} onChange={(e) => this.setState({cliente: {nome: e.target.value}})} />
                    <label htmlFor="nome">Nome</label>
                  </span>
                </div>

                <div className="cpf p-3">
                  <span className="p-float-label">
                    <InputText id="cpf" value={this.state.cliente.cpf} onChange={(e) => this.setState({cliente: {cpf: e.target.value}})} />
                    <label htmlFor="cpf">CPF</label>
                  </span>
                </div>
              </div>
            </Panel>
              
            <Panel header="Endereço" className="p-3">
              <div className="cep row p-3" >
                <span className="p-float-label">
                  <InputText id="cep" value={this.state.cep} onChange={(e) => this.setState({cep: e.target.value})}/>
                  <label htmlFor="cep">CEP</label>
                </span>
                <Button label="Busca CEP" icon="pi pi-sign-in" onClick={this.getEndereco} />
              </div>

              <div className="row">
                <div className="logradouro p-3">
                  <span className="p-float-label">
                    <InputText id="logradouro" size="33" value={this.state.endereco.logradouro} onChange={(e) => this.setState({endereco: {logradouro: e.target.value}})} />
                    <label htmlFor="logradouro">Logradouro</label>
                  </span>
                </div>

                <div className="complemento p-3">
                  <span className="p-float-label">
                    <InputText id="complemento" size="33" value={this.state.endereco.complemento} onChange={(e) => this.setState({endereco: {complemento: e.target.value}})} />
                    <label htmlFor="complemento">Complemento</label>
                  </span>
                </div>
              </div>
                
              <div className="row">
                <div className="bairro p-3">
                  <span className="p-float-label">
                    <InputText id="bairro" size="24" value={this.state.endereco.bairro} onChange={(e) => this.setState({endereco: {bairro: e.target.value}})} />
                    <label htmlFor="bairro">Bairro</label>
                  </span>
                </div>

                <div className="cidade p-3">
                  <span className="p-float-label">
                    <InputText id="cidade" size="24" value={this.state.endereco.cidade} onChange={(e) => this.setState({endereco: {cidade: e.target.value}})} />
                    <label htmlFor="cidade">Cidade</label>
                  </span>
                </div>

                <div className="uf p-3">
                  <span className="p-float-label">
                    <InputText id="uf" size="10" value={this.state.endereco.uf} onChange={(e) => this.setState({endereco: {uf: e.target.value}})} />
                    <label htmlFor="uf">UF</label>
                  </span>
                </div>
              </div>
            </Panel>
          
            <Panel header="Contato" className="p-3">
      
            </Panel>

            <div className="row p-3">
              <Button label="Salvar" icon="pi pi-sign-in" onClick={this.handleSubmit} />
            </div>

            <span>{this.state.cliente.nome}</span>
          </form>
        </Panel>
      </div>
    )
  }
}

export default NovoCliente