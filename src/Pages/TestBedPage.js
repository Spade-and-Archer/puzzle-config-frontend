import React from "react";
import {GenerateUID} from "gardenspadejs/dist/general";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./TestBedPage.scss";

export default class TestBedPage extends React.Component {
    constructor(props) {
        super(props);
        this.uid = GenerateUID("TestBedPage");
        this.state = {}
    }

    render() {
        let className = "TestBedPage"
        return (
            <div className={className} id={this.uid}>

            </div>
        );
    }
}
