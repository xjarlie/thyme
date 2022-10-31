import React from "react";
import Event from "./Event";

class Day extends React.Component {

    onNextButtonClick() {
        const currentDay = document.querySelector('.day.active');
        
        
        const nextDay = document.querySelector(`.day[data-daynumber='${Number(currentDay.dataset.daynumber) + 1}']`);
        if (nextDay) {
            currentDay.classList.remove('active');
            nextDay.classList.add('active');
        }
    }

    onPrevButtonClick() {
        const currentDay = document.querySelector('.day.active');
        
        
        const prevDay = document.querySelector(`.day[data-daynumber='${Number(currentDay.dataset.daynumber) - 1}']`);
        if (prevDay) {
            currentDay.classList.remove('active');
            prevDay.classList.add('active');
        }
    }
 
    render() {
        const subjects = {
            maths: {
                name: 'Maths',
                color: '#C34D4D',
            },
            physics: {
                name: 'Physics',
                color: '#7A4DC3'
            },
            tok: {
                name: 'TOK',
                color: '#4DAEC3'
            },
            english: {
                name: 'English',
                color: '#C3A94D'
            }
        };

        const events = {
            wasd: {
                name: "maths",
                startTime: "0820",
                endTime: "0920",
                room: "504"
            },
            dswahyfura: {
                name: "english",
                startTime: "0920",
                endTime: "1020",
                room: "406"
            },
            fhbndsuyi: {
                name: "physics",
                startTime: "1040",
                endTime: "1140",
                room: "416"
            },
            grfenuiasr: {
                name: "tok",
                startTime: "1140",
                endTime: "1240",
                room: "god knows"
            },
            ferhjwua8io: {
                name: "maths",
                startTime: "1330",
                endTime: "1430",
                room: "504"
            },
            fresgse: {
                name: "english",
                startTime: "1430",
                endTime: "1530",
                room: "401"
            }
        }

        return (
            <div className={`day ${this.props.number === 0 ? "active" : ""}`} data-daynumber={this.props.number} style={{height: this.props.height}}>
                <div className="header">
                    <button className="icon arrow-left" onClick={this.onPrevButtonClick}></button>
                    <span>{this.props.dayName}</span>
                    <button className="icon arrow-right" onClick={this.onNextButtonClick}></button>
                </div>
                <div className="subjects">
                    {Object.entries(events).map(([key, value]) => {
                        return <Event key={key} id={key} data={{...value, color: subjects[value.name].color, displayName: subjects[value.name].name}} maxHeight={this.props.height} />
                    })}
                </div>
            </div>
        )
    }
}

export default Day;