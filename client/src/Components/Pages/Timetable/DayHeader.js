import React from "react";

class DayHeader extends React.Component {

    onNextButtonClick() {
        const currentDay = document.querySelector('.day-headers .header.active');
        console.log(currentDay.dataset)
        
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
            <div className={`header ${this.props.dayNumber===0 ? 'active': ''}`} data-daynumber={this.props.dayNumber}>
                <button className="icon arrow-left" onClick={this.onPrevButtonClick}></button>
                <span>{this.props.dayName}</span>
                <button className="icon arrow-right" onClick={this.onNextButtonClick}></button>
            </div>
        )
    }
}

export default DayHeader;