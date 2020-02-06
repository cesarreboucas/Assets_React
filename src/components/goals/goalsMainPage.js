import React from 'react';
import {Redirect} from 'react-router-dom';


class GoalsMainPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            redirectToCreate:false
        }
    }

    redirectToCreate = () => {
        if(this.state.redirectToCreate)
            return(<Redirect push to={'/goals/create'} />);
    }

    render() {
        return(<div>
            { this.redirectToCreate() }
            <h1>Goals Page</h1>
            <button className="btn btn-sm btn-light" onClick={() => { this.setState({redirectToCreate:true}) }}>Novo</button>
        </div>);
    }
}

export default GoalsMainPage;