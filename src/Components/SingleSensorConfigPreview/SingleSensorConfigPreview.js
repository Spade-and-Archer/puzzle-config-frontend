import "./SingleSensorConfigPreview.scss"
import {Tooltip, Typography} from "@mui/material";
import React from "react";


export default class SingleSensorConfigPreview extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        let tagHolder = <div className={"tagIconHolder tagIconHolder--dummy"}>

        </div>
        if(this.props.tag){
            let t = this.props.tag;
            tagHolder = <div className={"tagIconHolder"}><Tooltip title={t.name} placement={"left"}>
                {t.getIcon()}
            </Tooltip></div>
        }
        return (
            <div className={"SingleSensorConfigPreview"}>
                <Typography>{this.props.sensor}</Typography>
                {tagHolder}
            </div>
        );
    }
}