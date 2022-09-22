import React from "react";
import Event from "./Event";

class DayContent extends React.Component {
    render() {
        return (
            <div className={`subjects ${this.props.number === 0 ? 'active' : ''}`} data-daynumber={this.props.number}>
                {Object.entries(this.props.events).map(([key, value]) => {
                    return <Event key={key} id={key} data={{...value, color: this.props.subjects[value.name].color, displayName: this.props.subjects[value.name].name}} maxHeight={this.props.height} offset={this.props.offset} />
                })}
            </div>
        )
    }
}

export default DayContent;