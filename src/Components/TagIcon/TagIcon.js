import * as icons from "@mdi/js";
import Icon from "@mdi/react";
import "./TagIcon.scss"
import React, { useState} from "react";

export function TagIcon(props){
    let size = props.size || 1;
    let paddingPercent = 0.35;
    let sizeOfIcon = size * 1.5;

    return <div className={"TagIcon " + (props.className || "")} style={{
        //padding: `${padding}rem`,
        background: props.color || "#282c34",
        width: `${sizeOfIcon}rem`,
        height: `${sizeOfIcon}rem`
    }}>
        <Icon path={icons[props.iconName]} size={props.size || 1} style={{transform: `scale(${1 - paddingPercent})`}} className={"TagIconSVG"} />
    </div>
}