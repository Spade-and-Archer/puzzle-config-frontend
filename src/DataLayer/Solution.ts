import {getFirstDefined} from "gardenspadejs/dist/general.js";
import {DataLayer} from "./DataLayer.js";
import {TagGroup} from "./TagGroup";

export class Solution{
    name;
    id;
    acceptableTagsPerSensor = {};
    constructor(json) {
        this.name = json.name || json.solutionName;
        this.id = json.id;
        console.log(json)
        if(json.perReaderRequirements){
            this.acceptableTagsPerSensor = {};
            Object.keys(json.perReaderRequirements).forEach((reader)=>{
                this.acceptableTagsPerSensor[reader] = json.perReaderRequirements[reader].oneOf || [];
                let needSaving = false;
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
                        }, undefined);
                        if(realTag){
                            console.log(`converted tag ${tag}`);
                            return realTag;
                        }
                        realTag =  DataLayer.tagGroups.reduce((a, b) => {
                            if (a && a.id === tag) {
                                return a;
                            }
                            if (b && b.id === tag) {
                                return b;
                            }
                            return undefined;
                        }, undefined);
                        if(realTag){
                            console.log(`converted tag ${tag}`);
                            return realTag;
                        }
                        realTag =  DataLayer.tagGroups.reduce((a, b) => {
                            if (a && a.tags.length === 1 && a.tags[0] === tag) {
                                return a;
                            }
                            if (b && b.tags.length === 1 && b.tags[0] === tag) {
                                return b;
                            }
                            return undefined;
                        }, undefined);
                        if(realTag){
                            if(realTag.brandNew){
                                return realTag;
                            }
                            if(window.confirm(`tag ${tag} is not valid, but it exists on it's own in the group ${realTag.name}, do you want to use this group instead? If you choose not to, we will ask about creating a new group.`)){
                                return realTag;
                            }


                        }
                        console.log(`failed to conver tag  ${tag}`);
                        let newTagGroup =  new TagGroup({
                            iconName: "questionMark",
                            name: tag,
                            tags: [tag]
                        }, true)
                        if(window.confirm(`tag ${tag} is not valid, but we can automatically create a tag group for it. Hit okay for us to create a tag group. Hit cancel and we will simply remove this tag`)){
                            DataLayer.tags.push(newTagGroup);
                            newTagGroup.save();
                            needSaving = true;
                            return newTagGroup;
                        }
                        else{
                            needSaving = true;
                            return undefined;
                        }
                    }
                    return tag;
                })
                this.acceptableTagsPerSensor[reader] = this.acceptableTagsPerSensor[reader].filter((tag)=>{
                    return tag !== undefined;
                })
                if(needSaving){
                    setTimeout(()=>{
                        DataLayer.puzzles.forEach((p)=>{
                            if(p.solutions.includes(this)){
                                p.save();
                            }
                        })
                    }, 1000)
                }
                console.log(this.acceptableTagsPerSensor[reader])
            })
        }
        else{
            this.acceptableTagsPerSensor = json.acceptableTagsPerSensor || {};
        }

    }
    toJSON(){
        let perReaderRequirements = {};
        Object.keys(this.acceptableTagsPerSensor).forEach((sensor)=>{
            perReaderRequirements[sensor] = {
                oneOf: this.acceptableTagsPerSensor[sensor].map((tagObj)=>{
                    return tagObj.id || tagObj.toString();
                })
            }
        })
        return {
            name: this.name,
            perReaderRequirements: perReaderRequirements,
        }
    }
}

export class Puzzle{
    id;
    solutions;
    name;
    description;
    readerNamesBySlotID;
    brandNew = false;
    static async CreateNew(details){
        let newPuzzle = new Puzzle(details, true);
        await newPuzzle.save();
        DataLayer.puzzles.push(newPuzzle);
        return newPuzzle;
    }
    constructor(json, brandNew=false) {
        this.loadFromJSON(json);
        this.brandNew = brandNew;
    }
    toJSON(){
        return {
            name: this.name,
            _id: this.id,
            readerNamesBySlotID: this.readerNamesBySlotID,
            solutions : this.solutions.map((sol)=>{
                return sol.toJSON();
            })
        }
    }
    loadFromJSON(json){
        this.name = getFirstDefined(json.name, this.name);
        this.id = getFirstDefined(json._id, this.id);
        this.solutions = getFirstDefined(json.solutions, this.solutions, []).map((sol)=>{
            return new Solution(sol);
        })
        this.readerNamesBySlotID = getFirstDefined(json.readerNamesBySlotID, this.readerNamesBySlotID);
    }
    async save(){
        if(process.env.REACT_NOSERVER){
            this.loadFromJSON (
                this.toJSON()
            );
            return;
        }

        let urlEndpoint = `http://localhost:4010/api/puzzles/${this.id}`
        if(this.brandNew){
            urlEndpoint = `http://localhost:4010/api/puzzles/`
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