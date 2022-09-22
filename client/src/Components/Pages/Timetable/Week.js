import React from "react";
import DayHeader from "./DayHeader.js";
import DayContent from "./DayContent.js";

class Week extends React.Component {

    render() {

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
            }
        };

        const events = [
            {
                name: "maths",
                startTime: "0820",
                endTime: "0920",
                room: "504"
            },
            {
                name: "english",
                startTime: "0920",
                endTime: "1020",
                room: "406"
            },
            {
                name: "physics",
                startTime: "1040",
                endTime: "1140",
                room: "416"
            },
            {
                name: "tok",
                startTime: "1140",
                endTime: "1240",
                room: "god knows"
            },
            {
                name: "maths",
                startTime: "1330",
                endTime: "1430",
                room: "504"
            },
            {
                name: "english",
                startTime: "1430",
                endTime: "1530",
                room: "401"
            }
        ];

        const hourlyHeight = 85;
        const offsetHours = (Number(events[0].startTime) - 60).toString().padStart(4, '0');
        let currentDay = (new Date(Date.now())).getDay() - 1;
        if (currentDay === -1) currentDay = 6;

        return (
            <div className="week" >
                <div className="day-headers">
                    {
                        data.map((o) =>
                            <DayHeader key={`${o.dayName}-header`} currentDay={currentDay} dayName={o.dayName} dayNumber={data.indexOf(o)} number={data.indexOf(o)} />
                        )
                    }
                </div>
                <div className="day-content">
                    {
                        data.map((o) =>
                            <DayContent key={`${o.dayName}-content`} currentDay={currentDay} dayName={o.dayName} events={events} subjects={subjects} number={data.indexOf(o)} height={hourlyHeight * 24} offset={offsetHours} />
                        )
                    }
                </div>
                {/* {
                    data.map((o) =>
                        <Day key={o.dayName} dayName={o.dayName} number={data.indexOf(o)} height={hourlyHeight * 24} />
                    )
                } */}
            </div>
        )
    }
}

export default Week;