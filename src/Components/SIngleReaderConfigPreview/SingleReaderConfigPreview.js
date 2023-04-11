import "./SingleReaderConfigPreview.scss"
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import React from "react";
import { useDrop } from 'react-dnd'
import {DataLayer} from "../../DataLayer/DataLayer";
import TagGroupSelector from "../TagGroupSelector/TagGroupSelector";
import {TagIcon} from "../TagIcon/TagIcon";


export default class SingleReaderConfigPreview extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            configOpen: false,
            ownAnchor: null,
            tag: this.getOwnTag()
        };
        this.listenerFunction = ()=>{
            let connTag = this.getOwnTag()
            if(connTag !== this.state.tag){
                this.setState({tag: connTag});
            }
        }



    }
    getOwnTag(){
        if(DataLayer.curSensorStates){
            let currentReaderID = this.props.implementation.assignedReaders[this.props.readerID]
            if(DataLayer.curSensorStates[currentReaderID]){
                let tagGroupID = DataLayer.curSensorStates[currentReaderID]
                let connectedTag = DataLayer.tagGroups.reduce((prev, cur)=>{
                    if(prev){
                        return prev
                    }
                    if(cur.id === tagGroupID){
                        return cur;
                    }
                    if(cur.tags && cur.tags.includes( tagGroupID)){
                        return cur;
                    }
                    return undefined;
                }, undefined)

                console.log("connected tag group ID:", tagGroupID,  "connected Tag object:", connectedTag);
                return connectedTag;

            }
        }
    }
    listenerFunction;
    componentDidMount() {
        DataLayer.listenersForAnyTagChanges.push(this.listenerFunction)
    }
    componentWillUnmount() {
        DataLayer.listenersForAnyTagChanges = DataLayer.listenersForAnyTagChanges.filter((l)=>{
            return l !== this.listenerFunction
        })
    }

    render() {

        let currentReaderID = this.props.implementation.assignedReaders[this.props.readerID]
        let tagHolder = <div className={"tagIconHolder tagIconHolder--dummy"}>

        </div>
        let t = undefined;
        if(this.state.tag){
            t = this.state.tag;
            tagHolder = <div className={"tagIconHolder"}><Tooltip title={t.name} placement={"left"}>
                {t.getIcon({size: this.props.size || 1})}
            </Tooltip></div>
        }
        else{
            tagHolder = <div className={"tagIconHolder"}><Tooltip title={"NO TAG"} placement={"left"}>
                {<TagIcon size={this.props.size || 1} iconName={"mdiCancel"} color={"rgba(0,0,0,0.36)"} />}
            </Tooltip></div>
        }
        return (
            <Grid xs={2} item className={"SingleSensorConfigPreview SingleReaderConfigPreview"} onClick={(e)=>{
                this.setState({ownAnchor : e.currentTarget, configOpen: true})
            }}>
                <Typography className={"SensorLabel"}>{this.props.sensor}</Typography>
                <Typography className={"ReaderLabel"}>{currentReaderID || "NO READER"}</Typography>
                {tagHolder}
                <Dialog open={this.state.configOpen} onClose={(e)=>{
                    this.props.updateParent();
                    this.setState({configOpen: false})
                    if(e.stopPropagation){
                        e.stopPropagation()
                    }
                }}>
                    <DialogTitle>
                        Set Reader for {this.props.sensor}:
                    </DialogTitle>
                    <DialogContent>

                        <TextField
                            value={currentReaderID}
                            onChange={(e)=>{
                                this.props.implementation.assignedReaders[this.props.readerID] = e.target.value;
                                this.forceUpdate();
                            }}
                            label={"Reader ID:"}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={(e)=>{
                            this.props.updateParent();
                            this.setState({configOpen: false})
                            this.props.implementation.save();
                            if(e.stopPropagation){
                                e.stopPropagation()
                            }
                        }}> Save</Button>
                    </DialogActions>

                </Dialog>
            </Grid>
        );
    }
}