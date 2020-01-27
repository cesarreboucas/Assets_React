import React, { Component } from 'react';
import { withRouter } from "react-router";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";

class AssetDetail extends Component {
    
    componentDidMount() {
        //const { match: { params } } = this.props;
        //const { assetId } = this.props.match.params
        console.log(this.props);
        //const id = this.props.match.params.id;
        //this.fetchData(id);
    }

    //a = useParams();
    render() {
        let assetId = this.props;
        //console.log(useParams());

        return(
            <div>A</div>
        );
    }
}

export default AssetDetail;