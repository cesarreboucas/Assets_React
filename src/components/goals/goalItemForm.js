import React from 'react';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class GoalItemForm extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.data.boxes[this.props.n] === undefined) {
      this.state = {
        description: '',
        periodicity: "once",
        value: 0,
        dateStart: new Date(),
        dateEnd: new Date(),
        interestRate: 0,
        useIRR: false
      }
    } else {
       this.state = this.props.data.boxes[this.props.n];
       
    }
  }

  handleInputChange = evt => {
    const target = evt.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleFormNumber = (field,value) => {
    this.setState({[field]: value});
  }

  handleSelectPeriodicity = (e) => {
    if(e.target.value==="once") {
      this.setState({dateEnd: this.state.dateStart, periodicity:e.target.value});
    } else {
      this.setState({periodicity:e.target.value});
    }
  }

  updateDates = (box, date) => {
    if (box === 0) { //Start
      if(date > this.state.dateEnd) { //It cant start after end
        this.setState({dateStart: date, dateEnd:date});
      } else {
        this.setState({dateStart: date});
      }
    } else { //End
      if(date < this.state.dateStart) { //End before start
        this.setState({dateEnd: this.state.dateStart});
      } else {
        this.setState({dateEnd: date});
      }
    }
  }

  componentDidUpdate() {
    this.props.data.boxes[this.props.n] = this.state;
  }

  render() {
    return (
      <div style={{ backgroundColor: "white", padding: "10px 30px" }}>
        <div className="form-row" >
          <div className="form-group col-md-11">
          <h4> {this.state.description === '' ? 'Collumn ' + (this.props.n + 1) : this.state.description}</h4>
          </div>
          <div className="form-group col-md-1 text-right">
            <FontAwesomeIcon icon={faTrash} onClick={() => {this.props.deleteInput(this.props.n)}} />
          </div>
        </div>
        <div className="form-row" >
          <div className="form-group col-md-4">
            <label>Name</label>
            <input type="text" className="form-control" name="description"
              defaultValue={this.state.description}
              onBlur={this.handleInputChange} />
          </div>
          <div className="form-group col-md-4">
            <label>Periodicity</label>
            <select className="form-control" name="periodicity"
              defaultValue={this.state.periodicity}
              onChange={this.handleSelectPeriodicity}>
              <option value="once">Once</option>
              <option value="monthly">Monthly</option>
              <option value="bimonthly">Every Two Months</option>
              <option value="quaterly">Every Three Months</option>
              <option value="fourmonth">Every Four Months</option>
              <option value="biyearly">Bi-Yearly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div className="form-group col-md-4">
            <label>Value</label>
            <input type="number" style={{ textAlign: 'right' }} className="form-control" name="value"
              defaultValue={this.state.value}
              onBlur={(e) => {this.handleFormNumber("value", parseFloat(e.target.value))}} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label>Yearly Interest Rate (%)</label>
            <input type="number" step="0.01" style={{ textAlign: 'right' }} className="form-control" name="interestRate"
              disabled={this.state.useIRR}
              defaultValue={this.state.interestRate}
              onBlur={(e) => {this.handleFormNumber("interestRate", parseFloat(e.target.value))}} />
          </div>
          <div className="form-group col-md-4">
            <label>Start Date</label>&nbsp;
						<DatePicker className="form-control"
              selected={this.state.dateStart}
              showMonthYearPicker
              onChange={(date) => { this.updateDates(0, date) }}
              dateFormat="MMMM yyyy" />
          </div>
          <div className="form-group col-md-4">
            <label>End Date</label>&nbsp;
						<DatePicker className="form-control"
              selected={this.state.dateEnd}
              showMonthYearPicker
              disabled={this.state.periodicity === "once" ? true : false}
              minDate={this.state.dateStart}
              onChange={(date) => { this.updateDates(1, date) }}
              dateFormat="MMMM yyyy" />
          </div>
        </div>
        <div className="form-group">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" name="useIRR"
              onChange={this.handleInputChange} defaultChecked={this.state.useIRR} />
            <label className="form-check-label">
              Use my computed return <small>(the Yearly return from Assets)</small>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default GoalItemForm;