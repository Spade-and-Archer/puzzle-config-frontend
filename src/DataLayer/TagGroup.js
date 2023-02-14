import * as icons from '@mdi/js';
import Icon from "@mdi/react";
import {getFirstDefined} from "gardenspadejs/dist/general.js";
import React from "react";
import {TagIcon} from "../Components/TagIcon/TagIcon";

export class TagGroup {
    name;
    id;
    iconName;
    icon;
    color;
    tags
    brandNew;
    constructor(json, brandNew=false) {
        this.loadFromJSON(json);
        this.brandNew = brandNew;
    }
    getIcon(props){
        let actualProps = Object.assign({
            size:1,
        }, props);
        return (<TagIcon {...actualProps} iconName={this.iconName  || null} color={this.color || null} />)
    }
    loadFromJSON(json){
        this.name = getFirstDefined(json.name, this.name);
        this.id = getFirstDefined(json._id, this.id);
        this.iconName = getFirstDefined(json.icon || undefined, this.iconName, "mdiCancel");
        this.color = getFirstDefined(json.color, this.color, "#424242")
        // @ts-ignore
        this.icon = icons[this.iconName];
        this.tags = getFirstDefined(json.tags, this.tags, []);
    }
    toJSON(){
        return {
            name: this.name,
            icon: this.iconName,
            color: this.color,
            tags: this.tags,
        }
    }
    async save(){
        if(process.env.REACT_NOSERVER){
            this.loadFromJSON (
                this.toJSON()
            );
            return;
        }
        let urlEndpoint = `http://localhost:4010/api/tagGroups/${this.id}`
        if(this.brandNew){
            urlEndpoint = `http://localhost:4010/api/tagGroups/`
        }
        this.loadFromJSON (await (await fetch( urlEndpoint, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(this.toJSON())
        })).json());
    }


}