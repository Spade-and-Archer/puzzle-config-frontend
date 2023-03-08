import React from "react";
import {GenerateUID} from "gardenspadejs/dist/general";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./TestBedPage.scss";
import SolutionSelector from "../Components/SolutionSelector/SolutionSelector";
import PuzzlesPreview from "../Components/PuzzlesPreview/PuzzlesPreview";
import {Puzzle, Solution} from "../DataLayer/Solution";

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
                new Puzzle({
                    id : "testPuzzle1",
                    solutions : [new Solution({
                        name: "test Puzzle Sol 1",
                        id: "testSol1",
                        perReaderRequirements: {
                            1: {
                                oneOf: ["temp"]
                            },
                            2: {
                                oneOf: ["temp2"]
                            },
                            3: {
                                oneOf: ["temp3"]
                            },
                            4: {
                                oneOf: ["diamond"]
                            }
                        }
                    })],
                    name : "Puzzle 1",
                    description : "this is a test puzzle",
                    readerNamesBySlotID :{
                        1: "Reader 1",
                        2: "Reader 2",
                        3: "Reader 3",
                        4: "Reader 4",
                    }
                }),
                new Puzzle({
                    id : "testPuzzle1",
                    solutions : [new Solution({
                        name: "test Puzzle Sol 1",
                        id: "testSol1",
                        perReaderRequirements: {
                            1: {
                                oneOf: ["temp"]
                            },
                            2: {
                                oneOf: ["temp2"]
                            },
                            3: {
                                oneOf: ["temp3"]
                            },
                            4: {
                                oneOf: ["diamond"]
                            }
                        }
                    })],
                    name : "Puzzle 1",
                    description : "this is a test puzzle",
                    readerNamesBySlotID :{
                        1: "Reader 1",
                        2: "Reader 2",
                        3: "Reader 3",
                        4: "Reader 4",
                    }
                }),
                new Puzzle({
                    id : "testPuzzle2",
                    solutions : [
                        new Solution({
                            name: "test Puzzle Sol 1",
                            id: "testSol1",
                            perReaderRequirements: {
                                1: {
                                    oneOf: ["temp"]
                                },
                                2: {
                                    oneOf: ["temp2"]
                                },
                                3: {
                                    oneOf: ["temp3"]
                                },
                                4: {
                                    oneOf: ["diamond"]
                                }
                            }
                        }),
                        new Solution({
                            name: "test Puzzle Sol 2",
                            id: "testSol2",
                            perReaderRequirements: {
                                1: {
                                    oneOf: ["greenTag"]
                                },
                                2: {
                                    oneOf: ["blueTag"]
                                },
                                3: {
                                    oneOf: ["coal"]
                                },
                                4: {
                                    oneOf: ["iron"]
                                }
                            }
                        })
                    ],
                    name : "Puzzle 2",
                    description : "this is another test puzzle",
                    readerNamesBySlotID :{
                        1: "Reader 1",
                        2: "Reader 2",
                        3: "Reader 3",
                        4: "Reader 4",
                    }
                }),
                new Puzzle({
                    id : "testPuzzle3",
                    solutions : [],
                    name : "Puzzle 3",
                    description : "this is a puzzle with no solutions",
                    readerNamesBySlotID :{
                        1: "Reader 1",
                        2: "Reader 2",
                        3: "Reader 3",
                        4: "Reader 4",
                    }
                }),
                new Puzzle({
                    id: "twoReaderPuzzle",
                    solutions: [
                        new Solution({
                            name: "Two Reader Solution",
                            id: "twoReaderSol",
                            perReaderRequirements: {
                                1: {
                                    oneOf: ["temp"]
                                },
                                2: {
                                    oneOf: ["temp2"]
                                }
                            }
                        })
                    ],
                    name: "Two Reader Puzzle",
                    description: "This is a puzzle for two readers.",
                    readerNamesBySlotID: {
                        1: "Reader 1",
                        2: "Reader 2"
                    }
                }),

                new Puzzle({
                    id: "threeReaderPuzzle",
                    solutions: [
                        new Solution({
                            name: "Three Reader Solution",
                            id: "threeReaderSol",
                            perReaderRequirements: {
                                1: {
                                    oneOf: ["temp"]
                                },
                                2: {
                                    oneOf: ["temp2"]
                                },
                                3: {
                                    oneOf: ["greenTag"]
                                }
                            }
                        })
                    ],
                    name: "Three Reader Puzzle",
                    description: "This is a puzzle for three readers.",
                    readerNamesBySlotID: {
                        1: "Reader 1",
                        2: "Reader 2",
                        3: "Reader 3"
                    }
                }),

                new Puzzle({
                    id: "5readerPuzzle",
                    name: "Five Reader Puzzle",
                    description: "A puzzle with five readers",
                    readerNamesBySlotID: {
                        1: "Reader 1",
                        2: "Reader 2",
                        3: "Reader 3",
                        4: "Reader 4",
                        5: "Reader 5"
                    },
                    solutions: [
                        new Solution({
                            id: "5readerSol1",
                            name: "Five Reader Solution 1",
                            perReaderRequirements: {
                                1: {
                                    oneOf: ["temp"]
                                },
                                2: {
                                    oneOf: ["temp2"]
                                },
                                3: {
                                    oneOf: ["temp3"]
                                },
                                4: {
                                    oneOf: ["diamond"]
                                },
                                5: {
                                    oneOf: ["stick"]
                                }
                            }
                        })
                    ]
                })
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
