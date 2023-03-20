import "./SingleSensorConfigPreview.scss"
import {Tooltip, Typography} from "@mui/material";
import React from "react";
import { useDrop } from 'react-dnd'
import TagGroupSelector from "../TagGroupSelector/TagGroupSelector";


export default class SingleSensorConfigPreview extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            configOpen: false,
            ownAnchor: null,
        };

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
            <DropWrapper className={"SingleSensorConfigPreview"} onClick={(e)=>{
                this.setState({ownAnchor : e.currentTarget, configOpen: true})
            }}
                onDrop={(newTagGroup)=>{
                    this.props.onChange({
                        newValue: newTagGroup
                    })
                }}
            >
                <Typography>{this.props.sensor}</Typography>
                {tagHolder}
                {this.props.allowTagConfig && <TagGroupSelector
                    open={this.state.configOpen}
                    anchorEl={this.state.ownAnchor}
                    onClose={(e)=>{
                        if(e){
                            e.stopPropagation()
                        }
                        this.setState({configOpen: false, ownAnchor : null})
                    }}
                    value={t}
                    sensorName={this.props.sensor}
                    onChange={(e)=>{
                        this.props.onChange(e)
                    }}
                />}
            </DropWrapper>
        );
    }
}

const DropWrapper = (props) => {
    const [, drop] = useDrop(() => ({
        accept: "TagType",
        drop: (item, monitor) => {
            props.onDrop(item);
            return { name: "Dustbin" };
        }
    }))
    return <div ref={drop} className={props.className} onClick={props.onClick}>
        {props.children}
    </div>
}