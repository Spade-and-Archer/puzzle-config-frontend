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
    action: string = undefined;
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
            action: this.action,
            name: this.name,
            _id: this.id,
            assignedReaders: this.assignedReaders,
            puzzleTemplate : this.puzzleTemplateID,
        }
    }
    loadFromJSON(json){
        this.name = getFirstDefined(json.name, this.name);
        this.id = getFirstDefined(json._id, this.id);
        this.action = getFirstDefined(json.action, this.action);
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
    async delete(){
        let urlEndpoint = `http://localhost:4010/api/PuzzleImplementations/${this.id}`
        let res = await fetch( urlEndpoint, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        });
        if(res.status !== 200){
            throw new Error("Failed to delete implementation")
        }
        DataLayer.puzzleImplementations = DataLayer.puzzleImplementations.filter((imp)=>{
            return imp !== this;
        })

    }
    async save(){
        console.log(process.env);
        if(process.env.REACT_APP_NOSERVER){
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