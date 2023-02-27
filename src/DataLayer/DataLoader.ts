import {DataLayer} from "./DataLayer";
import { TagGroup } from "./TagGroup";
import { Puzzle } from "./Solution";
import {PuzzleImplementation} from "./PuzzleImplementation";
export const loadData = async  ()=>{
    let data = await (await fetch("http://localhost:4010/api/all", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    })).json();
    DataLayer.tagGroups = data.tagGroups.map((p)=>{
        return new TagGroup(p);
    })
    DataLayer.puzzles = data.puzzles.map((p)=>{
        return new Puzzle(p);
    })
    DataLayer.puzzleImplementations = data. puzzleImplementations.map((p)=>{
        console.log("found puzzle implementation");
        return new PuzzleImplementation(p);
    })
}