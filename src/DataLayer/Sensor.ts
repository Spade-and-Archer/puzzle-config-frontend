import * as icons from '@mdi/js';
import Icon from '@mdi/react'

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
    getIcon(props: any){
        let actualProps = Object.assign({
            size:1,
            horizontal: true,
            vertical: true,
        }, props);
        return actualProps;
    }

}