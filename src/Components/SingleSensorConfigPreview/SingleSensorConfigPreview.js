import "./SingleSensorConfigPreview.scss"
import {Tooltip, Typography} from "@mui/material";
import React from "react";
import TagGroupSelector from "../TagGroupSelector/TagGroupSelector";


export default class SingleSensorConfigPreview extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            configOpen: false,
            ownAnchor: null,
        };
        this.ownRef = React.createRef();

    }

    render() {
        let tagHolder = <div className={"tagIconHolder tagIconHolder--dummy"}>

        </div>
        let t = undefined;
        if(this.props.tag){
            t = this.props.tag;
            tagHolder = <div className={"tagIconHolder"}><Tooltip title={t.name} placement={"left"}>
                {t.getIcon()}
            </Tooltip></div>
        }
        return (
            <div className={"SingleSensorConfigPreview"} onClick={(e)=>{
                this.setState({ownAnchor : e.currentTarget, configOpen: true})
            }} ref={this.ownRef}>
                <Typography>{this.props.sensor}</Typography>
                {tagHolder}
                {this.props.allowTagConfig && <TagGroupSelector
                    open={this.state.configOpen}
                    anchorEl={this.state.ownAnchor}
                    onClose={(e)=>{
                        e.stopPropagation()
                        this.setState({configOpen: false, ownAnchor : null})
                    }}
                    value={t}
                    onChange={(e)=>{
                        this.props.onChange(e)
                    }}
                />}
            </div>
        );
    }
}