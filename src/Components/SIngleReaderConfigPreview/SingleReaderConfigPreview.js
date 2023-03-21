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
import TagGroupSelector from "../TagGroupSelector/TagGroupSelector";


export default class SingleReaderConfigPreview extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            configOpen: false,
            ownAnchor: null,
        };

    }

    render() {

        let currentReaderID = this.props.implementation.assignedReaders[this.props.readerID]
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
                                this.props.implementation.assignedReaders[this.props.readerID] = e.target.value
                            }}
                            label={"Reader ID:"}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={(e)=>{
                            this.props.updateParent();
                            this.setState({configOpen: false})
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