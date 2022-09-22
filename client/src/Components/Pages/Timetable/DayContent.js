import React from "react";
import Event from "./Event";

class DayContent extends React.Component {
    render() {
        return (
            <div className={`subjects ${this.props.number === this.props.currentDay ? 'active' : ''}`} data-daynumber={this.props.number}>
                {Object.entries(this.props.events).map(([key, value]) => {

                    const events = this.props.events;

                    const startTime = value.startTime;
                    const endTime = value.endTime;

                    const prevEvent = events.filter((o) => {
                        return o.endTime === startTime;
                    });

                    const nextEvent = events.filter((o) => {
                        return o.startTime === endTime;
                    });

                    const connectTop = prevEvent.length > 0;
                    const connectBottom = nextEvent.length > 0;

                    return <Event key={key}
                        id={key}
                        data={{ ...value, color: this.props.subjects[value.name].color, displayName: this.props.subjects[value.name].name }}
                        maxHeight={this.props.height}
                        offset={this.props.offset}
                        connectTop={connectTop}
                        connectBottom={connectBottom} />
                })}
            </div>
        )
    }
}

export default DayContent;