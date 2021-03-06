import React, { Component } from 'react';
import DataTable from './DataTable';
import ApiService from './ApiService';
import PopUp from './PopUp';

class Autores extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nomes: [],
      titulo: 'Autores'
    };
  }


  componentDidMount() {
    ApiService.ListaAutores()
              .then(res => ApiService.TrataErros(res))
              .then (res => {
                if( res.message === 'success') {
                  this.setState({ nomes: [...this.state.nomes, ...res.data] })
                }
              })
              .catch(err => PopUp.exibeMensagem('error', "Erro na comunicação com a API ao tentar listar os autores"));
  }


  render() {
    return (
      <div className='container'>
        <h1>Página de Autores</h1>
        <DataTable
          dados={this.state.nomes}
          titulo={this.state.titulo}
          colunas={['nome']} />
      </div>
    );
  }
}

export default Autores;