import * as icons from '@mdi/js';
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
    tagGroups = [];
    puzzleImplementations = [];

    curSensorStates = {};
}
export const DataLayer = new _DataLayer();
