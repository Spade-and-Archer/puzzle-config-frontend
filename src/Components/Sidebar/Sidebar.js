import AddIcon from "@mui/icons-material/Add";
import {TabList} from "@mui/lab";
import {IconButton, List, ListItem, ListItemIcon, ListItemText, Tab, Tabs, TextField} from "@mui/material";
import {GenerateUID} from "gardenspadejs/dist/general";
import * as PropTypes from "prop-types";
import React from "react";
import "./Sidebar.scss"
import {DataLayer} from "../../DataLayer/DataLayer";
import TagGroupEditor from "../TagGroupEditor/TagGroupEditor";
import {CreateTagGroupSingleLine} from "../TagGroupSelector/TagGroupSelector";
import { useDrag } from 'react-dnd'
import Typography from "@mui/material/Typography";

CreateTagGroupSingleLine.propTypes = {onTagGroupCreated: PropTypes.func};
export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.uid = GenerateUID("TagGroupEditor");
        this.state = {
            selectedTab: "tags",
            tagToEdit: undefined,
            newTagGroupName: ""
        }
    }


    render() {
        let tabOrder = ["tags", "puzzles"]
        let curTabToNumber = tabOrder.indexOf(this.state.selectedTab)
        console.log("Tag groups to render in sidebar:", DataLayer.tagGroups)
        return<div className={'Sidebar'}>
            <Typography className = 'TagTypesTitle' variant="h2" >Tag Types</Typography>
            <div className={`SidebarTab SidebarTab--${curTabToNumber === 0 ? "visible" :  (curTabToNumber > 0 ? "sweptLeft" : "sweptRight")}`}>
                <List className={"TagTypesMasterList"}>
                    <div className = 'tagHolder'>
                        {DataLayer.tagGroups.map((tagGroup)=>{
                            return <DraggableWrapper
                                comp={ListItem}
                                item={tagGroup}
                                button
                                onClick={()=>{
                                    this.setState({tagToEdit: tagGroup})
                                }
                                }
                                key={tagGroup.id}
                            >
                                <ListItemIcon>
                                    {tagGroup.getIcon()}
                                </ListItemIcon>
                                <ListItemText
                                    primary={tagGroup.name}
                                    secondary={`${tagGroup.tags.length} tag(s) registered`}
                                />
                            </DraggableWrapper>
                        })
                        }
                    </div>
                    <CreateTagGroupSingleLine onTagGroupCreated={(e)=>{
                        this.forceUpdate();
                    }
                    }

                    />
                        {/*<ListItem>*/}
                        {/*    <TextField*/}
                        {/*        value={this.state.newTagGroupName}*/}
                        {/*        onChange={(e)=>{*/}
                        {/*            this.setState({*/}
                        {/*                newTagValue : e.target.value*/}
                        {/*            })*/}
                        {/*        }}*/}
                        {/*        label={"new tag Type:"}*/}
                        {/*        variant="standard"*/}
                        {/*    />*/}
                        {/*    <IconButton*/}
                        {/*        edge="end"*/}
                        {/*        //if it is an empty string or undefined*/}
                        {/*        disabled={!Boolean(this.state.newTagGroupName)}*/}
                        {/*        onClick={()=>{*/}
                        {/*            this.setState({*/}
                        {/*                newTagValue: ""*/}
                        {/*            });*/}
                        {/*        }*/}
                        {/*        }*/}
                        {/*    >*/}
                        {/*        <AddIcon/>*/}
                        {/*    </IconButton>*/}
                        {/*</ListItem>*/}
                </List>
            </div>

            {this.state.tagToEdit && <TagGroupEditor
                open={this.state.tagToEdit}
                tagGroup={this.state.tagToEdit}
                onClose={()=>{
                    this.setState({
                        tagToEdit: undefined
                    })
                }
                }

            />}
        </div>
    }
}
const DraggableWrapper = (props)=>{
    let propsToPass = Object.assign({}, props);
    delete propsToPass.onDrag;
    delete propsToPass.item;
    delete propsToPass.comp;
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "TagType",
        item: props.item,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }))

    return <props.comp ref={drag} {...propsToPass}/>


}