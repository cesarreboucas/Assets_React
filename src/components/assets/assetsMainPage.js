import React, {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import TradeTable from './tradeTable.js';
import CanvasChart from './canvasChart.js';
import CenteredOptionsModal from '../header/centeredOptionsModal.js';

const defaultCollumStyle = () => {
  return {
    color: '#dddddd'
  }
}

const expandRow = {
  /*parentClassName: 'parent-expand-foo',*/
  renderer: row => (
    <TradeTable trades={row.trades}/>
  ),showExpandColumn: true,
  expandByColumnOnly: true
};

class AssetsMainPage extends Component {
  state =  {
      loading:true,
      assets: [],
      showModalOptions:false
    }

    toggleModalOptions = (asset) => {
      console.log("obj", asset);
      this.setState({showModalOptions:!this.state.showModalOptions})
      console.log("Show", this.state.showModalOptions);

    }

  tableColumns = [
    {
      dataField: 'codigo',
      text: 'Name',
      style: defaultCollumStyle
    }, {
      dataField: 'saldo',
      text: 'Balance',
      align: 'right',
      style: defaultCollumStyle
    }, {
      dataField: 'unitario',
      text: 'Unit',  
      formatter: (cell) => { return `$ ${cell.toFixed(2)}`;},
      align: 'right',
      style: defaultCollumStyle
    }, {
      dataField: 'total',
      text: 'Total',
      align: 'right',
      formatter: (cell,row) => { return `$ ${(row.unitario * row.saldo).toFixed(2)}`;},
      style: defaultCollumStyle
    }, {
      dataField: 'guess',
      text: 'Return',
      align: 'right',
      formatter: (cell) => { return `${(cell*100).toFixed(2)}%`;},
      style: defaultCollumStyle
    }, {
      dataField: 'options',
      text: 'Options',
      style: defaultCollumStyle,
      formatter: (cell,row) => { 
        return (<span><button id="btnopcoes" className="btn btn-sm btn-light" onClick={() => this.toggleModalOptions(row._id)}>Options</button>&nbsp;
          <button id="btnaddtrade" className="btn btn-sm btn-light">Add Trade</button></span>)},
    }
  ];

    //dataCharts = [];
    
  componentDidMount(){
    fetch("http://localhost:4000/api/ativos", {headers: {'Content-Type': 'application/json'}})
    .then(res => res.json())
    .then(result => {
      this.dataCharts = [];
      this.buildDatasets(result);
      this.setState({loading:false,assets: result});
      console.log(this.state.assets);
    });
  }
  
  render() {
    return (
      <div>
        <h1>Lista de Ativos</h1>
        <div className="container">
          <BootstrapTable keyField='id' classes="table table-dark" data={this.state.assets} columns={this.tableColumns} bordered={false} expandRow={expandRow}/>         
          
          <div className="text-right" style={{padding: "0px 20px 20px 0px"}}>
            <a className="btn btn-primary" data-toggle="collapse" href="#divGraph" role="button">Ver Gr&aacute;fico</a>
            <a className="btn btn-primary" role="button" href="/ativos/create">Novo</a>
          </div>
          <div className="collapse show " id="divGraph" style={{width:"800px", margin:"auto"}}>
            <div className="row">
              <div className="col">
                {this.state.loading ? '' : <CanvasChart data={this.dataCharts[0]} />}
              </div>
              <div className="col">
                {this.state.loading ? '' : <CanvasChart data={this.dataCharts[1]} />}
              </div>
            </div>
            <div className="row">
              <div className="col">
                {this.state.loading ? '' : <CanvasChart data={this.dataCharts[2]} />}
              </div>
              <div className="col">
                {this.state.loading ? '' : <CanvasChart data={this.dataCharts[3]} />}
              </div>
            </div>
          </div>
        </div>
        <CenteredOptionsModal show={this.state.showModalOptions} onHide={this.toggleModalOptions} />



        {/* Modal Para Add Trade */}
        {/*
        <div className="modal fade" id="TradeModal" tabIndex="-1" role="dialog" aria-labelledby="Novo Trade" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Adicionar Trade</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="user-form" action="/ativos/newtrade" method="POST" id="formNewTrade" encType="application/x-www-form-urlencoded">
                    <div className="form-group">
                        <label htmlFor="ativo">Ativo</label>
                        <input type="input" className="form-control" id="txtativo" name="ativo" disabled />
                        <input type="hidden" id="txtid" name="id" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Data</label>
                        <input type="date" className="form-control" id="txtdate" name="date" placeholder="Data do evento" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantidade">Quantidade</label>
                        <input type="number" className="form-control" id="txtquantidade" name="quantidade" placeholder="Quantidade" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="valor">Valor Total da Operacao</label>
                        <input type="number" className="form-control" id="txtvalor" name="valor" placeholder="Total Investido" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tipo">Tipo de Operacao</label>
                        <select name="tipo" id="seltipo" className="custom-select">
                            <option value="c" selected >Compra</option>
                            <option value="v">Venda</option>
                            <option value="d">Dividendo</option>
                        </select>
                    </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" id="btntradesubmit" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        */}

        {/* Modal Para Edit Trade */}
        {/*
        <div className="modal fade" id="EditTradeModal" tabIndex="-1" role="dialog" aria-labelledby="Edit Trade" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Trade</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="user-form" action="/ativos/edittrade" method="POST" id="formEditTrade" encType="application/x-www-form-urlencoded">
                    <div className="form-group">
                        <label htmlFor="date">Data</label>
                        <input type="date" className="form-control" id="f3txtdate" name="date" placeholder="Data do evento" required />
                        <input type="hidden" id="f3txtid" name="id" />
                        <input type="hidden" id="f3txttradeid" name="tradeid" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="f3txtvalor">Valor Total da Operacao</label>
                        <input type="number" className="form-control" id="f3txtvalor" name="valor" placeholder="Total Investido" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="f3seltipo">Tipo de Operacao</label>
                        <select name="tipo" id="f3seltipo" className="custom-select">
                            <option value="c" selected >Compra</option>
                            <option value="v">Venda</option>
                            <option value="d">Dividendo</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="checkbox" id="f3remove" name="remove" />
                        <label htmlFor="f3remove">Remover trade</label>
                    </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" id="btnedittradesubmit" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        */}

        {/* Modal Para Opcoes */}
        {/*
        <div className="modal fade" id="OptionsModal" tabIndex="-1" role="dialog" aria-labelledby="Editar Ativo" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Ativo</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="user-form" action="/ativos/edit" method="POST" id="formEditAtivo" encType="application/x-www-form-urlencoded">
                    <div className="form-group">
                        <label htmlFor="ativo">Ativo</label>
                        <input type="input" className="form-control" id="f2txtativo" name="ativo" required />
                        <input type="hidden" id="f2txtid" name="id" />
                        <input type="hidden" id="f2txtguess" name="guess" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantidade">Saldo Atual</label>
                        <input type="number" className="form-control" id="f2txtsaldo" name="saldo" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="valor">Unit&aacute;rio</label>
                        <input type="number" className="form-control" id="f2txtunitario" name="unitario"  required />
                    </div>
                    <div className="form-group">
                        <label>Classifica&ccedil;&atilde;o</label><br />
                        (1) <input type="input" className="form-control" id="f2txtclass01" name="class_1" list="dl_class1" />
                        (2) <input type="input" className="form-control" id="f2txtclass02" name="class_2" list="dl_class2" />
                        (3) <input type="input" className="form-control" id="f2txtclass03" name="class_3" list="dl_class3" />
                    </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" id="btnopcoessubmit" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        */}

        <datalist id="dl_class1"></datalist>
        <datalist id="dl_class2"></datalist>
        <datalist id="dl_class3"></datalist>

        
      </div>
    );
  }
  
  buildDatasets(assets) {
    let dataChart = {
      labels: [], 
      datasets:[{ data: [], backgroundColor: [] }]
    };
    this.dataCharts.push(dataChart, {}, {}, {});
    this.dataCharts[1] = {labels: ["Undefined"], datasets:[{ data: [0], backgroundColor: [colors[0]] }]};
    this.dataCharts[2] = {labels: ["Undefined"], datasets:[{ data: [0], backgroundColor: [colors[0]] }]};
    this.dataCharts[3] = {labels: ["Undefined"], datasets:[{ data: [0], backgroundColor: [colors[0]] }]};

    assets.forEach((asset, i) => {
      //console.log("Asset", asset);
      this.dataCharts[0].labels.push(asset.codigo);
      this.dataCharts[0].datasets[0].data.push(Number(asset.patrimonio.toFixed(2)));
      this.dataCharts[0].datasets[0].backgroundColor.push(colors[i%10]);

      if(asset.class.c1 === undefined || asset.class.c1.length === 0) { // If there no classification
        this.dataCharts[1].datasets[0].data[0] += asset.patrimonio;
      } else { // For assets with a classification
        this.inserIntoDataset(asset.class.c1, 1, asset.patrimonio);
      }

      if(asset.class.c2 === undefined || asset.class.c2.length === 0) { 
        this.dataCharts[2].datasets[0].data[0] += asset.patrimonio;
      } else { 
        this.inserIntoDataset(asset.class.c2, 2, asset.patrimonio);
      }

      if(asset.class.c3 === undefined || asset.class.c3.length === 0) { 
        this.dataCharts[3].datasets[0].data[0] += asset.patrimonio;
      } else { 
        this.inserIntoDataset(asset.class.c3, 3, asset.patrimonio);
      }
    });
    console.log("DataSets Built",this.dataCharts);
  }

  inserIntoDataset(classification, index, value) {
    let position = this.dataCharts[index].labels.indexOf(classification);
    if(position===-1) { // Inserting the classification
      this.dataCharts[index].labels.push(classification);
      this.dataCharts[index].datasets[0].data.push(value);
      this.dataCharts[index].datasets[0].backgroundColor.push(colors[this.dataCharts[1].datasets[0].backgroundColor.length]);
      
    } else { //If the classification were there already
      this.dataCharts[index].datasets[0].data[position] += value;
    }
  }

  
}


const colors = ["#FF6666", "#FFB266", "#FFFF66", "#66FF66", "#66FFFF", "#66B2FF", "#6666FF", "#B266FF",
"#FF66FF", "#FF66B2", "#C0C0C0"];


export default AssetsMainPage;