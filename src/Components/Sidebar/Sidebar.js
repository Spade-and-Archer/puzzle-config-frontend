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
        return <div className={'Sidebar'}>
            <div className={"SidebarTabs"}>
                <Tabs onChange={(e, curTab)=>{
                    this.setState({selectedTab: curTab});
                }
                }  value={this.state.selectedTab} aria-label="lab API tabs example">
                    <Tab label="Tags" value="tags" />
                    <Tab label="Puzzles" value="puzzles" />
                </Tabs>
            </div>
            <div className={`SidebarTab SidebarTab--${curTabToNumber === 0 ? "visible" :  (curTabToNumber > 0 ? "sweptLeft" : "sweptRight")}`}>
                <List>
                    {DataLayer.tagGroups.map((tagGroup)=>{
                        return <ListItem
                            button
                            onClick={()=>{
                                this.setState({tagToEdit: tagGroup})
                            }
                            }
                        >
                            <ListItemIcon>
                                {tagGroup.getIcon()}
                            </ListItemIcon>
                            <ListItemText
                                primary={tagGroup.name}
                                secondary={`${tagGroup.tags.length} tag(s) registered`}
                            />
                        </ListItem>
                    })
                    }

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