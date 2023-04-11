
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    List,
    DialogTitle, IconButton, ListItem,
    ListItemText,
    ListSubheader,
    TextField
} from "@mui/material";
import React from "react";
import {GenerateUID} from "gardenspadejs/dist/general";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./TagGroupEditor.scss";
import {DataLayer} from "../../DataLayer/DataLayer";
import {TagGroup} from "../../DataLayer/TagGroup";
import {PickTagGroupIcon} from "../PickTagGroupIcon/PickTagGroupIcon";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

import { withSnackbar } from "notistack";
class TagGroupEditor extends React.Component {
    constructor(props) {
        super(props);
        this.uid = GenerateUID("TagGroupEditor");
        this.state = {
            iconEditorOpen: false
        }
    }
    async close(save=false){
        if(this.props.tagGroup){
            if(save){
                console.log("Saving tag group");
                await this.props.tagGroup.save()
            }
            else if(this.props.tagGroup._lastJSON){
                this.props.tagGroup.loadFromJSON(this.props.tagGroup._lastJSON);

            }
        }
        this.props.onClose();
    }

    render() {
        let className = "TagGroupEditor"
        let tagGroup = this.props.tagGroup;
        return (
            <Dialog onClose={() => {
                this.close();
            }} open={this.props.open} className={className} id={this.uid} maxWidth={"md"}>
                <DialogTitle>Edit Tag Type:</DialogTitle>
                <PickTagGroupIcon
                    open={this.state.iconEditorOpen}
                    onClose={async (e, save) => {
                        this.setState({
                            iconEditorOpen: false
                        })
                        if (save) {
                            console.log(`arguments:`, e);
                            tagGroup.iconName = e.iconName
                            tagGroup.color = e.iconColor

                        }
                    }}
                    defaultIcon={tagGroup.iconName}
                    defaultColor={tagGroup.color}
                    onChange={(e) => {
                        console.log(e);
                    }}
                />
                <DialogContent className={"TagGroupEditorDialogContent"}>
                    <div className={"TagGroupBasicEditsWrapper"}>
                        <TextField
                            value={tagGroup.name}
                            onChange={(e)=>{
                                tagGroup.name = e.target.value;
                                this.setState({});
                            }}
                        />

                        <Button startIcon={tagGroup.getIcon()} onClick={()=>{
                            this.setState({
                                iconEditorOpen: true
                            })
                        }}>Edit Icon</Button>
                    </div>

                    <List
                        className={"TagGroupConnectedTagsList"}
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        subheader={<ListSubheader>Connected Tags:</ListSubheader>}
                    >
                        {tagGroup.tags.map((tag)=>{
                            return <ListItem key={tag}>
                                <ListItemText primary={tag} />
                                <IconButton
                                    edge="end"
                                    onClick={()=>{
                                        tagGroup.tags = tagGroup.tags.filter((v)=>{
                                            return v !== tag
                                        })
                                        this.setState({});
                                    }
                                    }
                                >
                                    <ClearIcon/>
                                </IconButton>
                            </ListItem>
                        })}
                        <ListItem>
                            <TextField
                                value={this.state.newTagValue}
                                onChange={(e)=>{
                                    this.setState({
                                        newTagValue : e.target.value
                                    })
                                }}
                                label={"new tag:"}
                                variant="standard"
                            />
                            <IconButton
                                edge="end"
                                //if it is an empty string or undefined
                                disabled={!Boolean(this.state.newTagValue)}
                                onClick={()=>{
                                    if(this.state.newTagValue && !tagGroup.tags.includes(this.state.newTagValue)){
                                        tagGroup.tags.push(this.state.newTagValue)
                                    }
                                    this.setState({
                                        newTagValue: ""
                                    });
                                }
                                }
                            >
                                <AddIcon/>
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <Button
                                onClick={async (e)=>{
                                    try{
                                        let response = await (await fetch("http://localhost:4010/api/lastTap", {
                                            method: "GET",
                                            headers: {
                                                'Content-Type': 'application/json'
                                                // 'Content-Type': 'application/x-www-form-urlencoded',
                                            },
                                            redirect: 'follow', // manual, *follow, error
                                            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                                        })).json();
                                        //if it was a recent tap
                                        if((new Date(response.time)).valueOf() > Date.now() - 1000 * 60 * 10 && response.tag && !tagGroup.tags.includes(response.tag)){
                                            this.props.enqueueSnackbar("Added recent tag", {
                                                variant: "success",
                                            });
                                            console.log("real tap")
                                            tagGroup.tags.push(response.tag)
                                            this.setState({
                                                newTagValue: ""
                                            });
                                        }
                                        else if((new Date(response.time)).valueOf() > Date.now() - 1000 * 60 * 10 && response.tag){
                                            this.props.enqueueSnackbar("Tag already added", {
                                                variant: "error",
                                            });
                                        }
                                        else{
                                            this.props.enqueueSnackbar("Tag not detected. Try tapping again", {
                                                variant: "error",
                                            });
                                        }

                                    }catch(e){
                                        console.warn("error getting last tap:")
                                        console.warn(e);
                                    }


                                }}
                            >
                                Add Recent Tag
                            </Button>
                        </ListItem>
                    </List>

                </DialogContent>


                <DialogActions>
                    <Button onClick={()=>{
                        this.close()
                    }}>Cancel</Button>
                    <Button onClick={()=>{
                        this.close(true)
                    }}>Save</Button>
                </DialogActions>
            </Dialog>
        );
    }
}
export default withSnackbar(TagGroupEditor);
