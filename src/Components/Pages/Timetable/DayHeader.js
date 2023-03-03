import React from "react";
import styles from "../../../css/Timetable.module.css";

class DayHeader extends React.Component {

    constructor(props) {
        super();

        this.props = props;

        this.onNextDay = this.onNextDay.bind(this);
        this.onPrevDay = this.onPrevDay.bind(this);
    }

    onNextDay() {
        this.props.handleNextDay();
    }

    onPrevDay() {
        this.props.handlePrevDay();
    }

    render() {
        return (
            <div className={`${styles.header} ${Number(this.props.dayNumber)===this.props.currentDay ? styles.active : ''}`} data-daynumber={this.props.dayNumber}>
                <button className={`icon arrow-left`} onClick={this.onPrevDay}></button>
                <span>{this.props.dayName}</span>
                <button className="icon arrow-right" onClick={this.onNextDay}></button>
            </div>
        )
    }
}

export default DayHeader;