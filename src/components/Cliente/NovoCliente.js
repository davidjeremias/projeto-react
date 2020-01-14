import React, { Component } from 'react';
import Api from '../service/Api'

import {Panel} from 'primereact/panel';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';
import {InputMask} from 'primereact/inputmask';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

class NovoCliente extends Component {
  constructor(props){
    super(props)

    this.state = {
      cep:'',
      isTelFixo: false,
      isTelMovel: false,
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
      },
      emails: [],
      idx: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getEndereco = this.getEndereco.bind(this);
    this.changeTipoTelefone = this.changeTipoTelefone.bind(this);
    this.addEmail = this.addEmail.bind(this);
    this.delEmail = this.delEmail.bind(this);
    this.actionTemplate = this.actionTemplate.bind(this);
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

  changeTipoTelefone(){
    console.log(this.state.telefone);
    if(this.state.telefone.tipoTelefone === 'Residencial' || this.state.telefone.tipoTelefone === 'Comercial'){
      this.setState({isTelFixo: true});
      console.log('Fixo');
    }
    else if (this.state.telefone.tipoTelefone === 'Celular'){
      this.setState({isTelFixo: true});
      console.log('movel');
    }
  }
  addEmail(e){
    e.preventDefault();
    this.state.emails.push(this.state.email);
    this.setState({email: {email: ''}})
  }
  delEmail(e, index){
    this.setState({idx: index})
    let retorno = this.state.emails.splice(this.state.idx, 1);
    this.setState({emails: retorno})
    this.setState({idx: null})
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

  actionTemplate(rowData, column) {
    let index = column.rowIndex;
    return <div>
        <Button type="button" onClick={(e) => this.delEmail(e, {index})} icon="pi pi-trash" className="p-button-danger" style={{marginRight: '.5em'}}></Button>
    </div>;
}

  render() {
    let telefone;

    if(this.state.isTelFixo){
      telefone = <div className="numeroTel p-3">
                  <span className="p-float-label">
                    <InputMask id="numeroTel" mask="(99) 9999-9999" value={this.state.telefone.numero} onChange={(e) => this.setState({telefone: {numero: e.target.value}})} />
                    <label htmlFor="numeroTel">Número Telefone</label>
                  </span>
                </div>
    }
    if(this.state.isTelMovel){
      telefone = <div className="numeroTel p-3">
                  <span className="p-float-label">
                    <InputMask id="numeroTel" mask="(99) 99999-9999" value={this.state.telefone.numero} onChange={(e) => this.setState({telefone: {numero: e.target.value}})} />
                    <label htmlFor="numeroTel">Número Telefone</label>
                  </span>
                </div>
    }
      
    
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
              <div className="row">
                <div className="Telefone">
                  <div className="tipoTelefone p-3">
                    <Dropdown optionLabel="tipo" value={this.state.telefone.tipoTelefone} options={this.state.tipoTelefone} onChange={(e) => {this.setState({telefone: {tipoTelefone: e.value}}); this.changeTipoTelefone()}} placeholder="Tipo Telefone"/>
                    {telefone}
                  </div>
                </div>

                <div className="Email">
                  <div className="email row p-3">
                    <span className="p-float-label">
                      <InputText id="email" size="24" value={this.state.email.email} onChange={(e) => this.setState({email: {email: e.target.value}})} />
                      <label htmlFor="email">Email</label>
                    </span>
                    <Button label="Adiciona Email" icon="pi pi-sign-in" onClick={this.addEmail} />
                  </div>
                  <div className="table-email">
                    <DataTable value={this.state.emails}>
                      <Column field="email" header="Email" />
                      <Column body={this.actionTemplate} style={{textAlign:'center', width: '8em'}} header="Ações" />
                    </DataTable>
                  </div>
                </div>

              </div>
            </Panel>

            <div className="row p-3">
              <Button label="Salvar" icon="pi pi-sign-in" onClick={this.handleSubmit} />
            </div>
          </form>
        </Panel>
      </div>
    )
  }
}

export default NovoCliente