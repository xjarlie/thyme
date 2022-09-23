import React from "react";
import DayHeader from "./DayHeader.js";
import DayContent from "./DayContent.js";

class Week extends React.Component {

    constructor() {
        super();

        const data = [
            {
                dayName: 'Mon'
            },
            {
                dayName: 'Tue'
            },
            {
                dayName: 'Wed'
            },
            {
                dayName: 'Thu'
            },
            {
                dayName: 'Fri'
            },
            {
                dayName: 'Sat'
            },
            {
                dayName: 'Sun'
            }
        ];

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
            },
            spanish: {
                name: 'Spanish',
                color: '#AC3AA0'
            }
        };

        const events = [
            {
                name: 'spanish',
                startTime: "0230",
                endTime: "0400",
                room: '123',
                day: 2
            },
            {
                name: "maths",
                startTime: "0820",
                endTime: "0920",
                room: "504",
                day: 1
            },
            {
                name: "english",
                startTime: "0920",
                endTime: "1020",
                room: "406",
                day: 1
            },
            {
                name: "physics",
                startTime: "1040",
                endTime: "1140",
                room: "416",
                day: 0
            },
            {
                name: "tok",
                startTime: "1140",
                endTime: "1240",
                room: "god knows",
                day: 2
            },
            {
                name: "maths",
                startTime: "1330",
                endTime: "1430",
                room: "504",
                day: 2
            },
            {
                name: "english",
                startTime: "1430",
                endTime: "1530",
                room: "401",
                day: 4
            }
        ];

        let highestDay = 0;
        for (const i in events) {
            if (events[i].day > highestDay) highestDay = events[i].day;
        }

        let currentDay = (new Date(Date.now())).getDay() - 1;
        if (currentDay === -1) currentDay = 6;

        let activeDay = currentDay;
        if (activeDay > highestDay) activeDay = 0;

        this.state = {
            data,
            subjects,
            events,
            numDays: highestDay,
            activeDay
        }
        
    }

    componentDidMount() {
        document.querySelector('.timetable').style['min-width'] = `${170*(this.state.numDays+1)}px`
    }

    render() {

        const {events, subjects, data, numDays: highestDay} = this.state;

        const hourlyHeight = 85;
        const offsetHours = (Number(events[0].startTime) - 60).toString().padStart(4, '0');
        

        


        return (
            <div className="week" >
                <div className="day-headers">
                    {

                        Object.entries(data).map(([key, value]) => {
                            if (key <= highestDay) {
                                return <DayHeader key={`${value.dayName}-header`} currentDay={this.state.activeDay} dayName={value.dayName} dayNumber={key} number={key} />
                            } else {
                                return false;
                            }

                        })
                    }
                </div>
                <div className="day-content">
                    {
                        Object.entries(data).map(([key, value]) => {
                            const dayEvents = events.filter(o => o.day === Number(key));
                            
                            if (key <= highestDay) {
                                return <DayContent key={`${value.dayName}-content`} currentDay={this.state.activeDay} dayName={value.dayName} events={dayEvents} subjects={subjects} number={key} height={hourlyHeight * 24} offset={offsetHours} />
                            } else {
                                return false;
                            }

                        })
                    }
                </div>
            </div>
        )
    }
}

export default Week;