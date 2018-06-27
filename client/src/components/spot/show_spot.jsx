import React from "react";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class ShowSpot extends React.Component {

    componentDidMount() {
        this.props.fetchSpot(this.props.match.params.id)
    }

    constructor(props) {
        super(props);

    }


    render() {

        return (
            
            <div>
                Show Spot Page Here
            </div>

        )
    }

}

export default ShowSpot;