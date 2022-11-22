import * as icons from '@mdi/js';
import {Sensor} from "./Sensor";
import {Tag} from "./Tag";

export class DataLayer {
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
            name: "temp3",
            id: "temp3",
            iconName: "mdiAlphaCCircle",
        })
    ];
    sensors = [
        new Sensor({
            name: "tempSensor",
            id: "tempSensor",
            iconName: "mdiAlphaXCircleOutline",
        }),
        new Sensor({
            name: "tempSensor2",
            id: "tempSensor2",
            iconName: "mdiAlphaYCircleOutline",
        }),
        new Sensor({
            name: "tempSensor3",
            id: "tempSensor3",
            iconName: "mdiAlphaZCircleOutline",
        })
    ]
}