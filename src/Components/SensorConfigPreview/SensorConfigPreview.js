import {Tooltip, Typography} from "@mui/material";
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

        let listOfTagComponents = [];
        if(this.props.tags){
            this.props.tags.forEach((t)=>{
                let leftOrRight = "right";
                if(listOfTagComponents.length %2 == 0){
                    leftOrRight = "left";
                }
                listOfTagComponents.push(<div className={"singleTagOption"}>
                    <Tooltip title={t.name} placement={leftOrRight}>
                        {t.getIcon()}
                    </Tooltip>
                </div>)
            })
        }
        while(listOfTagComponents.length < 1 ){
            listOfTagComponents.push(<div className={"singleTagOption singleTagOption--dummy"}>
            </div>)
        }
        if(listOfTagComponents.length % 2 === 1){
            listOfTagComponents.push(<div className={"singleTagOption singleTagOption--dummy"}>
            </div>)
        }


        return (
            <div className="SensorConfigPreview">
                <Typography className="SensorConfigTitle" variant={"h6"}>{this.props.sensor.name}</Typography>
                <div className="TagOptions">
                    {listOfTagComponents}

                </div>


            </div>
        );
    }

}

