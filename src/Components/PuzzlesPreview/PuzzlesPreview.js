import {
    Button,
    Card,
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, FormControl,
    IconButton, InputLabel,
    List,
    ListItem, ListItemAvatar,
    ListItemButton,
    ListItemText, Menu, MenuItem, Select,
    TextField
} from "@mui/material";
import React from "react";
import {GenerateUID} from "gardenspadejs/dist/general";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./PuzzlesPreview.scss"
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import PuzzleComponent from "../Puzzle/PuzzleComponent";
import {DataLayer} from "../../DataLayer/DataLayer";
import {Puzzle} from "../../DataLayer/Solution";

export default class PuzzlesPreview extends React.Component{
    constructor(props){
        super(props);
        this.uid = GenerateUID("PuzzlesPreview")
        this.state = {
            hoveredPuzzle: -1,
            focusedPuzzle: 0,
            deletePuzzleDisplay: false,
            addingPuzzle: false,
            puzzlePendingDeletion: -1,
            newPuzzleName: ""
        }
    }
    render(){
        console.log("rendering with puzzles:", this.props.puzzles, "and focused:", this.state.focusedPuzzle);

        let className = 'PuzzlePreview'
        return (
            <div className={className}>
                <FormControl className={"PuzzleSelectorControl"}>
                    <InputLabel className = {"puzzleInputLabel"} id={this.uid + "PuzzleDropDownSelect"}>Active Puzzle:</InputLabel>

                    <Select
                        className={"PuzzleSelectDropdownPreview"}
                        labelId = {this.uid + "puzzleDropdownSelect"}
                        value={this.state.focusedPuzzle}
                        label="Active Puzzle:"
                        onChange={(e)=>{
                            if(e.target.value === 1){
                                this.setState({addingPuzzle: true})
                                return;
                            }
                            this.setState({focusedPuzzle: e.target.value})
                        }}
                    >
                        <MenuItem value={0} onClick={()=>{
                            this.setState({
                                focusedPuzzle: undefined
                            })
                            this.props.onFocusedPuzzleHandler({focusedPuzzle: undefined})
                        }
                        }>None
                        </MenuItem>
                        {this.props.puzzles.map((puzzle, i) =>{
                            let puzzleClassName = 'singlePuzzle';
                            if(this.state.focusedPuzzle === puzzle){
                                puzzleClassName += " singlePuzzle--focused"
                            }
                            let scaleFactor = 0.6;
                            if(Object.keys(puzzle.readerNamesBySlotID) .length > 4){
                                scaleFactor = 0.4;
                            }
                            if(Object.keys(puzzle.readerNamesBySlotID) .length  > 6){
                                scaleFactor = 0.3;
                            }
                            return(
                                <MenuItem
                                    key={i}
                                    value={puzzle}
                                    className={puzzleClassName}
                                    onClick={(e) =>{
                                        this.setState({
                                            focusedPuzzle: puzzle
                                        })
                                        this.props.onFocusedPuzzleHandler({focusedPuzzle: puzzle})
                                    }}
                                >
                                    <ListItemAvatar className={"PuzzlePreviewAvatar"} style={{"--scaleFactor" : scaleFactor}}>
                                        {puzzle.solutions[0] && <PuzzleComponent previewMode={true} puzzle={puzzle} activeSolution={puzzle.solutions[0]}/>}
                                    </ListItemAvatar>
                                    <ListItemText className = "puzzleText" primary= {`Puzzle Name: ${puzzle.name}`}
                                        secondary={
                                            <React.Fragment>
                                                <Typography component="span" className = 'numOfImps' >Number of Implementations: {Math.round(Math.random() * 10)}</Typography>
                                                <br/>
                                                <Typography component="span" className = 'numOfSols' >Number of Solutions: {Math.round(Math.random() * 10)}</Typography>
                                            </React.Fragment>
                                        }
                                    />
                                    <IconButton className='deletePuzzleButton'
                                            onClick={(e) => {
                                                this.setState({
                                                    deletePuzzleDisplay: true,
                                                    puzzlePendingDeletion: puzzle
                                                })
                                                e.stopPropagation();
                                    }}><ClearIcon/></IconButton>
                                </MenuItem>
                            )
                        })}

                        <MenuItem value={1}>Add Puzzle</MenuItem>
                    </Select>

                    <Dialog className = "deletePuzzlePopup"
                        onClose={()=>{
                        this.setState({
                            deletePuzzleDisplay: false
                        })}
                    } open={this.state.deletePuzzleDisplay}>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogActions>
                            <Button
                                className = 'CancelDeletePuzzleButton'
                                onClick={()=>{this.setState({deletePuzzleDisplay:false})
                                }}
                            >Cancel</Button>
                            <Button
                                autoFocus
                                onClick={() => {
                                    this.setState({
                                        deletePuzzleDisplay: false
                                    })
                                    this.props.onDeletePuzzleHandler({
                                        puzzleToDelete: this.state.puzzlePendingDeletion
                                    })
                                }}>
                            Delete</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        className = "addPuzzlePopup"
                        onClose={()=>{
                        this.setState({addingPuzzle: false, newPuzzleName:""})
                    }} open={this.state.addingPuzzle}>
                        <DialogTitle>New Puzzle:</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Name the new Puzzle:
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin='dense'
                                fullWidth
                                varient='standard'
                                value={this.state.newPuzzleName}
                                onChange={(e)=>{this.setState({newPuzzleName: e.target.value})}}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                className = 'CancelAddPuzzleButton'
                                onClick={()=>{
                                this.setState({addingPuzzle:false, newPuzzleName: ""})}
                            }>Cancel</Button>
                            <Button
                                className ='AddPuzzleButton'
                                onClick={async () => {
                                    let newPuzzle = await this.props.onAddPuzzleHandler({newPuzzleName: this.state.newPuzzleName,})
                                    console.log("Focusing puzzle:", newPuzzle);
                                    this.setState({addingPuzzle:false, newPuzzleName:"", focusedPuzzle: newPuzzle})
                                }}>Create</Button>
                        </DialogActions>
                    </Dialog>
                </FormControl>
            </div>
        )
    }

}