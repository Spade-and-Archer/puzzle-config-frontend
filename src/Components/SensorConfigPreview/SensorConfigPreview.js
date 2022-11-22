import React from "react";
import "./SensorConfigPreview.scss";

export default class SensorConfigPreview extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }

    render() {
        return (
            <div className="SensorConfigPreview">
                {this.props.sensor.name}
                {this.props.sensor.getIcon()}
            </div>
        );
    }

}

