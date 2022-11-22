import * as icons from '@mdi/js';

export class Sensor{
    name : string;
    id : string;
    iconName : string;
    icon;

    constructor(json: any) {
        this.name = json.name;
        this.id = json.id;
        this.iconName = json.iconName;
        // @ts-ignore
        this.icon = icons[this.iconName];

    }

}