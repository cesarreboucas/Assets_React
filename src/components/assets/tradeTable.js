    import React, {Component} from 'react';

class TradeTable extends Component {
    
    render() {
        let tipo;
        return (
            <table cellPadding="4" cellSpacing="0" style={{width:"100%"}}>
                <thead><tr key={-1}>
                    <th>Moviment</th>
                    <th>Date</th>
                    <th>Value</th>
                    <th>Actions</th>
                </tr></thead>
                <tbody>
                {
                    this.props.trades.map((e,i) => {
                        let disabled = false;
                        switch(e.tipo) {
                            case "c": 
                                tipo = "Compra";
                                break;
                            case "v":
                                tipo = "Venda"
                                break;
                            case "p":
                                tipo = "Patrimonio"
                                disabled = true;
                                break;
                            case "d":
                                tipo = "Dividendo"
                                break;
                            default:
                                tipo = ""
                                break;
                        }
                        let tempdata = e.date.split('T');
                        let dateArray = tempdata[0].split('-');
                        let date = new Date(dateArray[0],(dateArray[1]-1),dateArray[2],0,0,0,0);
                        return (
                            
                            <tr key={i}>
                                <td>{tipo}</td>
                                <td className="text-right">{formatDate(date)}</td>
                                <td className="text-right">{Number(e.value).toFixed(2)}</td>
                                <td className="text-right">
                                    <button disabled={disabled?true:false}
                                        className="btn btn-sm btn-light">Edit Trade</button></td>
                            </tr>
                        )      
                    })
                }
                </tbody>
            </table>);
    }
}

function formatDate(date) {
    var monthNames = [ "", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
      "Jul", "Ago", "Set", "Out","Nov", "Dez"];
  
    var day = date.getDate();
    var monthNum = (date.getMonth()+1);
    var year = date.getFullYear();
  
    return ('0'+day).slice(-2) + '-' + monthNames[monthNum] + '-' + year;
}

export default TradeTable;