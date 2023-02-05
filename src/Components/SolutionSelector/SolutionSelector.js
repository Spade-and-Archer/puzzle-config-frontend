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
            hoveredSolution: -1,
            showTime: true,
        }
    }
    render() {
        let className = "SolutionSelector"
        return (
            <Card>
                {(new Date(Date.now())).getHours()}:{(new Date(Date.now())).getMinutes()}:{(new Date(Date.now())).getSeconds()}
                <div className={className} id={this.uid} style={{
                    /* color: purple; */
                    backgroundColor: "aquamarine",

                }}

                    onClick={
                        (a, b, c)=>{

                             this.setState({
                                showTime: !this.state.showTime
                            })
                        }
                    }
                >
                    <List>
                        {this.props.solutions.map((sol, i)=>{
                            return <ListItem
                                key={i}
                                className={"SingleSol"}
                                onClick={()=>{
                                    this.props.onDeleteSolutionHandler({
                                        solutionToDelete: sol
                                    });
                                    }
                                }
                                onPointerMove={()=>{
                                    this.setState({hoveredSolution: i})
                                }
                                }
                                style={{
                                    background: this.state.hoveredSolution === i ? "gray" : ""
                                }}
                            >
                                <ListItemText primary={sol.name} ></ListItemText>
                                <IconButton onClick={()=>{
                                    this.props.onDeleteSolutionHandler({
                                        solutionToDelete: sol
                                    })}}>x</IconButton>
                            </ListItem>
                        })}
                    </List>
                </div>
            </Card>
        );
    }
}