import React from "react";
import {GenerateUID} from "gardenspadejs/dist/general";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./TestBedPage.scss";
import SolutionSelector from "../Components/SolutionSelector/SolutionSelector";
import PuzzlesPreview from "../Components/PuzzlesPreview/PuzzlesPreview";

export default class TestBedPage extends React.Component {
    constructor(props) {
        super(props);
        this.uid = GenerateUID("TestBedPage");
        this.state = {
            masterSolutionList : [
                {
                    name: "whatever",
                    focused: false
                },
                {
                    name: "focusedSolution",
                    focused: true
                },
                {
                    name: "thirdSolution",
                    focused: false
                },
            ],
            masterPuzzleList : [
                {
                    name: "puzzle 1",
                    focused: false
                },
                {
                    name: "puzzle 2",
                    focused: true
                },
                {
                    name: "puzzle 3",
                    focused: false
                },
            ]
        }
    }

    render() {
        //console.log(this.state.masterSolutionList);
        let className = "TestBedPage"
        return (
            <div className={className} id={this.uid}>
                <Typography>Sol Selector 1</Typography>
                <SolutionSelector
                    solutions={this.state.masterSolutionList}

                    onFocusedSolutionHandler={(e)=>{
                        console.log(e.focusedSolution);
                    }}

                    onDeleteSolutionHandler={(e)=>{
                        this.setState({
                            masterSolutionList : this.state.masterSolutionList.filter((listEntry)=>{
                                return listEntry !== e.solutionToDelete
                            })
                        });
                        // this.state.masterSolutionList = ;
                        // this.forceUpdate();
                    }}
                    onAddSolutionHandler={(e)=>{
                        this.state.masterSolutionList.push({
                            name: e.newSolutionName,
                            focused: false
                        });
                        this.forceUpdate();
                    }}
                />
                <Typography>Sol Selector Empty</Typography>
                <SolutionSelector

                    solutions={[]}
                    onFocusedSolutionHandler={(e)=>{
                        console.log(e.focusedSolution);
                    }}


                    //sendFocusedSolution = {(e)=>{
                    //    name: e.newFocusedSolution,
                    //console.log(name)
                    //}}

                    onDeleteSolutionHandler={(e)=>{
                        this.setState({
                            masterSolutionList : this.state.masterSolutionList.filter((listEntry)=>{
                                return listEntry !== e.solutionToDelete
                            })
                        });
                        // this.state.masterSolutionList = ;
                        // this.forceUpdate();
                    }}

                    onAddSolutionHandler={(e)=>{
                        this.state.masterSolutionList.push({
                            name: e.newSolutionName,
                            focused: false
                        });
                        this.forceUpdate();
                    }}
                ></SolutionSelector>
                <Typography>Sol Selector very full</Typography>
                <SolutionSelector
                    solutions={[
                        ...this.state.masterSolutionList,
                        ...this.state.masterSolutionList,
                        ...this.state.masterSolutionList,
                        ...this.state.masterSolutionList,
                        ...this.state.masterSolutionList,
                    ]}

                    onFocusedSolutionHandler={(e)=>{
                        console.log(e.focusedSolution);
                    }}

                    onDeleteSolutionHandler={(e)=>{
                        this.setState({
                            masterSolutionList : this.state.masterSolutionList.filter((listEntry)=>{
                                return listEntry !== e.solutionToDelete
                            })
                        });
                        // this.state.masterSolutionList = ;
                        // this.forceUpdate();
                    }}
                    onAddSolutionHandler={(e)=>{
                        this.state.masterSolutionList.push({
                            name: e.newSolutionName,
                            focused: false
                        });
                        this.forceUpdate();
                    }}
                ></SolutionSelector>



                <Typography>Puzzle Viewer Normal</Typography>
                <PuzzlesPreview

                    puzzles={this.state.masterPuzzleList}

                    onFocusedPuzzleHandler={(e)=>{
                        console.log(e.focusedPuzzle);
                    }}

                    onDeletePuzzleHandler={(e)=>{
                        this.setState({
                            masterPuzzleList : this.state.masterPuzzleList.filter((listEntry)=>{
                                return listEntry !== e.puzzleToDelete
                            })
                        });
                    }}

                    onAddPuzzleHandler={(e)=> {
                        console.log("add puzzle accessed")
                    }}

                ></PuzzlesPreview>
            </div>
        );
    }
}
