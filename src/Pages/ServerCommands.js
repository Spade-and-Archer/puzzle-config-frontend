import {Button, TextField} from "@mui/material";
import React from "react";
import {GenerateUID} from "gardenspadejs/dist/general";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./TestBedPage.scss";
import SolutionSelector from "../Components/SolutionSelector/SolutionSelector";

export default class ServerCommandsPage extends React.Component {
    constructor(props) {
        super(props);
        this.uid = GenerateUID("ServerCommands");
        this.state = {
            curReaderToSet: "",
            curTagToSet: "",
            currentImpState: {},
            currentReaderStates: {},
        }
    }

    render() {
        let className = "ServerCommands"
        return (
            <div className={className} id={this.uid}>
                <Typography>Sol Selector 1</Typography>
                <div className={"SendReaderStateCommand"}>
                    <TextField value={this.state.curReaderToSet} onChange={(e)=>{
                        this.setState({
                            curReaderToSet : e.target.value,
                        })
                    }} label={"Reader"}/>
                    <TextField value={this.state.curTagToSet}onChange={(e)=>{
                        this.setState({
                            curTagToSet : e.target.value,
                        })
                    }} label={"Tag"}/>
                    <Button onClick={()=>{
                        fetch("http://localhost:4010/api/updateReader", {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                                // 'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            redirect: 'follow', // manual, *follow, error
                            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                            body: JSON.stringify({
                                readerID: this.state.curReaderToSet,
                                tagID: this.state.curTagToSet,
                            })
                        }).then(async (r)=>{
                            let response =  await r.json()
                            this.setState({currentImpState : response.impStates,
                            currentReaderStates: response.readerStates})
                            console.log(r);
                        })
                    }}>Send</Button>
                </div>
                <Typography> Reader states:</Typography>
                <div className={"curReaderStates"}>
                    {Object.keys(this.state.currentReaderStates).map((reader)=>{
                        return <div className={"SingleReaderState"}>
                            <Typography> {reader} : {this.state.currentReaderStates[reader]}</Typography>
                        </div>
                    })}

                </div>

                <Typography>Puzzle states:</Typography>
                <div className={"curImplementationStates"}>
                    {Object.keys(this.state.currentImpState).map((imp)=>{
                        return <div className={"SingleImpState"}>
                            <Typography> {this.state.currentImpState[imp].name} : {this.state.currentImpState[imp].solved ? "solved" : "unsolved"}</Typography>
                        </div>
                    })}

                </div>


            </div>
        );
    }
}
