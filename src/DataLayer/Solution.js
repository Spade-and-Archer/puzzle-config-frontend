import React from 'react'
import {DataLayer} from "./DataLayer.js";

export class Solution{
    name;
    id;
    acceptableTagsPerSensor = {};
    constructor(json) {
        this.name = json.name;
        this.id = json.id;
        console.log(json)
        if(json.perReaderRequirements){
            this.acceptableTagsPerSensor = {};
            Object.keys(json.perReaderRequirements).forEach((reader)=>{
                this.acceptableTagsPerSensor[reader] = json.perReaderRequirements[reader].oneOf || [];
                this.acceptableTagsPerSensor[reader] = this.acceptableTagsPerSensor[reader].map((tag)=>{
                    if(tag instanceof String || typeof tag === "string"){
                        let realTag =  DataLayer.tags.reduce((a, b) => {
                            if (a && a.id === tag) {
                                return a;
                            }
                            if (b && b.id === tag) {
                                return b;
                            }
                            return undefined;
                        });
                        if(realTag){
                            console.log("converted tag");
                            return realTag;
                        }
                        else{

                            console.log("failed to convert tag");
                        }

                    }
                    return tag;
                })
                console.log(this.acceptableTagsPerSensor[reader])
            })
        }
        else{
            this.acceptableTagsPerSensor = json.acceptableTagsPerSensor || {};
        }

    }
}

export class Puzzle{
    id;
    solutions;
    name;
    description;
    readerNamesBySlotID;
    constructor(json) {
        this.name = json.name;
        this.id = json.id;
        this.solutions = (json.solutions || []).map((sol)=>{
            return new Solution(sol);
        })
        this.readerNamesBySlotID = json.readerNamesBySlotID;
    }
}