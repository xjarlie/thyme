import React from "react";
import Day from "./Day";

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

        const hourlyHeight = 65;

        return (
            <div className="week">
                {data.map((o) => 
                    <Day key={o.dayName} dayName={o.dayName} number={data.indexOf(o)} height={hourlyHeight * 24} />
                )}
            </div>
        )
    }
}

export default Week;