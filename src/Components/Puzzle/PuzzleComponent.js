import "./Puzzle.scss";
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem, Select,
    Tooltip,
    Typography
} from "@mui/material";
import {GenerateUID} from "gardenspadejs/dist/general.js";
import React from "react";
import {DataLayer} from "../../DataLayer/DataLayer.js";
import {Puzzle, Solution} from "../../DataLayer/Solution.ts";
import SensorConfigPreview from "../SensorConfigPreview/SensorConfigPreview.js";
import SingleReaderConfigPreview from "../SIngleReaderConfigPreview/SingleReaderConfigPreview";
import SingleSensorConfigPreview from "../SingleSensorConfigPreview/SingleSensorConfigPreview.js";
import AddIcon from '@mui/icons-material/Add';
import {TagIcon} from "../TagIcon/TagIcon";
import { withSnackbar } from "notistack";
class PuzzleComponent extends React.Component{
    constructor(props) {
        super(props);
        this.uid = GenerateUID("PuzzleComp")
        this.puzzle = this.props.puzzle;

        this.state = {
            selectedSolutionIndex: 1,
        };
        this.listenerFunction = ()=>{
            let newSolvedStatus = this.getSolvedStatus();
            if(newSolvedStatus !== this.lastSolvedState){
                this.lastSolvedState = this.getSolvedStatus();
                this.forceUpdate();
            }
        }
    }
    componentDidMount() {
        DataLayer.listenersForAnyTagChanges.push(this.listenerFunction)
    }
    componentWillUnmount() {
        DataLayer.listenersForAnyTagChanges = DataLayer.listenersForAnyTagChanges.filter((l)=>{
            return l !== this.listenerFunction
        })
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(nextProps.puzzle !== this.props.puzzle){
            this.puzzle = nextProps.puzzle;
        }
        return true;
    }
    lastSolvedState = "";
    getSolvedStatus(){
        let solvedStatus = "";
        if(this.props.activeSolution && Boolean(this.props.activeSolution.puzzleTemplateID)){
            if(this.props.activeSolution.solved){
                solvedStatus = " - Solved"
            }
            else{
                solvedStatus = " - Unsolved"
            }
        }
        return solvedStatus;
    }
    render() {
        if(!this.puzzle){
            return <div className="Puzzle">
                No Puzzle Selected
            </div>
        }
        let allReaderIDs = Object.keys(this.puzzle.readerNamesBySlotID || {}).sort((a, b)=>{
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
        let solvedStatus = this.getSolvedStatus();
        this.lastSolvedState = solvedStatus;
        return (
            <div className="Puzzle">

                {/*<Button onClick={()=>{*/}
                {/*    this.loadFromDisk()*/}
                {/*}}>Load Puzzle From Server</Button>*/}

                <div className={"SolutionViewWrapper"}>
                    <Typography variant={"h5"}>{this.puzzle.name}{solvedStatus}</Typography>
                    <Grid container className={"SolutionView"} columns={{xs: nearestSquare * 2 + 1}}>
                        {allReaderIDs.map((relSensor)=>{
                            if(activeSolIsImplementation){
                                let sensorName = this.puzzle.readerNamesBySlotID[relSensor];
                                return <SingleReaderConfigPreview
                                    key={`readerPreview--${relSensor}`}
                                    implementation={activeSolution}
                                    readerID={relSensor}
                                    sensor={sensorName}
                                    allowTagConfig={true}
                                    size={this.props.iconSize || 1}
                                    updateParent={()=>{
                                        this.forceUpdate();
                                    }
                                    }
                                />
                            }
                            let acceptableTags = activeSolution.acceptableTagsPerSensor[relSensor] || [];
                            let senorName = this.puzzle.readerNamesBySlotID[relSensor];
                            return  <SingleSensorConfigPreview
                                size={this.props.iconSize || 1}
                                allowTagConfig={true}  sensor={senorName} tag={acceptableTags?.[0]} onChange={(e)=>{
                                if(e.newValue){
                                    activeSolution.acceptableTagsPerSensor[relSensor] = [e.newValue];
                                }
                                if(e.newSensorName){
                                    this.puzzle.readerNamesBySlotID[relSensor] = e.newSensorName
                                }
                                if(e.delete){
                                    delete this.puzzle.readerNamesBySlotID[relSensor];
                                    this.puzzle.solutions.forEach((sol)=>{
                                        delete sol.acceptableTagsPerSensor[relSensor];
                                    })
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
                                    <TagIcon iconName="mdiPlus"  color="transparent" style={{color: "rgba(0,0,0,0.7)"}} size={3}/>
                                    {/*<AddIcon size={5}/>*/}
                                </Tooltip></div>

                        </Grid>}

                    </Grid>

                    {activeSolIsImplementation && <div className={"ImpResultDropdown"}>
                        <FormControl fullWidth>
                            <InputLabel id={this.uid + "ImplementationDetailDropdown"}>On Solve Action</InputLabel>
                            <Select
                                labelId={this.uid + "ImplementationDetailDropdown"}
                                value={activeSolution.action || "none"}
                                label="On Solve Action"
                                onChange={(event )=>{
                                    activeSolution.action = event.target.value
                                    this.setState({});
                                    activeSolution.save().then(()=>{
                                        this.setState({});
                                    })
                                }}
                            >
                                <MenuItem value={"none"}>None</MenuItem>
                                <MenuItem value={"open box"}>Open Box</MenuItem>
                                <MenuItem value={"unlock door"}>Unlock Door</MenuItem>
                            </Select>
                        </FormControl>
                    </div>}
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
                    this.puzzle.save().then(()=>{
                        this.props.enqueueSnackbar("Saved Changes!", {
                            variant: "success",
                        });
                    }).catch(()=>{
                        this.props.enqueueSnackbar("Failed to save", {
                            variant: "error",
                        });
                    });

                }}>Save</Button>

            </div>
        );
    }
}

export default withSnackbar(PuzzleComponent)