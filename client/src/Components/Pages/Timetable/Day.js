import React from "react";

class Day extends React.Component {
    render() {
        return (
            <div className="day">
                <div className="header">
                    <span>{this.props.dayName}</span>
                </div>
            </div>
        )
    }
}

export default Day;