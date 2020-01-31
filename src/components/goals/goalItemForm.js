import React from 'react';
import DatePicker from 'react-datepicker';

class GoalItemForm extends React.Component {
	render() {
		return(
			<form style={{backgroundColor:"white",padding:"50px"}}>
				<div className="form-row">
					<div className="form-group col-md-6">
						<label htmlFor="inputName">Name</label>
						<input type="text" className="form-control" id="inputName" placeholder="" />
					</div>
					<div className="form-group col-md-6">
						<label htmlFor="selectPeriodicity">Password</label>
						<select className="form-control" id="selectPeriodicity" >
							<option value="0">Once</option>
							<option value="1">Montly</option>
							<option value="2">Quaterly</option>
							<option value="3">Bi-Yearly</option>
							<option value="4">Yearly</option>
						</select>
					</div>
				</div>
				<div className="form-row">
					<div className="form-group col-md-6">
						<label>Start Date</label>&nbsp;
						<DatePicker className="form-control" 
								selected={new Date()} 
								onChange={(date) => { console.log(date) }} 
								dateFormat="MMMM d, yyyy" />
					</div>
					<div className="form-group col-md-6">
						<label>End Date</label>&nbsp;
						<DatePicker className="form-control" 
								selected={new Date()} 
								onChange={(date) => { console.log(date) }} 
								dateFormat="MMMM d, yyyy" />
					</div>
				</div>
				
				<div className="form-row">
					<div className="form-group col-md-6">
						<label htmlFor="inputCity">City</label>
						<input type="text" className="form-control" id="inputCity" />
					</div>
					<div className="form-group col-md-4">
						<label htmlFor="inputState">State</label>
						<select id="inputState" className="form-control">
							<option >Choose...</option>
							<option>...</option>
						</select>
					</div>
					<div className="form-group col-md-2">
						<label htmlFor="inputZip">Zip</label>
						<input type="text" className="form-control" id="inputZip" />
					</div>
				</div>
				<div className="form-group">
					<div className="form-check">
						<input className="form-check-input" type="checkbox" id="gridCheck" />
						<label className="form-check-label" htmlFor="gridCheck">
							Check me out
						</label>
					</div>
				</div>
				<button type="submit" className="btn btn-primary">Sign in</button>
			</form>
		);
	}
}

export default GoalItemForm;