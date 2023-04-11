import {
    Button,
    Card,
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText, Tab, Tabs,
    TextField
} from "@mui/material";
import React from "react";
import {GenerateUID} from "gardenspadejs/dist/general";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./SolutionSelector.scss"
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import {DataLayer} from "../../DataLayer/DataLayer";

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
            newSolutionDisplay : false,
            focusedSolution: undefined,
            newImpDisplay: false,

            selectedTab: "solutions",
        }
    }



    render() {



        let className = "SolutionSelector"
        let tabOrder = ["solutions", "implementations"]
        let curTabToNumber = tabOrder.indexOf(this.state.selectedTab)
        console.log("Tag groups to render in sidebar:", DataLayer.tagGroups)

        return (

            <div className={className}>
                <div className={"SidebarTabs"}>
                    <Tabs onChange={(e, curTab)=>{
                        this.setState({selectedTab: curTab});
                    }
                    }  value={this.state.selectedTab} aria-label="lab API tabs example">
                        <Tab label="Solutions" value="solutions" />
                        <Tab label="Implementations" value="implementations" />
                    </Tabs>
                </div>

                {this.state.selectedTab === "solutions" && (
                <List className={"solutionSelectorBodyList solutionSelectorBodyList--solutionList"}>
                    <div className = "solutionsHolder" >
                        {this.props.solutions.map((sol, i) => {
                            let solutionClassName = "singleSol";
                            if(this.state.focusedSolution === sol){
                                solutionClassName += " singleSol--focused"
                            }
                            return (<ListItem
                                    key={"sol-" + i}
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
                            )
                        })}
                    </div>



                    <ListItem className = 'addSolution' >

                        <ListItemText> New Solution </ListItemText>

                        <IconButton className="addSolutionButton" onClick={() => {

                            this.setState({
                                newSolutionDisplay: true,
                                solutionPendingAddition:this.state
                            })

                        }}><AddIcon/></IconButton>

                    </ListItem>

                    <Dialog maxWidth={"sm"} fullWidth={true} className ='newSolutionDialog'
                            onClose={()=>{this.setState({newSolutionDisplay: false})}}
                            open={this.state.newSolutionDisplay}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    // trigger the Accept DialogButton
                                    document.querySelector('.AcceptDialogButton.AcceptDialogButton--solution').click(e);
                                    e.preventDefault();
                                }
                            }}
                    >

                            <DialogContentText>
                                Name the new Puzzle:
                            </DialogContentText>
                        <DialogContent>
                            <TextField className = "addSolutionTextField"
                                       error={this.state.duplicateNameError}
                                       helperText={this.state.duplicateNameError ? "duplicate Name" : null}
                                       margin='dense'
                                       fullWidth
                                       varient='standard'
                                       value={this.state.newSolutionName}
                                       onChange={(e) => {this.setState({newSolutionName: e.target.value})}}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                style={{ color: 'darkgrey' }}
                                className = 'CancelDialogButton'
                                onClick={()=>{
                                    this.setState({newSolutionDisplay:false, newSolutionName: ""})}
                                }>Cancel</Button>
                            <Button
                                autoFocus
                                className = "AcceptDialogButton AcceptDialogButton--solution"
                                onClick={(e) => {
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
                                    if(!this.state.newSolutionName){
                                        this.setState({
                                            duplicateNameError:true
                                        })
                                        return;
                                    }

                                    this.setState({
                                        newSolutionDisplay: false,
                                        duplicateNameError: false
                                    })

                                    this.props.onAddSolutionHandler({
                                        newSolutionName: this.state.newSolutionName,
                                        type: "solution"
                                    })
                                    if(e.preventDefault){
                                        e.preventDefault();
                                    }
                                }}
                            >Add</Button>
                        </DialogActions>

                    </Dialog>

                </List>
                )}

                {/*
                ///////////////////////////////////////////////////////////////////
                IMPLEMENTATIONS
                ///////////////////////////////////////////////////////////////////
                */}
                {this.state.selectedTab === "implementations" && (
                <List className="solutionSelectorBodyList solutionSelectorBodyList--implementationsList">
                    <div className = "solutionsHolder" >
                        {this.props.implementations.map((imp, i) => {
                            let solutionClassName = "singleSol singleImp";
                            if(this.state.focusedSolution === imp){
                                solutionClassName += " singleSol--focused"
                            }
                            return (<ListItem
                                    key={"imp-" + i}
                                    className={solutionClassName}
                                    onClick={(e) => {
                                        this.setState({
                                            focusedSolution: imp
                                        })
                                        console.log("hello")

                                        this.props.onFocusedSolutionHandler({
                                            focusedSolution: imp
                                        })
                                    }}
                                >

                                    <ListItemText className = "solutionText" primary={imp.name}/>
                                    <IconButton className='deleteSolutionButton'
                                                onClick={(e) => {
                                                    this.setState({
                                                        deleteSolutionDisplay: true,
                                                        solutionPendingDeletion: imp
                                                    })
                                                    e.stopPropagation();
                                                }}><ClearIcon/></IconButton>
                                </ListItem>
                            )
                        })}
                    </div>
                    <ListItem className = 'addSolution addImp' >

                        <ListItemText> New Implementation </ListItemText>

                        <IconButton className="addSolutionButton" onClick={() => {

                            this.setState({
                                newImpDisplay: true
                            })

                        }}><AddIcon/></IconButton>

                    </ListItem>

                    <Dialog maxWidth={"sm"} fullWidth={true} className ='newSolutionDialog newImpDialog' onClose={()=>{
                        this.setState({
                            newImpDisplay: false
                        })}
                    } open={this.state.newImpDisplay}>
                        <DialogContent>
                            <TextField className = "addSolutionTextField" error={this.state.duplicateNameError}
                                       helperText={this.state.duplicateNameError ? "duplicate Name" : null}
                                       label="new implementation name"
                                       variant="outlined"
                                       value={this.state.newImpName}
                                       onChange={(e) => {this.setState({newImpName: e.target.value})
                                       }
                                       }/>
                            <ListItem>
                                <ListItemButton
                                    autoFocus
                                    className = "AcceptDialogButton AcceptDialogButton--implementation"
                                    onClick={() => {
                                        this.setState({
                                            newImpDisplay: false,
                                            duplicateNameError: false
                                        })
                                        //if (this.state.existingSolutionNames.includes(this.state.newSolutionName)) {
                                        //setError(true);
                                        //} else {
                                        //setError(false);
                                        this.props.onAddSolutionHandler({
                                            newImpName: this.state.newImpName,
                                            type: "implementation"
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
                    ) }

                <Dialog
                    onClose={()=>{this.setState({deleteSolutionDisplay: false})}}
                    open={this.state.deleteSolutionDisplay}
                    onKeyDown={(e) => {
                        //e.preventDefault();
                        if (e.key === 'Enter') {
                            // trigger the Accept DialogButton
                            document.querySelector('.deleteSolutionButtonFinal').click();
                            e.preventDefault();
                        }
                    }}
                >
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogActions>
                        <Button
                            style = {{color: 'darkgrey'}}
                            className = 'CancelDialogButton'
                            onClick={()=>{
                                this.setState({deleteSolutionDisplay:false})}
                            }>Cancel</Button>
                        <Button
                            style = {{color: "red"}}
                            className = 'deleteSolutionButtonFinal'
                            onClick={() => {
                                this.setState({
                                    deleteSolutionDisplay: false
                                })
                                let options  = {};

                                if(this.state.solutionPendingDeletion && this.state.solutionPendingDeletion.puzzleTemplateID){
                                    options.implementationToDelete = this.state.solutionPendingDeletion
                                }
                                else if(this.state.solutionPendingDeletion){
                                    options.solutionToDelete = this.state.solutionPendingDeletion;
                                }
                                this.props.onDeleteSolutionHandler(options);
                            }}
                        >delete</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}