import {DataLayer} from "./DataLayer";
import {getFirstDefined} from "gardenspadejs/dist/general";
import {Solution} from "./Solution";

export class PuzzleImplementation{
    id;
    name;
    assignedReaders;
    puzzleTemplateID;
    puzzleTemplate;
    solved: boolean = false;
    brandNew = false;
    static async CreateNew(details){
        let newPuzzleImplementation = new PuzzleImplementation(details, true);
        await newPuzzleImplementation.save();
        DataLayer.puzzleImplementations.push(newPuzzleImplementation);
        return newPuzzleImplementation;
    }
    constructor(json, brandNew=false) {
        this.loadFromJSON(json);
        this.brandNew = brandNew;
    }
    toJSON(){
        return {
            name: this.name,
            _id: this.id,
            assignedReaders: this.assignedReaders,
            puzzleTemplate : this.puzzleTemplateID,
        }
    }
    loadFromJSON(json){
        this.name = getFirstDefined(json.name, this.name);
        this.id = getFirstDefined(json._id, this.id);
        this.assignedReaders = getFirstDefined(json.assignedReaders, this.assignedReaders, {});
        this.puzzleTemplateID = getFirstDefined(json.puzzleTemplate, this.puzzleTemplateID, undefined);
        if(this.puzzleTemplateID){
            this.puzzleTemplate = DataLayer.puzzles.reduce((a, b)=>{
                if(a && a.id === this.puzzleTemplateID){
                    return a;
                }
                if(b && b.id === this.puzzleTemplateID){
                    return b;
                }
                return undefined;
            }, undefined)
        }
    }
    async save(){
        if(process.env.REACT_NOSERVER){
            this.loadFromJSON (
                this.toJSON()
            );
            return;
        }

        let urlEndpoint = `http://localhost:4010/api/PuzzleImplementations/${this.id}`
        if(this.brandNew){
            urlEndpoint = `http://localhost:4010/api/PuzzleImplementations/`
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