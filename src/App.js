import {Button, Typography} from "@mui/material";
import {Link, Route} from "react-router-dom";
import AndyComponent from "./AndyComponent.js";
import Puzzle from "./Components/Puzzle/Puzzle.js";
import SensorConfigPreview from "./Components/SensorConfigPreview/SensorConfigPreview";
import logo from './logo.svg';
import './App.css';
import React from "react";
import {DataLayer} from "./DataLayer/DataLayer.js";

let dataLayer = DataLayer;
export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
        };
    }
    componentDidMount() {
        fetch({
            url: "https://google.com",
            method: "GET"
        }).then((r)=>{

            console.log(r)
            console.log(r.body.json())
        });
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
                <div className="App-header">
                   {/*// <img src={logo} className="App-logo" alt="logo"/>*/}
                    <Link to={"/settings"}>This is a link to settings</Link>
                    <Link to={"/settings"}>This is a link to settings</Link>
                    {/*{*/}
                    {/*    dataLayer.sensors.map((s)=>{*/}
                    {/*        return  <SensorConfigPreview sensor={s} />*/}
                    {/*    })*/}
                    {/*}*/}
                    {/*<SensorConfigPreview sensor={ dataLayer.sensors[0]} tags={[...dataLayer.tags]} />*/}

                    {/*<div className={"testingDiv"} style={{left: this.state.x, top:  this.state.y}}>*/}

                    {/*    /!*<Typography variant={"h1"} className={"red-text"}>This is some type</Typography>*!/*/}
                    {/*    /!*<Typography variant={"h2"}>This is some type</Typography>*!/*/}
                    {/*    /!*<Typography variant={"h3"}>This is some type</Typography>*!/*/}
                    {/*    /!*<Typography variant={"h4"}>This is some type</Typography>*!/*/}
                    {/*</div>*/}
                    {/*<div className={"customClassA"}>*/}
                    {/*    <h1>src/App.js</h1>*/}
                    {/*    <h1 id={"VerySpecificID"} className={"greenHeader"}>src/App.js</h1>*/}
                    {/*    <h1 id={"VerySpecificID2"} className={"greenHeader"}>src/App.js</h1>*/}
                    {/*</div>*/}
                    {/*<div className={"customClassB"}>*/}
                    {/*    <h1>src/App.js</h1>*/}
                    {/*</div>*/}
                    {/*<a*/}
                    {/*    className="App-link"*/}
                    {/*    href="https://reactjs.org"*/}
                    {/*    target="_blank"*/}
                    {/*    rel="noopener noreferrer"*/}
                    {/*>*/}
                    {/*    /!* eslint-disable-next-line react/prop-types *!/*/}
                    {/*    {this.props.title}*/}
                    {/*</a>*/}


                </div>
                <Route path="/settings" exact>
                    <Puzzle/>
                </Route>
                <Route path="/test" exact>
                    <p>
                        This is the test page
                    </p>
                </Route>
            </div>
        );
    }

}

