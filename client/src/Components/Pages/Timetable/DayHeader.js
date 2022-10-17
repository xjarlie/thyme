import React from "react";
import styles from "../../../css/Timetable.module.css";

class DayHeader extends React.Component {

    onNextButtonClick() {
        const currentDay = document.querySelector(`.${styles.dayHeaders} .${styles.header}.${styles.active}`);

        const nextDay = document.querySelector(`.${styles.dayHeaders} .${styles.header}[data-daynumber='${Number(currentDay.dataset.daynumber) + 1}']`);
        if (nextDay) {
            currentDay.classList.remove(styles.active);
            nextDay.classList.add(styles.active);
            
            document.querySelector(`.${styles.dayContent} .${styles.subjects}.${styles.active}`).classList.remove(styles.active);
            document.querySelector(`.${styles.dayContent} .${styles.subjects}[data-daynumber='${Number(currentDay.dataset.daynumber) + 1}']`).classList.add(styles.active);
        }
    }

    onPrevButtonClick() {
        const currentDay = document.querySelector(`.${styles.dayHeaders} .${styles.header}.${styles.active}`);
        
        const prevDay = document.querySelector(`.${styles.dayHeaders} .${styles.header}[data-daynumber='${Number(currentDay.dataset.daynumber) - 1}']`);
        if (prevDay) {
            currentDay.classList.remove(styles.active);
            prevDay.classList.add(styles.active);

            document.querySelector(`.${styles.dayContent} .${styles.subjects}.${styles.active}`).classList.remove(styles.active);
            document.querySelector(`.${styles.dayContent} .${styles.subjects}[data-daynumber='${Number(currentDay.dataset.daynumber) - 1}']`).classList.add(styles.active);
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