import * as icons from '@mdi/js';
import Icon from "@mdi/react";
import React from "react";

export class Tag{
    name;
    id;
    iconName;
    icon;

    constructor(json) {
        this.name = json.name;
        this.id = json.id;
        this.iconName = json.iconName;
        // @ts-ignore
        this.icon = icons[this.iconName];
    }
    getIcon(props){
        let actualProps = Object.assign({
            size:1,
            path:  icons[this.iconName]
        }, props);
        return (<Icon {...actualProps} />)

    }


}