import {Button, Link, Typography} from "@mui/material";
import {Route} from "react-router-dom";
import AndyComponent from "./AndyComponent.js";
import PuzzleComponent from "./Components/Puzzle/PuzzleComponent.js";
import SensorConfigPreview from "./Components/SensorConfigPreview/SensorConfigPreview";
import logo from './logo.svg';
import './App.css';
import React from "react";
import {DataLayer} from "./DataLayer/DataLayer.js";
import PuzzleEditorPage from "./Pages/PuzzleEditorPage.js";
import ServerCommandsPage from "./Pages/ServerCommands.js";
import TestBedPage from "./Pages/TestBedPage";

let dataLayer = DataLayer;
export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
        };
    }
    componentWillUnmount() {

    }

    /**
     * This does bullshit
     * @param {Date} arg1
     * @param {number} arg2
     * @returns {Date}
     */
    customClassMethod(arg1, arg2){
        console.log(arg1.getUTCDate());
        return arg1;
    }
    render() {
        let funct = (counter, arg2, arg3)=>{
            return -1;
        }
        funct(1, 2, 3);
        return (
            <div className="App" onClick={(e)=>{
                this.setState({
                    x: e.pageX,
                    y: e.pageY
                })
            }}>
                <Route path="/puzzleEditor" exact>
                    <PuzzleEditorPage/>
                </Route>
                <Route path="/" exact>
                    <PuzzleEditorPage/>
                </Route>
                <Route path="/serverCommands" exact>
                    <ServerCommandsPage/>
                </Route>
                <Route path="/settings" exact>
                    <PuzzleComponent/>
                </Route>
                <Route path="/andysTest" exact>
                    {
                        dataLayer.sensors.map((s, i)=>{
                            return  <SensorConfigPreview sensor={s} key={i} />
                        })
                    }
                    <SensorConfigPreview sensor={ dataLayer.sensors[0]} tags={[...dataLayer.tags]} />
                </Route>
                <Route path="/typography" exact>
                    <Typography variant={"h1"} className={"red-text"}>This is some type</Typography>
                    <Typography variant={"h2"}>This is some type</Typography>
                    <Typography variant={"h3"}>This is some type</Typography>
                    <Typography variant={"h4"}>This is some type</Typography>
                </Route>
                <Route path="/test" exact>
                    <TestBedPage/>
                </Route>


                {/*<div className="App-header">*/}
                {/*    /!*<img src={logo} className="App-logo" alt="logo"/>*!/*/}
                {/*    /!*<Link to={"/settings"}>This is a link to settings</Link>*!/*/}
                {/*    /!*<Link to={"/settings"}>This is a link to settings</Link>*!/*/}
                {/*  */}
                {/*    */}
                {/*    /!*<div className={"testingDiv"} style={{left: this.state.x, top:  this.state.y}}>*!/*/}
                {/*    */}
                {/*    /!*    /!*<Typography variant={"h1"} className={"red-text"}>This is some type</Typography>*!/*!/*/}
                {/*    /!*    /!*<Typography variant={"h2"}>This is some type</Typography>*!/*!/*/}
                {/*    /!*    /!*<Typography variant={"h3"}>This is some type</Typography>*!/*!/*/}
                {/*    /!*    /!*<Typography variant={"h4"}>This is some type</Typography>*!/*!/*/}
                {/*    /!*</div>*!/*/}
                {/*    /!*<div className={"customClassA"}>*!/*/}
                {/*    /!*    <h1>src/App.js</h1>*!/*/}
                {/*    /!*    <h1 id={"VerySpecificID"} className={"greenHeader"}>src/App.js</h1>*!/*/}
                {/*    /!*    <h1 id={"VerySpecificID2"} className={"greenHeader"}>src/App.js</h1>*!/*/}
                {/*    /!*</div>*!/*/}
                {/*    /!*<div className={"customClassB"}>*!/*/}
                {/*    /!*    <h1>src/App.js</h1>*!/*/}
                {/*    /!*</div>*!/*/}
                {/*    <a*/}
                {/*        className="App-link"*/}
                {/*        href="/test"*/}
                {/*        rel="noopener noreferrer"*/}
                {/*    >*/}
                {/*        /!* eslint-disable-next-line react/prop-types *!/*/}
                {/*        {"Sam's test bed"}*/}
                {/*    </a>*/}
                {/*<a*/}
                {/*    className="App-link"*/}
                {/*    href="/andystest"*/}
                {/*    rel="noopener noreferrer"*/}
                {/*>*/}
                {/*    /!* eslint-disable-next-line react/prop-types *!/*/}
                {/*    {"Andy's test bed"}*/}
                {/*</a>*/}
                {/*<a*/}
                {/*    className="App-link"*/}
                {/*    href="/puzzleEditor"*/}
                {/*    rel="noopener noreferrer"*/}
                {/*>*/}
                {/*    /!* eslint-disable-next-line react/prop-types *!/*/}
                {/*    {"puzzle Editor"}*/}
                {/*</a>*/}
                {/*<a*/}
                {/*    className="App-link"*/}
                {/*    href="/typography"*/}
                {/*    rel="noopener noreferrer"*/}
                {/*>*/}
                {/*    /!* eslint-disable-next-line react/prop-types *!/*/}
                {/*    {"Typefaces"}*/}
                {/*</a>*/}

                {/* */}
                {/*</div>*/}
            </div>
        );
    }

}

