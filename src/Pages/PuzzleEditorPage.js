import {
    Button,
    Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import React from "react";
import {GenerateUID} from "gardenspadejs/dist/general";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./PuzzleEditorPage.scss";
import PuzzleComponent from "../Components/Puzzle/PuzzleComponent";
import PuzzleImplementationsPreview from "../Components/PuzzleImplementationsPreview/PuzzleImplementationsPreview";
import Sidebar from "../Components/Sidebar/Sidebar";
import SolutionSelector from "../Components/SolutionSelector/SolutionSelector";
import {DataLayer} from "../DataLayer/DataLayer";
import {loadData} from "../DataLayer/DataLoader";
import {PuzzleImplementation} from "../DataLayer/PuzzleImplementation";
import {Puzzle, Solution} from "../DataLayer/Solution";
import PuzzlesPreview from "../Components/PuzzlesPreview/PuzzlesPreview";

export default class PuzzleEditorPage extends React.Component {
    constructor(props) {
        super(props);
        this.uid = GenerateUID("PuzzleEditorPage");
        this.state = {
            selectedPuzzle:0,
            addingPuzzle: false,
            newPuzzleName: "",
            focusedSolution: undefined,
        }
        loadData().then(()=>{
            if(this.beenRendered){
                this.forceUpdate();
            }
        })
    }
    beenRendered=  false;
    render() {
        this.beenRendered =true;
        if(this.state.selectedPuzzle && this.state.selectedPuzzle.solutions){
            if(!this.state.selectedPuzzle.solutions.includes(this.state.focusedSolution)){
                if(this.state.focusedSolution?.puzzleTemplateID !==  this.state.selectedPuzzle.id){
                    // eslint-disable-next-line react/no-direct-mutation-state
                    this.state.focusedSolution = undefined;
                }
            }
        }else{
            // eslint-disable-next-line react/no-direct-mutation-state
            this.state.focusedSolution = undefined;
        }
        if(this.state.selectedPuzzle && this.state.selectedPuzzle.solutions && this.state.focusedSolution === undefined){
            // eslint-disable-next-line react/no-direct-mutation-state
            this.state.focusedSolution = this.state.selectedPuzzle.solutions[0];
        }
        let className = "PuzzleEditorPage"
        let isPuzzle = Boolean(this.state.selectedPuzzle);
        return (
            <div className={className} id={this.uid}>
                <div className={"PuzzleEditorToolbar"}>
                    <Typography className="ProductName" variant="h2">ShapeShifter</Typography>

                    <div className = {"PuzzleDropDown"}>
                        <PuzzlesPreview

                            puzzles={DataLayer.puzzles}

                            onFocusedPuzzleHandler={(e) => {
                                this.setState({selectedPuzzle: e.focusedPuzzle})
                                console.log(e.focusedPuzzle);
                            }}

                            onAddPuzzleHandler={async (e) => {
                                let thisNewPuzzle = await Puzzle.CreateNew({name: e.newPuzzleName});

                                this.setState({selectedPuzzle: thisNewPuzzle})
                                this.forceUpdate();
                                return thisNewPuzzle;
                            }}

                            onDeleteSolutionHandler={(e) => {
                                this.state.selectedPuzzle = this.state.selectedPuzzle.filter((listEntry) => {
                                    return listEntry !== e.puzzleToDelete
                                })
                                this.forceUpdate();

                            }}

                        ></PuzzlesPreview>
                   {/*</Box>*/}
               </div>
                </div>
                {!isPuzzle && <div> Please Add or Select a Puzzle</div>}

                {isPuzzle && <div className={"PuzzleEditorMainPanel"}>
                    <Sidebar/>
                    <PuzzleComponent puzzle={this.state.selectedPuzzle} activeSolution={this.state.focusedSolution}/>
                    <SolutionSelector
                        solutions={isPuzzle ? this.state.selectedPuzzle.solutions : [] }
                        implementations={isPuzzle ? (DataLayer.puzzleImplementations.filter((imp)=>{
                            return imp.puzzleTemplateID === this.state.selectedPuzzle.id
                        }) ) : []}
                        onDeleteSolutionHandler={(e)=>{
                            if(isPuzzle){
                                this.state.selectedPuzzle.solutions = this.state.selectedPuzzle.solutions.filter((listEntry)=>{
                                    return listEntry !== e.solutionToDelete
                                })

                                this.forceUpdate();
                            }

                            // this.state.masterSolutionList = ;
                            // this.forceUpdate();
                        }}
                        onAddSolutionHandler={async (e)=>{
                            if(isPuzzle){
                                if(e.type==="solution"){
                                    this.state.selectedPuzzle.solutions.push( new Solution({name: e.newSolutionName}))
                                    this.forceUpdate();
                                }
                                else if(e.type==="implementation"){
                                    let newImp = await PuzzleImplementation.CreateNew({
                                        name: e.newImpName,
                                        puzzleTemplate: this.state.selectedPuzzle.id,
                                        puzzleTemplateID: this.state.selectedPuzzle.id,
                                    })
                                    this.forceUpdate();
                                }
                            }
                        }}
                        onFocusedSolutionHandler={(e) => {
                            if (e.focusedSolution) {
                                this.setState({focusedSolution: e.focusedSolution})
                            }
                        }}
                    />
                    <div className={"implementations"}>
                        <PuzzleImplementationsPreview activePuzzleTemplate={this.state.selectedPuzzle}/>

                    </div>
                </div>}
            </div>
        );
    }
}
