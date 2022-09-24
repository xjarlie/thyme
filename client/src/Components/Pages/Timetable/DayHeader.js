import React from "react";
import styles from "../../../css/Timetable.module.css";

class DayHeader extends React.Component {

    onNextButtonClick() {
        const currentDay = document.querySelector('.day-headers .header.active');
        
        const nextDay = document.querySelector(`.day-headers .header[data-daynumber='${Number(currentDay.dataset.daynumber) + 1}']`);
        if (nextDay) {
            currentDay.classList.remove('active');
            nextDay.classList.add('active');
            
            document.querySelector(`.day-content .subjects.active`).classList.remove('active');
            document.querySelector(`.day-content .subjects[data-daynumber='${Number(currentDay.dataset.daynumber) + 1}']`).classList.add('active');
        }
    }

    onPrevButtonClick() {
        const currentDay = document.querySelector('.day-headers .header.active');
        
        const prevDay = document.querySelector(`.day-headers .header[data-daynumber='${Number(currentDay.dataset.daynumber) - 1}']`);
        if (prevDay) {
            currentDay.classList.remove('active');
            prevDay.classList.add('active');

            document.querySelector(`.day-content .subjects.active`).classList.remove('active');
            document.querySelector(`.day-content .subjects[data-daynumber='${Number(currentDay.dataset.daynumber) - 1}']`).classList.add('active');
        }
    }

    render() {
        return (
            <div className={`${styles.header} ${Number(this.props.dayNumber)===this.props.currentDay ? styles.active : ''}`} data-daynumber={this.props.dayNumber}>
                <button className={`icon arrow-left`} onClick={this.onPrevButtonClick}></button>
                <span>{this.props.dayName}</span>
                <button className="icon arrow-right" onClick={this.onNextButtonClick}></button>
            </div>
        )
    }
}

export default DayHeader;