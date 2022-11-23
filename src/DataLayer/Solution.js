import * as icons from '@mdi/js';
import Icon from '@mdi/react'
import React, { Component } from 'react'

export class Solution{
    name;
    id;
    acceptableTagsPerSensor = {};
    relevantTags = [];
    constructor(json) {
        this.name = json.name;
        this.id = json.id;
        this.acceptableTagsPerSensor = json.acceptableTagsPerSensor || {};
        this.relevantSensors = json.relevantSensors || [];
    }

}