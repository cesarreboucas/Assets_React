import React from 'react';
import ProjectionChart from './projectionChart';

export default class GoalsTable extends React.Component {
  constructor(props) {
    super(props);
    this.boxes = this.props.data.boxes;
    this.options = this.props.data.options;
    this.result = 0;
  }

  renderTable = () => {
    this.result = (this.props.insertAssets ? this.props.assetsTotal : 0);
    if (this.props.irrOnResult !== 0) {
      //Backing assets to Update on First Month
      this.result /= Math.pow(1 + (this.props.irrOnResult / 100), 1 / 12);
    }
    let rows = []
    let minDate = new Date();
    let maxDate = new Date();

    let headingTds = [<th key="thMonth">Month</th>];
    for (let i = 0; i < this.boxes.length; ++i) {
      headingTds.push(<th style={{ textAlign: "right" }} key={"th" + i}>{this.boxes[i].description}</th>);
      if (minDate > this.boxes[i].dateStart) { minDate = this.boxes[i].dateStart }
      if (maxDate < this.boxes[i].dateEnd) { maxDate = this.boxes[i].dateEnd }

      this.ds.labels.push(this.boxes[i].description);
      this.ds.data.push([]);
    }
    headingTds.push(<th style={{ textAlign: "right" }} key={"thResult"}>Result</th>);
    this.ds.labels.push("Result");
    this.ds.data.push([]);


    //Cloning the date
    let currentMonth = new Date(minDate.getTime());
    // Picking any day since the month is most important
    currentMonth.setDate(10);
    maxDate.setDate(10);
    rows.push(<tr key="trHeading">{headingTds}</tr>)

    while (this.evaluateDate(maxDate, currentMonth) >= 0) {
      if (this.props.irrOnResult !== 0) {
        this.result *= Math.pow(1 + (this.props.irrOnResult / 100), 1 / 12);
      }
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

  ds = {
    labels: [], /* Filled on RenderTable */
    data: [], /* Filled on RenderTR */
    x_labels : []
  };
  renderTr = (month) => {
    /**
     * This function was modified to fill the ds object filling the graph datasets
     */
    const MonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const trHeader = MonthNames[month.getMonth()] + " " + month.getFullYear();
    const tds = [<th key={trHeader}>{trHeader}</th>];
    this.ds.x_labels.push(trHeader);
    this.boxes.forEach((box, i) => {
      let value = box.value;
      //Current after Start and before end
      if (this.evaluateDate(month, box.dateStart) >= 0 && this.evaluateDate(month, box.dateEnd) <= 0) {
        let periodicity;
        switch (box.periodicity) {
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
          let rate;
          if (box.useIRR) {
            rate = this.props.myIrr;
          } else {
            rate = box.interestRate
          }
          value = value * Math.pow(1 + (rate / 100), this.getExponential(box.dateStart, month));
          this.result += value;
          tds.push(<td key={trHeader + i} style={{ textAlign: "right" }}>
            {value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </td>);

          this.ds.data[i].push(Math.floor(value * 100) / 100);

        } else { // No value for this current month
          tds.push(<td key={trHeader + i}></td>);
          this.ds.data[i].push(0);
        }
      } else { //out of interval
        tds.push(<td key={trHeader + i}></td>);
        this.ds.data[i].push(0);
      }
    });

    //Pushing the Result TD
    tds.push(<td key={trHeader + "result"} style={{ textAlign: "right" }}>
      {this.result.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>);
      this.ds.data[this.ds.data.length - 1].push(Math.floor(this.result * 100) / 100);
    return (
      <tr key={month.getFullYear() + "-" + month.getMonth()}>
        {tds}
      </tr>
    );
  }

  getExponential = (dateA, dateB) => {
    let e = dateB.getFullYear() - dateA.getFullYear();
    if (dateB.getMonth() < dateA.getMonth()) { // Not a complete year
      --e;
    }
    return (e);
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
    } else if (dateA.getMonth() < dateB.getMonth()) { //Same Year, Month B greater
      return -1;
    } else {
      return 0;
    }
  }

  render() {
    console.log(this.props)
    return (
      <React.Fragment>
        <ProjectionChart ds={this.ds} />
        <table className="table table-dark">
          <tbody>
            {this.renderTable()}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}