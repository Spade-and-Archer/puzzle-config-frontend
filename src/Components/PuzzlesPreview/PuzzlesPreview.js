import {
    Button,
    Card,
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, FormControl,
    IconButton, InputLabel,
    List,
    ListItem, ListItemAvatar,
    ListItemButton,
    ListItemText, MenuItem, Select,
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
            focusedPuzzle: undefined,
            deletePuzzleDisplay: false,
            puzzlePendingDeletion: -1
        }
    }
    render(){
        let className = 'PuzzlePreview'
        return (
            <div className={className}>
                <Typography className = "PuzzleTitle" variant="h2">Puzzles</Typography>
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
                        <ListItem
                            key={i}
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
                            <ListItemText className = "puzzleText" primary={puzzle.name}/>
                            <IconButton className='deletePuzzleButton'
                                    onClick={(e) => {
                                        this.setState({
                                            deletePuzzleDisplay: true,
                                            puzzlePendingDeletion: puzzle
                                        })
                                        e.stopPropagation();
                            }}><ClearIcon/></IconButton>
                        </ListItem>
                    )
                })}
            </div>
        )
    }

}