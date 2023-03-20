import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";
import React from "react";
import {GenerateUID} from "gardenspadejs/dist/general";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./TagGroupEditor.scss";
import {EventHandler} from "verdiapi/dist/HelperFunctions/EventHandler";
import {DataLayer} from "../../DataLayer/DataLayer";
import {TagGroup} from "../../DataLayer/TagGroup";
import {PickTagGroupIcon} from "../PickTagGroupIcon/PickTagGroupIcon";

export default class TagGroupEditor extends React.Component {
    constructor(props) {
        super(props);
        this.uid = GenerateUID("TagGroupEditor");
        this.state = {
            iconEditorOpen: false
        }
    }

    render() {
        let className = "TagGroupEditor"
        return (
            <Dialog onClose={() => {
                this.props.onClose();
            }} open={this.props.open} className={className} id={this.uid}>
                <DialogTitle>Edit Tag Type:</DialogTitle>
                <PickTagGroupIcon
                    open={this.state.iconEditorOpen}
                    onClose={async (e, save) => {
                        this.setState({
                            iconEditorOpen: false
                        })
                        if (save) {
                            console.log(`arguments:`, e);
                            this.props.tagGroup.iconName = e.iconName
                            this.props.tagGroup.color = e.iconColor

                        }
                    }}
                    defaultIcon={this.props.tagGroup.iconName}
                    defaultColor={this.props.tagGroup.color}
                    onChange={(e) => {
                        console.log(e);
                    }}
                />


                <DialogActions>
                    <Button onClick={()=>{
                        if(this.props.tagGroup._lastJSON){
                            this.props.tagGroup.loadFromJSON(this.props.tagGroup._lastJSON);
                        }
                        this.props.onClose();
                    }}>Cancel</Button>
                    <Button onClick={()=>{
                        this.props.tagGroup.save().then(()=>{
                            this.props.onClose();
                        })
                    }}>Save</Button>
                </DialogActions>
            </Dialog>
        );
    }
}
