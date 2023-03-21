import "./Puzzle.scss";
import {Button, Grid, List, ListItem, ListItemText, Tooltip, Typography} from "@mui/material";
import {GenerateUID} from "gardenspadejs/dist/general.js";
import React from "react";
import {DataLayer} from "../../DataLayer/DataLayer.js";
import {Puzzle, Solution} from "../../DataLayer/Solution.ts";
import SensorConfigPreview from "../SensorConfigPreview/SensorConfigPreview.js";
import SingleReaderConfigPreview from "../SIngleReaderConfigPreview/SingleReaderConfigPreview";
import SingleSensorConfigPreview from "../SingleSensorConfigPreview/SingleSensorConfigPreview.js";
import AddIcon from '@mui/icons-material/Add';
export default class PuzzleComponent extends React.Component{
    constructor(props) {
        super(props);

        this.puzzle = this.props.puzzle;

        this.state = {
            selectedSolutionIndex: 1,
        };
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(nextProps.puzzle !== this.props.puzzle){
            this.puzzle = nextProps.puzzle;
        }
        return true;
    }

    render() {
        if(!this.puzzle){
            return <div className="Puzzle">
                No Puzzle Selected
            </div>
        }
        let allReaderIDs = Object.keys(this.puzzle.readerNamesBySlotID).sort((a, b)=>{
            return this.puzzle.readerNamesBySlotID[a].localeCompare(this.puzzle.readerNamesBySlotID[b]);
        });
        let activeSolution = this.props.activeSolution;// this.puzzle.solutions[this.state.selectedSolutionIndex] || this.puzzle.solutions[0] || {};

        if(!activeSolution){
            return <div className="Puzzle">
                Select Solution
            </div>
        }
        let activeSolIsImplementation = Boolean(activeSolution.puzzleTemplateID);

        let nearestSquare = Math.ceil(Math.sqrt(allReaderIDs.length + (this.props.previewMode ? 0 : 1)));
        if(nearestSquare < 3){
            nearestSquare = 3;
        }
        return (
            <div className="Puzzle">

                {/*<Button onClick={()=>{*/}
                {/*    this.loadFromDisk()*/}
                {/*}}>Load Puzzle From Server</Button>*/}

                <div className={"SolutionViewWrapper"}>
                    <Typography variant={"h5"}>{this.puzzle.name}</Typography>
                    <Grid container className={"SolutionView"} columns={{xs: nearestSquare * 2 + 1}}>
                        {allReaderIDs.map((relSensor)=>{
                            if(activeSolIsImplementation){
                                let sensorName = this.puzzle.readerNamesBySlotID[relSensor];
                                return <SingleReaderConfigPreview
                                    implementation={activeSolution}
                                    readerID={relSensor}
                                    sensor={sensorName}
                                    allowTagConfig={true}
                                    updateParent={()=>{
                                        this.forceUpdate();
                                    }
                                    }
                                />
                            }
                            let acceptableTags = activeSolution.acceptableTagsPerSensor[relSensor] || [];
                            let senorName = this.puzzle.readerNamesBySlotID[relSensor];
                            return  <SingleSensorConfigPreview allowTagConfig={true}  sensor={senorName} tag={acceptableTags?.[0]} onChange={(e)=>{
                                if(e.newValue){
                                    activeSolution.acceptableTagsPerSensor[relSensor] = [e.newValue];
                                }
                                if(e.newSensorName){
                                    this.puzzle.readerNamesBySlotID[relSensor] = e.newSensorName
                                }
                                this.setState({})
                            }
                            }
                                                               key={`sensorPreview--${relSensor}`}
                            />
                        })}

                        {(!this.props.previewMode) && <Grid item  xs={2} className={"SingleSensorConfigPreview SingleSensorConfigPreview--dummy"}>
                            <Typography>Add New</Typography>
                            <div className={"tagIconHolder"} onClick={()=>{

                                this.puzzle.readerNamesBySlotID[`Reader:${Math.random()}`] = "new reader";
                                this.setState({});

                            }}>

                                <Tooltip title={"Add Reader"} placement={"left"}>

                                    <AddIcon/>
                                </Tooltip></div>

                        </Grid>}

                    </Grid>
                    <div >


                    </div>
                </div>

                {/*<div className={"SolutionSidebar"}>*/}
                {/*    <List>*/}
                {/*        {this.puzzle.solutions.map((s, i)=>{*/}
                {/*            return  <ListItem*/}
                {/*                className={`solutionEntry solutionEntry--${i === this.state.selectedSolutionIndex ? "selected" : "unselected"}`}*/}
                {/*                onClick={()=>{ this.setState({selectedSolutionIndex: i})} }*/}
                {/*            >*/}
                {/*                <ListItemText*/}
                {/*                    primary={s.name}*/}
                {/*                />*/}
                {/*            </ListItem>*/}
                {/*        })}*/}
                {/*    </List>*/}
                {/*    <Button variant={"contained"} className={"AddSolutionButton"}>Add Solution</Button>*/}
                {/*</div>*/}

                <Button onClick={(e)=>{
                    this.puzzle.save();
                }}>Save</Button>

            </div>
        );
    }

}

