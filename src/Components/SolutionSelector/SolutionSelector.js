import {Card, IconButton, List, ListItem, ListItemText} from "@mui/material";
import React from "react";
import {GenerateUID} from "gardenspadejs/dist/general";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./SolutionSelector.scss";

export default class SolutionSelector extends React.Component {
    constructor(props) {
        super(props);
        this.uid = GenerateUID("SolutionSelector");
        this.state = {
            hoveredSolution: -1
        }
    }

    render() {
        let className = "SolutionSelector"
        return (
            <Card>
                <div className={className} id={this.uid} style={{
                    /* color: purple; */
                    backgroundColor: "aquamarine",

                }}>
                    <List>
                        {this.props.solutions.map((sol, i)=>{
                            return singleSolutionRenderMethod(this, sol, i);
                            // let solutionWeAreWorkingOn
                            // return <ListItem onClick={()=>{
                            //     this.props.onDeleteSolutionHandler({
                            //         solutionToDelete: sol
                            //     });
                            // }
                            // }>
                            //     <ListItemText primary={sol.name} ></ListItemText>
                            // </ListItem>
                        })}
                    </List>
                </div>
            </Card>
        );
    }
}

function singleSolutionRenderMethod(self, sol, i){
    return <ListItem
        className={"SingleSol"}
        onClick={()=>{
        // self.props.onDeleteSolutionHandler({
        //     solutionToDelete: sol
        // });


    }

    }
        onPointerMove={()=>{
            self.setState({hoveredSolution: i})
        }
        }
                     style={{
                         background: self.state.hoveredSolution === i ? "gray" : ""
                     }}
    >
        <ListItemText primary={sol.name} ></ListItemText>
        <IconButton onClick={()=>{
            self.props.onDeleteSolutionHandler({
                solutionToDelete: sol
            })}}>x</IconButton>
    </ListItem>
}