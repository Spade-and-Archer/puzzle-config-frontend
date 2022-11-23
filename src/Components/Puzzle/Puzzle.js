import "./Puzzle.scss";
import {Button, List, ListItem, ListItemText, Tooltip, Typography} from "@mui/material";
import {GenerateUID} from "gardenspadejs/dist/general.js";
import React from "react";
import {DataLayer} from "../../DataLayer/DataLayer.js";
import {Solution} from "../../DataLayer/Solution.js";
import SensorConfigPreview from "../SensorConfigPreview/SensorConfigPreview.js";

export default class Puzzle extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            solutions : [
                new Solution({
                    name: "solution 1",
                    id: GenerateUID("solution"),
                    acceptableTagsPerSensor: {
                        "tempSensor" : [DataLayer.tags[0], DataLayer.tags[1] ],
                        "tempSensor2": [DataLayer.tags[2], DataLayer.tags[1] ],
                    },
                    relevantSensors: [...DataLayer.sensors]
                }),
                new Solution({
                    name: "solution 2",
                    id: GenerateUID("solution"),
                    acceptableTagsPerSensor: {
                        "tempSensor" : [DataLayer.tags[0] ],
                        "tempSensor2": [DataLayer.tags[2] ],
                    },
                    relevantSensors: [...DataLayer.sensors]
                }),
                new Solution({
                    name: "Diamond Pick",
                    id: GenerateUID("solution"),
                    acceptableTagsPerSensor: {
                        "tempSensor" : [DataLayer.tags[3] ],
                        "tempSensor2": [DataLayer.tags[3] ],
                        "tempSensor3": [DataLayer.tags[3] ],
                        "tempSensor5": [DataLayer.tags[4] ],
                        "tempSensor8": [DataLayer.tags[4] ],
                    },
                    relevantSensors: [...DataLayer.sensors]
                }),
                new Solution({
                    name: "Any Pick",
                    id: GenerateUID("solution"),
                    acceptableTagsPerSensor: {
                        "tempSensor" : [DataLayer.tags[3], DataLayer.tags[6] ],
                        "tempSensor2": [DataLayer.tags[3], DataLayer.tags[6]  ],
                        "tempSensor3": [DataLayer.tags[3], DataLayer.tags[6]  ],
                        "tempSensor5": [DataLayer.tags[4] ],
                        "tempSensor8": [DataLayer.tags[4] ],
                    },
                    relevantSensors: [...DataLayer.sensors]
                }),
                new Solution({
                    name: "Torch",
                    id: GenerateUID("solution"),
                    acceptableTagsPerSensor: {
                        //"tempSensor" : [DataLayer.tags[3], DataLayer.tags[6] ],
                        "tempSensor2": [DataLayer.tags[5]  ],
                        //"tempSensor3": [DataLayer.tags[3], DataLayer.tags[6]  ],
                        "tempSensor5": [DataLayer.tags[4] ],
                        //"tempSensor8": [DataLayer.tags[4] ],
                    },
                    relevantSensors: [...DataLayer.sensors]
                })
            ],
            selectedSolutionIndex: 1,
        };
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }

    render() {


        return (
            <div className="Puzzle">
                <div className={"SolutionViewWrapper"}>
                    <div className={"SolutionView"}>
                        {this.state.solutions[this.state.selectedSolutionIndex].relevantSensors.map((relSensor)=>{
                            let acceptableTags = this.state.solutions[this.state.selectedSolutionIndex].acceptableTagsPerSensor[relSensor.id] || [];
                            return  <SensorConfigPreview sensor={ relSensor} tags={acceptableTags} />
                        })}
                    </div>
                </div>
                <div className={"SolutionSidebar"}>
                    <List>
                        {this.state.solutions.map((s, i)=>{
                            return  <ListItem
                                className={`solutionEntry solutionEntry--${i === this.state.selectedSolutionIndex ? "selected" : "unselected"}`}
                                onClick={()=>{ this.setState({selectedSolutionIndex: i})} }
                            >
                                <ListItemText
                                    primary={s.name}
                                />
                            </ListItem>
                        })}
                    </List>
                    <Button variant={"contained"} className={"AddSolutionButton"}>Add Solution</Button>
                </div>



            </div>
        );
    }

}

