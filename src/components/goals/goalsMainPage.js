import React from 'react';
import { Redirect } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import * as goalsApi from '../../api/goals.js';

class GoalsMainPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectToCreate: false,
      message: ( // If there is a message and is not older than 7 seconds
        (this.props.location.state &&
          ((new Date()).getTime() - this.props.location.state.date.getTime()) < 7000) ?
          this.props.location.state.message :
          false
      ),
      goalId: null,
      goals: []
    }
  }

  redirectToCreate = () => {
    if (this.state.redirectToCreate) {
      if(this.state.goalId===null) {
        return (<Redirect push to={'/goals/create'} />);
      } else {
        return (<Redirect push to={'/goals/'+this.state.goalId} />);
      } 
    }
  }

  renderGoalsRows = () => {
    let trs = [];
    trs.push(
      <tr key="trHeading">
        <th>Name</th>
        <th>Fields</th>
        <th>Options</th>
      </tr>);
    this.state.goals.forEach((goal, i) => {
      let fields = "";
      goal.boxes.forEach(box => {
        fields += box.description + ", ";
      });
      const options = <button className="btn btn-sm btn-light" onClick={() => this.setState({ redirectToCreate: true, goalId: goal._id })}>View</button>;
      if (fields.length > 27) {
        fields = fields.substr(0, 25) + "...";
      } else {
        fields = fields.substr(0, fields.length - 2) + "...";
      }
      trs.push(
        <tr key={'tr' + i}>
          <td>{goal.name}</td>
          <td>{fields}</td>
          <td>{options}</td>
        </tr>);
    });
    return trs;
  }

  async componentDidMount() {
    const goals = await goalsApi.getGoals();
    this.setState({ goals: goals });
    console.log(goals);
  }

  render() {
    console.log(this.props.location.state);
    return (
      <div className="container">
        {this.state.message ?
          <Alert variant="success" onClose={() => this.setState({ message: false })} dismissible>
            {this.props.location.state.message}
          </Alert > : ''
        }
        {this.redirectToCreate()}
        <h1>Goals Page</h1>
        <table className="table table-dark">
          <tbody>
            {this.renderGoalsRows()}
          </tbody>
        </table>
        <div className="form-group text-right" style={{ padding: "15px" }}>
          <button className="btn btn-sm btn-light" onClick={() => { this.setState({ redirectToCreate: true }) }}>New Goal</button>
        </div>
      </div>
    );
  }
}

export default GoalsMainPage;
