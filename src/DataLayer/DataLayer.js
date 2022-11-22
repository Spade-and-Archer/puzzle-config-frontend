import * as icons from '@mdi/js';
import {Sensor} from "./Sensor";
import {Tag} from "./Tag";

export class DataLayer {
    tags = [
        new Tag({
            name: "temp",
            id: "temp",
            iconName: "mdiAlphaACircle",
        })
    ];
    sensors = [
        new Sensor({
            name: "tempSensor",
            id: "tempSensor",
            iconName: "mdiAlphaACircle",
        })
    ]
}