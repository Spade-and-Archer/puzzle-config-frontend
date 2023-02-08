import * as icons from '@mdi/js';
import {Sensor} from "./Sensor";
import {Tag} from "./Tag";

class _DataLayer {
    tags = [
        new Tag({
            name: "temp",
            id: "temp",
            iconName: "mdiAlphaACircle",
        }),
        new Tag({
            name: "temp2",
            id: "temp2",
            iconName: "mdiAlphaBCircle",
        }),
        new Tag({
            name: "greenTag",
            id: "greenTag",
            iconName: "mdiAlphaGCircle",
        }),
        new Tag({
            name: "redTag",
            id: "redTag",
            iconName: "mdiAlphaRCircle",
        }),
        new Tag({
            name: "blueTag",
            id: "blueTag",
            iconName: "mdiAlphaBCircle",
        }),
        new Tag({
            name: "temp3",
            id: "temp3",
            iconName: "mdiAlphaCCircle",
        }),
        new Tag({
            name: "Diamond",
            id: "diamond",
            iconName: "mdiDiamondStone",
        }),
        new Tag({
            name: "Stick",
            id: "stick",
            iconName: "mdiLightbulbFluorescentTubeOutline",
        }),
        new Tag({
            name: "Coal",
            id: "coal",
            iconName: "mdiCloud",
        }),
        new Tag({
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
}
export const DataLayer = new _DataLayer();