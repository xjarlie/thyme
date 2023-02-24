import React from "react";
import styles from "../../../css/Timetable.module.css";
import * as Icon from 'react-feather';
import { createModal } from "../../../lib/modal";
import EditModal from "./EditModal";

class Event extends React.Component {

    getPos(time, maxHeight) {
        const { hours, minutes } = this.parseTime(time, 'number');

        const totHours = Math.round(((hours + (minutes / 60)) + Number.EPSILON) * 100) / 100

        const proportion = totHours / 24;
        const topPos = proportion * maxHeight;
        return topPos;

    }

    parseTime(time, format='string') {

        let hours = time.slice(0,2);
        let mins = time.slice(2);
        if (format === 'number') {
            hours = parseInt(hours);
            mins = parseInt(mins);

            return { hours, minutes: mins };
        } else {
            hours = parseInt(hours);
            return `${hours}:${mins}`;
        }
    }

    handleEditClick() {
        createModal(EditModal, this.props.data);
    }

    render() {

        const maxHeight = this.props.maxHeight;
        const startTime = this.props.data.startTime;
        const endTime = this.props.data.endTime;

        const offsetHours = this.getPos(this.props.offset, maxHeight);

        const startPos = this.getPos(startTime, maxHeight);

        const endPos = this.getPos(endTime, maxHeight);

        const height = endPos - startPos;

        console.log(this.props.data.startTime, startPos);

        // let color = 'aqua';
        // const currentTimeDate = new Date(global.get('time'));
        // const currentStringTime = `${currentTimeDate.getHours()}${currentTimeDate.getMinutes()}`;
        // if (parseInt(currentStringTime) >= parseInt(startTime) && parseInt(currentStringTime) < parseInt(endTime)) {
        //     color = 'aquamarine';
        // }

        const formattedStart = this.parseTime(startTime, 'string');
        const formattedEnd = this.parseTime(endTime, 'string');

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