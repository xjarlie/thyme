import React from "react";
import styles from "../../../css/Timetable.module.css";

class Event extends React.Component {

    getPos(time, maxHeight) {
        const hours = parseInt(time.slice(0, 2));
        const minutes = parseInt(time.slice(2));

        const totHours = Math.round(((hours + (minutes / 60)) + Number.EPSILON) * 100) / 100

        const proportion = totHours / 24;
        const topPos = proportion * maxHeight;
        return topPos;

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

        return (
            <div className={styles.eventContainer} style={{top: startPos - offsetHours, height: height + 'px' }}>
                <div className={`${styles.event} ${this.props.connectTop ? styles.connectTop : ''} ${this.props.connectBottom ? styles.connectBottom : ''}`} style={{ backgroundColor: this.props.data.color}}>
                    <span className={styles.title}>{this.props.data.displayName}</span>
                    <span className={styles.center}></span>
                    <div className={styles.under}>
                        <span className={styles.room}>{this.props.data.room}</span>
                        <span className={styles.times}>{this.props.data.startTime} - {this.props.data.endTime}</span>
                    </div>
                </div>

            </div>
        )
    }
}

export default Event;