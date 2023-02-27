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
import SolutionSelector from "../Components/SolutionSelector/SolutionSelector";
import {DataLayer} from "../DataLayer/DataLayer";
import {loadData} from "../DataLayer/DataLoader";
import {Puzzle, Solution} from "../DataLayer/Solution";

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
                this.state.focusedSolution = undefined;
            }
        }else{
            this.state.focusedSolution = undefined;
        }
        if(this.state.selectedPuzzle && this.state.selectedPuzzle.solutions && this.state.focusedSolution === undefined){
            this.state.focusedSolution = this.state.selectedPuzzle.solutions[0];
        }
        let className = "PuzzleEditorPage"
        let isPuzzle = Boolean(this.state.selectedPuzzle );

        return (
            <div className={className} id={this.uid}>
               <div className={"PuzzleEditorToolbar"}>
                   {/*<Button onClick={()=>{loadData().then(()=>{this.forceUpdate()})}}>Reload</Button>*/}
                   {/*<Box className={"PuzzleSelectorControlWrapper"}>*/}
                       <FormControl className={"PuzzleSelectorControl"}>
                           <InputLabel id={this.uid + "PuzzleDropdownSelect"}>Active Puzzle:</InputLabel>
                           <Select
                               labelId={this.uid + "PuzzleDropdownSelect"}
                               value={this.state.selectedPuzzle}
                               label="Active Puzzle:"
                               onChange={(e)=>{
                                   if(e.target.value === 1){
                                       this.setState({addingPuzzle: true})
                                       return;
                                   }
                                   this.setState({selectedPuzzle: e.target.value})
                               }}
                           >
                               <MenuItem value={0}>None</MenuItem>
                               {DataLayer.puzzles.map((p)=>{
                                   return <MenuItem value={p}>{p.name}</MenuItem>
                               })}
                               <MenuItem value={1}>Add Puzzle</MenuItem>
                           </Select>
                           <Dialog onClose={()=>{
                               this.setState({addingPuzzle: false, newPuzzleName: ""})
                           }} open={this.state.addingPuzzle}>
                               <DialogTitle>New Puzzle:</DialogTitle>
                               <DialogContent>
                                   <DialogContentText>
                                       Name the new puzzle you wish to create:
                                   </DialogContentText>
                                   <TextField
                                       autoFocus
                                       margin="dense"
                                       fullWidth
                                       variant="standard"
                                       value={this.state.newPuzzleName} onChange={(e)=>{this.setState({newPuzzleName: e.target.value})}}/>
                               </DialogContent>
                               <DialogActions>
                                   <Button onClick={()=>{
                                       this.setState({addingPuzzle: false, newPuzzleName: ""})
                                   }}>Cancel</Button>
                                   <Button onClick={async ()=>{
                                       let newPuzzle = await Puzzle.CreateNew({name: this.state.newPuzzleName});

                                       this.setState({addingPuzzle: false, newPuzzleName: "", selectedPuzzle: newPuzzle})
                                   }}>Create</Button>
                               </DialogActions>
                           </Dialog>

                       </FormControl>
                   {/*</Box>*/}


               </div>
                <div className={"PuzzleEditorMainPanel"}>
                    <PuzzleComponent puzzle={this.state.selectedPuzzle} activeSolution={this.state.focusedSolution}/>
                    <SolutionSelector
                        solutions={isPuzzle ? this.state.selectedPuzzle.solutions : [] }
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
                        onAddSolutionHandler={(e)=>{
                            if(isPuzzle){
                                this.state.selectedPuzzle.solutions.push( new Solution({name: e.newSolutionName}))
                                this.forceUpdate();
                            }
                        }}
                        onFocusedSolutionHandler={(e)=>{
                            if(e.focusedSolution){
                                this.setState({focusedSolution: e.focusedSolution})
                            }
                        }}
                    />
                </div>
                <div className={"implementations"}>
                    <PuzzleImplementationsPreview  activePuzzleTemplate={this.state.selectedPuzzle}/>

                </div>
            </div>
        );
    }
}
