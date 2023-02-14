import React from "react";
import {GenerateUID} from "gardenspadejs/dist/general";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./TestBedPage.scss";
import SolutionSelector from "../Components/SolutionSelector/SolutionSelector";

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
            ]
        }
    }

    render() {
        console.log(this.state.masterSolutionList);
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
            </div>
        );
    }
}
