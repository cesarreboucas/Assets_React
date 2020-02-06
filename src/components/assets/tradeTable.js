    import React from 'react';

class TradeTable extends React.Component {
    
    render() {
        let tipo;        
        return (
            <table cellPadding="4" cellSpacing="0" style={{width:"100%"}}>
                <thead><tr key={-1}>
                    <th>Movement</th>
                    <th>Date</th>
                    <th style={{textAlign:"right"}}>Value</th>
                    <th style={{textAlign:"center"}}>Actions</th>
                </tr></thead>
                <tbody>
                {
                    this.props.movements.map((e,i) => {
                        let disabled = false;
                        switch(e.kind) {
                            case "buy": 
                                tipo = "Buy";
                                break;
                            case "sell":
                                tipo = "Sell"
                                break;
                            case "holdings":
                                tipo = "Holdings"
                                disabled = true;
                                break;
                            case "dividend":
                                tipo = "Dividend"
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
                                <td>{formatDate(date)}</td>
                                <td style={{textAlign: "right"}}>{'$ ' + Number(e.value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                <td style={{textAlign:"center"}}>
                                    <button disabled={disabled?true:false}
                                        className="btn btn-sm btn-light"
                                        onClick={
                                            () => this.props.toggleModalTrade({
                                                ...e,
                                                asset_id: this.props.asset.id,
                                                asset_name: this.props.asset.name
                                                })}>Edit Trade</button></td>
                            </tr>
                        )      
                    })
                }
                </tbody>
            </table>);
    }
}

function formatDate(date) {
    var monthNames = [ "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct","Nov", "Dec"];
  
    var day = date.getDate();
    var monthNum = (date.getMonth()+1);
    var year = date.getFullYear();
  
    return ('0'+day).slice(-2) + '-' + monthNames[monthNum] + '-' + year;
}

export default TradeTable;