import {
    Card,
    Dialog, DialogContent,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    TextField
} from "@mui/material";
import React from "react";
import {GenerateUID} from "gardenspadejs/dist/general";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./SolutionSelector.scss"
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';

export default class SolutionSelector extends React.Component {
    constructor(props) {
        super(props);
        this.uid = GenerateUID("SolutionSelector");
        this.state = {
            //newSolutionName: "enter name",
            hoveredSolution: -1,
            showTime: true,
            duplicateNameError: false,
            deleteSolutionDisplay: false,
            solutionPendingDeletion: -1,
            focusedSolution: undefined
        }
    }



    render() {


        let className = "SolutionSelector"
        return (
            <Card className={className}>
                <div className={className}>
                    <Typography className = 'solutionsTitle' variant="h3" >Solutions </Typography>

                    <List>
                        <div className = "solutionsHolder" >
                            {this.props.solutions.map((sol, i) => {
                                let solutionClassName = "singleSol";
                                if(this.state.focusedSolution === sol){
                                    solutionClassName += " singleSol--focused"
                                }
                                return (<React.Fragment><ListItem
                                        key={i}
                                        className={solutionClassName}
                                        onClick={(e) => {
                                            this.setState({
                                                focusedSolution: sol
                                            })
                                            console.log("hello")

                                            this.props.onFocusedSolutionHandler({
                                                focusedSolution: sol
                                            })
                                        }}
                                    >

                                        <ListItemText className = "solutionText" primary={sol.name}/>
                                        <IconButton className='deleteSolutionButton'
                                                    onClick={(e) => {
                                                        this.setState({
                                                            deleteSolutionDisplay: true,
                                                            solutionPendingDeletion: sol
                                                        })
                                                        e.stopPropagation();
                                        }}><ClearIcon/></IconButton>
                                    </ListItem>
                                    </React.Fragment>
                                )
                            })}
                        </div>

                        <Dialog onClose={()=>{
                            this.setState({
                                deleteSolutionDisplay: false
                            })}
                        } open={this.state.deleteSolutionDisplay}>
                            <DialogTitle>Are you sure?</DialogTitle>
                            <ListItem>
                                <ListItemButton
                                    autoFocus
                                    onClick={() => {
                                        this.setState({
                                            deleteSolutionDisplay: false
                                        })
                                        this.props.onDeleteSolutionHandler({
                                            solutionToDelete: this.state.solutionPendingDeletion
                                        })
                                    }}
                                >
                                    <ListItemText className = 'displayAcceptText' primary="delete" />
                                </ListItemButton>
                            </ListItem>
                        </Dialog>

                        <ListItem className = 'addSolution' >

                            <ListItemText> New Solution </ListItemText>

                            <IconButton className="addSolutionButton" onClick={() => {

                                this.setState({
                                    newSolutionDisplay: true,
                                    solutionPendingAddition:this.state
                                })

                            }}><AddIcon/></IconButton>

                        </ListItem>

                        <Dialog maxWidth={"sm"} fullWidth={true} className ='newSolutionDialog' onClose={()=>{
                            this.setState({
                                newSolutionDisplay: false
                            })}
                        } open={this.state.newSolutionDisplay}>
                            <DialogContent>
                                <TextField className = "addSolutionTextField" error={this.state.duplicateNameError}
                                           helperText={this.state.duplicateNameError ? "duplicate Name" : null}
                                           label="new solution name"
                                           variant="outlined"
                                           value={this.state.newSolutionName}
                                           onChange={(e) => {this.setState({newSolutionName: e.target.value})
                                           }
                                           }/>
                                <ListItem>
                                    <ListItemButton
                                        autoFocus
                                        className = "AcceptDialogButton"
                                        onClick={() => {
                                            //check to see if they enter duplicate name
                                            let alreadyExists = this.props.solutions.some((e)=>{
                                                return e.name === this.state.newSolutionName
                                            })
                                            if(alreadyExists){
                                                this.setState({
                                                    duplicateNameError: true
                                                })
                                                return;
                                            }

                                            this.setState({
                                                newSolutionDisplay: false,
                                                duplicateNameError: false
                                            })
                                            //if (this.state.existingSolutionNames.includes(this.state.newSolutionName)) {
                                            //setError(true);
                                            //} else {
                                            //setError(false);
                                            this.props.onAddSolutionHandler({
                                                newSolutionName: this.state.newSolutionName,
                                            })
                                            // }

                                        }}
                                    >
                                        <ListItemText className = 'displayAcceptText' primary="Add" />
                                    </ListItemButton>
                                </ListItem>
                            </DialogContent>

                        </Dialog>

                    </List>
                </div>
            </Card>
        )
    }
}