import React from "react";
import styles from "../../../css/Timetable.module.css";
import * as Icon from 'react-feather';
import { createModal } from "../../../lib/modal";
import AddModal from "./AddModal";
import { parseTime } from "../../../lib/parseTime";

class Event extends React.Component {

    constructor(props) {
        super();

        this.props = props;

        this.handleEditClick = this.handleEditClick.bind(this);
    }

    getPos(time, maxHeight) {
        const { hours, minutes } = parseTime(time, 'number');

        const totHours = Math.round(((hours + (minutes / 60)) + Number.EPSILON) * 100) / 100

        const proportion = totHours / 24;
        const topPos = proportion * maxHeight;
        return topPos;

    }

    handleEditClick() {
        createModal(AddModal, { presetData: this.props.data, subjects: this.props.allSubjects });
    }

    render() {

        const maxHeight = this.props.maxHeight;
        const startTime = this.props.data.startTime;
        const endTime = this.props.data.endTime;

        const offsetHours = this.getPos(this.props.offset, maxHeight);

        const startPos = this.getPos(startTime, maxHeight);

        const endPos = this.getPos(endTime, maxHeight);

        const height = endPos - startPos;

        const formattedStart = parseTime(startTime, 'string');
        const formattedEnd = parseTime(endTime, 'string');

        return (
            <div className={styles.eventContainer} style={{top: startPos - offsetHours, height: height + 'px' }}>
                <div className={`${styles.event} ${this.props.connectTop ? styles.connectTop : ''} ${this.props.connectBottom ? styles.connectBottom : ''}`} style={{ backgroundColor: this.props.data.color}}>
                    <div className={styles.edit} role='button' onClick={this.handleEditClick} >
                        <Icon.Edit2 width={17 + 'px'} />
                    </div>
                    <span className={styles.title}>{this.props.data.displayName}</span>
                    <span className={styles.center}></span>
                    <div className={styles.under}>
                        <span className={styles.room}>{this.props.data.room}</span>
                        <span className={styles.times}><span className={styles.startTime}>{formattedStart}</span><span className={styles.endTime}> - {formattedEnd}</span></span>
                    </div>
                </div>

            </div>
        )
    }
}

export default Event;