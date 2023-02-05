import * as icons from '@mdi/js';
import Icon from '@mdi/react'
import React, { Component } from 'react'

export class Solution{
    name;
    id;
    acceptableTagsPerSensor = {};
    constructor(json) {
        this.name = json.name;
        this.id = json.id;
        this.acceptableTagsPerSensor = json.acceptableTagsPerSensor || {};
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