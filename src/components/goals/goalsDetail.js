import React from 'react';
import GoalItemForm from './goalItemForm';

export default class GoalsDetail extends React.Component {

  state = {
    nOfBoxes: 1,
    showTable: false,
    dataLoaded: 0
  }

  data = {
    options: {},
    boxes: []
  };

  renderBoxes = () => {
    let boxes = [];
    for (let i = 0; i < this.state.nOfBoxes; ++i) {
      boxes.push(<GoalItemForm n={i} key={this.state.dataLoaded + "_" + i} saveData={this.saveDataFromBoxes} data={this.data.boxes[i]} />)
    }
    return boxes;
  }

  saveDataFromBoxes = (data, i) => {
    this.data.boxes[i] = data;
  }

  componentDidMount() {
    this.data = {
      options: {},
      boxes: [
        {
          description: 'Salary',
          periodicity: "monthly",
          value: 950,
          dateStart: "2017-12-10T00:22:15.357Z",
          dateEnd: "2024-12-10T00:22:16.357Z",
          interestRate: 2,
          useIRR: false
        },
        {
          description: 'Rent',
          periodicity: "monthly",
          value: -1500,
          dateStart: "2018-09-10T00:22:17.357Z",
          dateEnd: "2025-12-10T00:22:18.357Z",
          interestRate: 1,
          useIRR: false
        },
        {
          description: 'Gov Help',
          periodicity: "quaterly",
          value: 200,
          dateStart: "2020-09-10T00:22:00.357Z",
          dateEnd: "2025-12-10T00:22:00.357Z",
          interestRate: 1,
          useIRR: false
        }
      ]
    };
    //Converting toIsoStrings to Date Obj
    for(let i=0; i < this.data.boxes.length; ++i) {
      const box = this.data.boxes[i];
      box.dateStart = new Date(this.data.boxes[i].dateStart);
      box.dateEnd = new Date(this.data.boxes[i].dateEnd);
    }
    //CHANGE SHOWTABLE
    this.setState({ dataLoaded: 1, nOfBoxes: this.data.boxes.length, showTable: true });
  }

  render() {
    return (
      <div>
        <h1>Create</h1>
        {
          this.renderBoxes()
        }
        <div className="form-group text-right" style={{ padding: "15px", backgroundColor: "#ffffff", margin: "0px" }}>
          <button type="button" className="btn btn-primary"
            onClick={() => { this.setState({ nOfBoxes: (this.state.nOfBoxes + 1) }) }}
          >Add Collumn</button>
        </div>
        <div className="form-group text-right" style={{ padding: "15px", backgroundColor: "#ffffff" }}>
          <button type="button" className="btn btn-primary" style={{ margin: "4px"}}
            onClick={() => this.setState({ showTable: !this.state.showTable })}>{this.state.showTable ? 'Hide Table' : 'Show Table'}</button>
          {
            (this.state.showTable?
              <button type="button" className="btn btn-primary" style={{ margin: "4px"}}
                onClick={() => this.setState({ dataLoaded: this.state.dataLoaded+1 })}>Update</button>:'')
          }            
          <button type="button" className="btn btn-primary" style={{ margin: "4px"}}>Save</button>
        </div>
        {this.state.showTable &&
          <div className="form-row">
            {
              <GoalsTable data={this.data} />
            }
          </div>
        }
      </div>

    );
  }
}

class GoalsTable extends React.Component {

  constructor(props) {
    super(props);
    this.boxes = this.props.data.boxes;
    this.options = this.props.data.options;
    this.result = 0;
  }

  renderTable = () => {
    this.result = 0;
    let rows = []
    let minDate = new Date();
    let maxDate = new Date();

    let headingTds = [<th key="thMonth">Month</th>];
    for (let i = 0; i < this.boxes.length; ++i) {
      headingTds.push(<th style={{textAlign:"right"}} key={"th"+i}>{this.boxes[i].description}</th>);
      if (minDate > this.boxes[i].dateStart) { minDate = this.boxes[i].dateStart }
      if (maxDate < this.boxes[i].dateEnd) { maxDate = this.boxes[i].dateEnd }
    }
    headingTds.push(<th style={{textAlign:"right"}} key={"thResult"}>Result</th>);

    //Cloning the date
    let currentMonth = new Date(minDate.getTime());
    // Picking any day since the month is most important
    currentMonth.setDate(10);
    maxDate.setDate(10);
    rows.push(<tr key="trHeading">{headingTds}</tr>)

    while (this.evaluateDate(maxDate, currentMonth) >= 0) {
      rows.push(this.renderTr(currentMonth));
      //Updating current month
      if (currentMonth.getMonth() === 11) {
        currentMonth.setMonth(0);
        currentMonth.setFullYear(currentMonth.getFullYear() + 1);
      } else {
        currentMonth.setMonth(currentMonth.getMonth() + 1);
      }
    }
    return rows;
  }

  renderTr = (month) => {
    const MonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const trHeader = MonthNames[month.getMonth()] + " " + month.getFullYear();
    const tds = [<th key={trHeader}>{trHeader}</th>];

    this.boxes.forEach((box, i) => {
      let value = box.value;
      //Current after Start and before end
      if (this.evaluateDate(month, box.dateStart)>=0 && this.evaluateDate(month, box.dateEnd)<=0) {
        let periodicity;
        switch(box.periodicity) {
          case "monthly":
            periodicity = 1;
            break;
          case "bimonthly":
            periodicity = 2;
            break;
          case "quaterly":
            periodicity = 3;
            break;
          case "fourmonth":
            periodicity = 4;
            break;
          case "biyearly":
            periodicity = 6;
            break;
          case "yearly":
            periodicity = 12;
            break;
          default:
            periodicity = 1;
            break;
        }
        if (box.dateStart.getMonth() % periodicity === month.getMonth() % periodicity) {
          value = value * Math.pow(1 + (box.interestRate / 100), this.getExponential(box.dateStart, month));
          this.result += value;
          tds.push(<td key={trHeader + i} style={{textAlign:"right"}}>
              {value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
            </td>);
        } else { // No value for this current month
          tds.push(<td key={trHeader + i}></td>); 
        }
      } else { //out of interval
        tds.push(<td key={trHeader + i}></td>); 
      }
    });

    tds.push(<td key={trHeader + "result"} style={{textAlign:"right"}}>
      {this.result.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>);
    return (
      <tr key={month.getFullYear() + "-" + month.getMonth()}>
        {tds}
      </tr>
    );
  }

  getExponential = (dateA, dateB) => {
    let e = dateB.getFullYear() - dateA.getFullYear();
    if(dateB.getMonth() < dateA.getMonth()) { // Not a complete year
      --e;
    }
    return(e);
  }

  /**
   *  1 A Bigger, 
   *  0 Equal, 
   * -1 B Bigger, 
   */
  evaluateDate = (dateA, dateB) => {
    if (dateA.getFullYear() > dateB.getFullYear()) { //Year A greater
      return 1;
    } else if (dateA.getFullYear() < dateB.getFullYear()) { //Year B greater
      return -1;
    } else if (dateA.getMonth() > dateB.getMonth()) { //Same Year, Month A greater
      return 1;
    } else if(dateA.getMonth() < dateB.getMonth()) { //Same Year, Month B greater
      return -1;
    } else {
      return 0;
    }
  }

  render() {
    return (
      <table className="table table-dark" style={{width:"90%",margin:"auto"}}>
        <tbody>
          {this.renderTable()}
        </tbody>
      </table>
    );
  }
}