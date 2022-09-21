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

        console.log(data);

        return (
            <div className="week">
                {data.map((o) => 
                    <Day key={o.dayName} dayName={o.dayName} />
                )}
            </div>
        )
    }
}

export default Week;