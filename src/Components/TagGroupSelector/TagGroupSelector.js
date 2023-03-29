import "./TagGroupSelector.scss";
import {
    Button, FormControl,
    IconButton, InputAdornment, InputLabel,
    List,
    ListItem,
    ListItemIcon,
    ListItemText, OutlinedInput,
    Popover, TextField,
    Tooltip,
    Typography
} from "@mui/material";
import {GenerateUID} from "gardenspadejs/dist/general.js";
import React, { useState} from "react";
import {useId} from "react-use-id-hook";
import {DataLayer} from "../../DataLayer/DataLayer.js";
import {Puzzle, Solution} from "../../DataLayer/Solution.ts";
import {TagGroup} from "../../DataLayer/TagGroup";
import {PickTagGroupIcon} from "../PickTagGroupIcon/PickTagGroupIcon";
import SensorConfigPreview from "../SensorConfigPreview/SensorConfigPreview.js";
import SingleSensorConfigPreview from "../SingleSensorConfigPreview/SingleSensorConfigPreview.js";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
export default class TagGroupSelector extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            creatingNewTagGroup: false,
            NewTagGroupName: "",
            sensorName: "",
        };
    }
    componentDidMount() {

    }
    close(e, save=false) {
        if (save) {
            this.props.onChange({newSensorName: this.state.sensorName})
        }
        this.props.onClose(e);

    }
    render() {
        if(!this.state.sensorName){
            this.state.sensorName = this.props.sensorName;
        }
        let closeNoSave = (e={})=>{
            this.close(e, false)
        }
        let closeAndSave = (e={})=>{
            this.close(e, false)
        }
        return <Popover
            open={this.props.open}
            anchorEl={this.props.anchorEl}
            onClose={(e)=>{
                this.close(e, true)
            }
            }
            anchorOrigin={this.props.anchorOrigin || {
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={this.props.transformOrigin || {
                vertical: 'top',
                horizontal: 'right',
            }}
            PaperProps={{className: "TagGroupSelector"}}
        >
            <div className={"TagGroupSelector__Header"}>
                <Typography variant={"h4"}>Name sensor:</Typography>
                <TextField value={this.state.sensorName} onChange={(e)=>{
                    this.setState({
                        sensorName : e.target.value
                    })
                }
                }/>
                <Typography variant={"h4"}>Select Tag Group:</Typography>
                {this.props.value && <SingleTagGroupEntry className={"TagGroupSelector__CurSelection"} tag={this.props.value}/>}
            </div>
            <List className={"TagGroupSelector__SelectionList"}>
                {DataLayer.tagGroups.map((tg)=>{
                    let tagGroupEntryClassName = " TagGroupSelector__singleEntry ";
                    if(tg === this.props.value){
                        tagGroupEntryClassName += " TagGroupSelector__singleEntry--selected ";
                    }
                    return <SingleTagGroupEntry key={tg.id} className={tagGroupEntryClassName} tag={tg} onClick={()=>{this.props.onChange({newValue: tg})}}/>
                })}

            </List>
            <div className={"TagGroupSelector__AddTagGroup"}>
                <CreateTagGroupSingleLine onTagGroupCreated={(e)=>{
                    this.props.onChange({newValue: e.value, newSensorName: this.state.sensorName})
                    this.forceUpdate();
                }
                }

                />
                <div className={"TagGroupSelector__Actions"}>
                    <Button onClick={(e)=>{

                        this.close(e, true)
                    }
                    }>Save</Button>
                </div>
            </div >


        </Popover>

    }

}

function SingleTagGroupEntry(props){
    let summaryOfConnectedNodes = "";
    if(props.tag?.tags && props.tag?.tags.length  > 0){
        if(props.tag?.tags.length  === 1){
            summaryOfConnectedNodes = props.tag?.tags[0];
        }
        if(props.tag?.tags.length < 4){
            summaryOfConnectedNodes = props.tag?.tags.join(", ");
        }
        else{
            summaryOfConnectedNodes = props.tag?.tags.slice(0, 4).join(", ") + "...";
        }
    }
    return <ListItem className={"SingleTagGroupEntry " + (props.classname || "")} onClick={props.onClick || null}
                    //  secondaryAction={
                    //     <IconButton edge="end" aria-label="delete" onClick={()=>{}}>
                    //         <EditIcon />
                    //     </IconButton>
                    // }
    >
        <ListItemIcon>
            {props.tag?.getIcon ? props.tag?.getIcon() : < QuestionMarkIcon />}
        </ListItemIcon>
        <ListItemText primary={props.tag?.name} secondary={summaryOfConnectedNodes } />

    </ListItem>
}


export function CreateTagGroupSingleLine(props){
    const [creatingTagGroup, setCreatingTagGroup] = useState(false);
    const [newTagGroupName, setNewTagGroupName] = useState("");
    const [pickingIcon, setPickingIcon] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState("mdiCancel");
    const [newTagGroupIconName, setNewTagGroupIconName] = useState("");
    const inputID = useId();
    return <ListItem onClick={()=>{  setCreatingTagGroup(true) } } className={"CreateTagGroup " + (props.className || "")}>
        {!creatingTagGroup && <ListItemIcon onClick={()=>{
            if(creatingTagGroup){
                setPickingIcon(true);
            }
        }
        }>
            <AddIcon/>
        </ListItemIcon>}
        <ListItemText primary={
            creatingTagGroup ?
                <FormControl sx={{ m: 1, minWidth: '25ch' }} variant="outlined">
                    <InputLabel htmlFor={inputID}>New Tag Group Name</InputLabel>
                    <OutlinedInput
                        htmlFor={inputID}
                        value={newTagGroupName}
                        onChange={(e)=>{
                            setNewTagGroupName(e.target.value)
                        }}
                        fullWidth
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={()=>{
                                        setNewTagGroupName("");
                                        setCreatingTagGroup(false);
                                    }
                                    }
                                    edge="end"

                                >
                                    <ClearIcon/>
                                </IconButton>
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={async ()=>{
                                        setPickingIcon(true);
                                    }
                                    }
                                    edge="end"

                                >
                                    <CheckIcon/>
                                </IconButton>
                            </InputAdornment>
                        }
                        label="New Tag Type Name"
                    />
                </FormControl>

                : "Create New..."
        }/>
        <PickTagGroupIcon open={pickingIcon} onClose={async (e, save)=>{
            setPickingIcon(false)
            if(save){
                console.log(`arguments:`, e);
                let newTagGroup = new TagGroup({
                    name: newTagGroupName,
                    tags: [],
                    icon: e.iconName,
                    color: e.iconColor,
                }, true);
                await newTagGroup.save();
                DataLayer.tagGroups.push(newTagGroup);
                if(props.onTagGroupCreated){
                    props.onTagGroupCreated({value: newTagGroup});
                }
                setNewTagGroupName("");
                setCreatingTagGroup(false);
            }
            else{

            }
        } } defaultIcon={selectedIcon} onChange={(e)=>{setSelectedIcon(e.value)}}/>

    </ListItem>
}


