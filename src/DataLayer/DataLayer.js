import * as icons from '@mdi/js';
import {sleep} from "gardenspadejs/dist/general";
import {Sensor} from "./Sensor";
import {Puzzle} from "./Solution.ts";
import {TagGroup} from "./TagGroup.js";

class _DataLayer {
    tags = [
        new TagGroup({
            name: "temp",
            id: "temp",
            iconName: "mdiAlphaACircle",
        }),
        new TagGroup({
            name: "temp2",
            id: "temp2",
            iconName: "mdiAlphaBCircle",
        }),
        new TagGroup({
            name: "greenTag",
            id: "greenTag",
            iconName: "mdiAlphaGCircle",
        }),
        new TagGroup({
            name: "redTag",
            id: "redTag",
            iconName: "mdiAlphaRCircle",
        }),
        new TagGroup({
            name: "blueTag",
            id: "blueTag",
            iconName: "mdiAlphaBCircle",
        }),
        new TagGroup({
            name: "temp3",
            id: "temp3",
            iconName: "mdiAlphaCCircle",
        }),
        new TagGroup({
            name: "Diamond",
            id: "diamond",
            iconName: "mdiDiamondStone",
        }),
        new TagGroup({
            name: "Stick",
            id: "stick",
            iconName: "mdiLightbulbFluorescentTubeOutline",
        }),
        new TagGroup({
            name: "Coal",
            id: "coal",
            iconName: "mdiCloud",
        }),
        new TagGroup({
            name: "Iron Ingot",
            id: "iron",
            iconName: "mdiGold",
        })
    ];
    sensors = [
        new Sensor({
            name: "Sensor 1",
            id: "tempSensor",
            iconName: "mdiAlphaXCircleOutline",
        }),
        new Sensor({
            name: "Sensor 2",
            id: "tempSensor2",
            iconName: "mdiAlphaYCircleOutline",
        }),
        new Sensor({
            name: "Sensor 3",
            id: "tempSensor3",
            iconName: "mdiAlphaZCircleOutline",
        }),
        new Sensor({
            name: "Sensor 4",
            id: "tempSensor4",
            iconName: "mdiAlphaZCircleOutline",
        }),
        new Sensor({
            name: "Sensor 5",
            id: "tempSensor5",
            iconName: "mdiAlphaZCircleOutline",
        }),
        new Sensor({
            name: "Sensor 6",
            id: "tempSensor6",
            iconName: "mdiAlphaZCircleOutline",
        }),
        new Sensor({
            name: "Sensor 7",
            id: "tempSensor7",
            iconName: "mdiAlphaZCircleOutline",
        }),
        new Sensor({
            name: "Sensor 8",
            id: "tempSensor8",
            iconName: "mdiAlphaZCircleOutline",
        }),
        new Sensor({
            name: "Sensor 9",
            id: "tempSensor9",
            iconName: "mdiAlphaZCircleOutline",
        })
    ]
    puzzles = [];
    tagGroups = [ new TagGroup({
        name: "temp",
        _id: "temp",
        iconName: "mdiAlphaACircle",
        }),
        new TagGroup({
            name: "temp2",
            _id: "temp2",
            iconName: "mdiAlphaBCircle",
        }),
        new TagGroup({
            name: "greenTag",
            _id: "greenTag",
            iconName: "mdiAlphaGCircle",
        }),
        new TagGroup({
            name: "redTag",
            _id: "redTag",
            iconName: "mdiAlphaRCircle",
        }),
        new TagGroup({
            name: "blueTag",
            _id: "blueTag",
            iconName: "mdiAlphaBCircle",
        }),
        new TagGroup({
            name: "temp3",
            _id: "temp3",
            iconName: "mdiAlphaCCircle",
        }),
        new TagGroup({
            name: "Diamond",
            _id: "diamond",
            iconName: "mdiDiamondStone",
        }),
        new TagGroup({
            name: "Stick",
            _id: "stick",
            iconName: "mdiLightbulbFluorescentTubeOutline",
        }),
        new TagGroup({
            name: "Coal",
            _id: "coal",
            iconName: "mdiCloud",
        }),
        new TagGroup({
            name: "Iron Ingot",
            _id: "iron",
            iconName: "mdiGold",
        })];
    puzzleImplementations = [];

    curSensorStates = {};

    keepUpdating = true;
    runningUpdateLoop = false;
    listenersForImplementation = {};
    implementationStates = {};
    listenersForAnyTagChanges = [];
    async doUpdateLoop(){
        if(this.runningUpdateLoop){
            return;
        }
        this.runningUpdateLoop = true;
        try{
            while(this.keepUpdating){
                try{
                    let start = Date.now();
                    let data = await (await fetch("http://localhost:4010/api/currentReaderStates", {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json'
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        redirect: 'follow', // manual, *follow, error
                        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    })).json();
                    let responseTime = Date.now() - start;

                    let allKeys = [...(new Set([...Object.keys(this.curSensorStates), ...Object.keys(data.readerStates)]))]

                    let changes = false;
                    allKeys.forEach((e)=>{
                        if(this.curSensorStates[e] !== data.readerStates[e]){
                            changes = true;
                        }
                    })
                    this.curSensorStates = data.readerStates;
                    console.log("new cur sensor states:", this.curSensorStates);

                    let updateFunctions = [];
                    this.puzzleImplementations.forEach((imp)=>{
                        if(data.implementationStates[imp.id]){
                            if(imp.solved !== data.implementationStates[imp.id].solved){
                                changes = true;
                                console.log("update needed");
                                updateFunctions.push(...(this.listenersForImplementation[imp.id] || []));
                            }
                            imp.solved = data.implementationStates[imp.id].solved
                        }
                    })
                    updateFunctions.forEach((f)=>{
                        f();
                    })
                    if(changes){
                        this.listenersForAnyTagChanges.forEach((f)=>{
                            f();
                        })
                    }
                    if(responseTime < 100){
                        await sleep(150);
                    }
                }catch(e){
                    console.warn("warning when updating imps")
                    console.warn(e);
                }

                await sleep(10);
            }
        }catch(e){
            console.warn(e);
        }

        this.runningUpdateLoop = false;

    }
}
export const DataLayer = new _DataLayer();
