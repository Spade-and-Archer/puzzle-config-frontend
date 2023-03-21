import {Avatar, Card, CardHeader, Typography} from "@mui/material";
import {GenerateUID, sleep} from "gardenspadejs/dist/general";
import React from "react";
import {DataLayer} from "../../DataLayer/DataLayer";
import SingleSensorConfigPreview from "../SingleSensorConfigPreview/SingleSensorConfigPreview";
import "./PuzzleImplementationPreview.scss";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { red, green } from '@mui/material/colors';
export default class PuzzleImplementationsPreview extends React.Component {
    constructor(props) {
        super(props);
        this.uid = GenerateUID("PuzzleImplementationPreview");
        this.state = {}
    }
    beenRendered=  false;

    keepUpdating = false;
    runningUpdateLoop = false;
    async doUpdateLoop(){
        if(this.runningUpdateLoop){
            return;
        }
        return;
        this.runningUpdateLoop = true;
        try{
            while(this.keepUpdating){
                let data = await (await fetch("http://localhost:4010/api/currentReaderStates", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    redirect: 'follow', // manual, *follow, error
                    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                })).json();
                DataLayer.curSensorStates = data.readerStates;
                DataLayer.puzzleImplementations.forEach((imp)=>{
                    if(data.implementationStates[imp.id]){
                        imp.solved = data.implementationStates[imp.id].solved
                    }
                })
                this.setState({});
                await sleep(200);
            }
        }catch(e){
            console.warn(e);
        }

        this.runningUpdateLoop = false;

    }
    componentDidMount() {
        this.keepUpdating = true;
        this.doUpdateLoop();
    }
    componentWillUnmount() {
        this.keepUpdating = false
    }

    render() {
        let className = "PuzzleImplementationPreview";
        let relevantImps = DataLayer.puzzleImplementations.filter((imp)=>{
            return imp.puzzleTemplate === this.props.activePuzzleTemplate;
        })
        let allReaderIDs = Object.keys(this.props.activePuzzleTemplate?.readerNamesBySlotID || []).sort((a, b)=>{
            return this.props.activePuzzleTemplate.readerNamesBySlotID[a].localeCompare(this.props.activePuzzleTemplate.readerNamesBySlotID[b]);
        });
        console.log("data layer:", DataLayer)
        console.log('relevant imps:', relevantImps);
        return (
            <div className={className} id={this.uid}>
                {
                    relevantImps.map((imp)=>{
                        let impSolved = imp.solved;
                        return <Card className={"singleImpPreviewCard"}>
                            <CardHeader title={imp.name}

                                        avatar={<Avatar  sx={{ bgcolor: impSolved ? green[500] : red[700]  }} >
                                {impSolved && <CheckIcon/>}
                                {!impSolved && <ClearIcon/>}
                            </Avatar>}>
                            </CardHeader>
                            <div className={"singleImpPreview"}>

                                {allReaderIDs.map((relSensor)=>{
                                    let actualSensorID = imp.assignedReaders[relSensor];
                                    let currentTag = DataLayer.curSensorStates[actualSensorID];
                                    let currentTagGroup = DataLayer.tagGroups.reduce((a, b)=>{
                                        if( a && a.tags.includes(currentTag)){
                                            return a;
                                        }
                                        if(b && b.tags.includes(currentTag)){
                                            return b;
                                        }
                                    })
                                    let senorName =  this.props.activePuzzleTemplate.readerNamesBySlotID[relSensor];
                                    return  <SingleSensorConfigPreview allowTagConfig={false}  sensor={senorName} tag={currentTagGroup}
                                                                       key={`sensorPreview--${relSensor}`}
                                    />
                                })}
                            </div>
                        </Card>

                    })
                }
            </div>
        );
    }
}
