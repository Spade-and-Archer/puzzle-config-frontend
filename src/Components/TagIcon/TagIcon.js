import * as icons from "@mdi/js";
import Icon from "@mdi/react";
import "./TagIcon.scss"
import React, { useState} from "react";

export const  TagIcon = React.forwardRef((props, ref) => {
    let size = props.size || 1;
    let paddingPercent = 0.35;
    let sizeOfIcon = size * 1.5;
    let forwardedProps = Object.assign({}, props);
    delete forwardedProps.size;
    delete forwardedProps.iconName;
    delete forwardedProps.color;
    let className = "TagIcon " + (props.className || "")
    if(forwardedProps.className){
        className += " " + forwardedProps.className
    }
    delete forwardedProps.className;
    let style = {
        //padding: `${padding}rem`,
        background: props.color || "#282c34",
        width: `${sizeOfIcon}rem`,
        height: `${sizeOfIcon}rem`
    }
    if(forwardedProps.style){
        Object.assign(style, forwardedProps.style);
    }
    delete forwardedProps.style;
    return <div {...forwardedProps} className={className} ref={ref} style={ style} >
        <Icon path={icons[props.iconName]} size={props.size || 1} style={{transform: `scale(${1 - paddingPercent})`}} className={"TagIconSVG"} />
    </div>
})