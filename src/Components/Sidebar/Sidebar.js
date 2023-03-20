import {TabList} from "@mui/lab";
import {List, ListItem, ListItemIcon, ListItemText, Tab, Tabs} from "@mui/material";
import {GenerateUID} from "gardenspadejs/dist/general";
import React from "react";
import "./Sidebar.scss"
import {DataLayer} from "../../DataLayer/DataLayer";
import TagGroupEditor from "../TagGroupEditor/TagGroupEditor";

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.uid = GenerateUID("TagGroupEditor");
        this.state = {
            selectedTab: "tags",
            tagToEdit: undefined,
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