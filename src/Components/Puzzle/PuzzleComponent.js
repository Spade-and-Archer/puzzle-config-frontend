import "./Puzzle.scss";
import {Button, List, ListItem, ListItemText, Tooltip, Typography} from "@mui/material";
import {GenerateUID} from "gardenspadejs/dist/general.js";
import React from "react";
import {DataLayer} from "../../DataLayer/DataLayer.js";
import {Puzzle, Solution} from "../../DataLayer/Solution.js";
import SensorConfigPreview from "../SensorConfigPreview/SensorConfigPreview.js";
import SingleSensorConfigPreview from "../SingleSensorConfigPreview/SingleSensorConfigPreview.js";

export default class PuzzleComponent extends React.Component{
    allPuzzles = [];
    async loadFromDisk(){
        let puzzlesFromServer =  await (await fetch("http://localhost:4010/api/puzzles", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        })).json();

        this.allPuzzles = puzzlesFromServer.map((rawP)=>{
            return new Puzzle(rawP);
        });
        if(this.allPuzzles.length > 0){
            this.puzzle = this.allPuzzles[0];
        }
    }
    constructor(props) {
        super(props);

        this.puzzle = new Puzzle({
            name: "first Puzzle",
            solutions: [
               {
                    name: "solution 1",
                    id: GenerateUID("solution"),
                    acceptableTagsPerSensor: {
                        "tempSensor" : [DataLayer.tags[0], DataLayer.tags[1] ],
                        "tempSensor2": [DataLayer.tags[2], DataLayer.tags[1] ],
                    },
                },
               {
                    name: "solution 2",
                    id: GenerateUID("solution"),
                    acceptableTagsPerSensor: {
                        "tempSensor" : [DataLayer.tags[0] ],
                        "tempSensor2": [DataLayer.tags[2] ],
                    }
                },
                {
                    name: "Diamond Pick",
                    id: GenerateUID("solution"),
                    acceptableTagsPerSensor: {
                        "tempSensor" : [DataLayer.tags[3] ],
                        "tempSensor2": [DataLayer.tags[3] ],
                        "tempSensor3": [DataLayer.tags[3] ],
                        "tempSensor5": [DataLayer.tags[4] ],
                        "tempSensor8": [DataLayer.tags[4] ],
                    }
                },
               {
                    name: "Any Pick",
                    id: GenerateUID("solution"),
                    acceptableTagsPerSensor: {
                        "tempSensor" : [DataLayer.tags[3], DataLayer.tags[6] ],
                        "tempSensor2": [DataLayer.tags[3], DataLayer.tags[6]  ],
                        "tempSensor3": [DataLayer.tags[3], DataLayer.tags[6]  ],
                        "tempSensor5": [DataLayer.tags[4] ],
                        "tempSensor8": [DataLayer.tags[4] ],
                    }
                },
               {
                    name: "Torch",
                    id: GenerateUID("solution"),
                    acceptableTagsPerSensor: {
                        //"tempSensor" : [DataLayer.tags[3], DataLayer.tags[6] ],
                        "tempSensor2": [DataLayer.tags[5]  ],
                        //"tempSensor3": [DataLayer.tags[3], DataLayer.tags[6]  ],
                        "tempSensor5": [DataLayer.tags[4] ],
                        //"tempSensor8": [DataLayer.tags[4] ],
                    }
                }
            ],
            readerNamesBySlotID: {
                "tempSensor1" : "tempSensor1",
                "tempSensor2" : "tempSensor2",
                "tempSensor3" : "tempSensor3",
                "tempSensor4" : "tempSensor4",
                "tempSensor5" : "tempSensor5",
                "tempSensor6" : "tempSensor6",
                "tempSensor7" : "tempSensor7",
                "tempSensor8" : "tempSensor8",
                "tempSensor9" : "tempSensor9",
            }
        })
        this.state = {
            selectedSolutionIndex: 1,
        };
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }

    render() {
        let allReaderIDs = Object.keys(this.puzzle.readerNamesBySlotID).sort((a, b)=>{
            return this.puzzle.readerNamesBySlotID[a].localeCompare(this.puzzle.readerNamesBySlotID[b]);
        });
        let activeSolution = this.puzzle.solutions[this.state.selectedSolutionIndex] || this.puzzle.solutions[0] || {};
        return (
            <div className="Puzzle">
                <Button onClick={()=>{
                    this.loadFromDisk()
                }}>Load Puzzle From Server</Button>

                <div className={"SolutionViewWrapper"}>
                    <div className={"SolutionView"}>
                        {allReaderIDs.map((relSensor)=>{
                            let acceptableTags = activeSolution.acceptableTagsPerSensor[relSensor] || [];
                            let senorName = this.puzzle.readerNamesBySlotID[relSensor];
                            return  <SingleSensorConfigPreview  sensor={senorName} tag={acceptableTags?.[0]} />
                        })}
                    </div>
                </div>
                <div className={"SolutionSidebar"}>
                    <List>
                        {this.puzzle.solutions.map((s, i)=>{
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

