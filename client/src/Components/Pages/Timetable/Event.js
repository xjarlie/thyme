import React from "react";

class Event extends React.Component {

    getPos(time, maxHeight) {
        const hours = parseInt(time.slice(0, 2));
        const minutes = parseInt(time.slice(2));

        const totHours = Math.round(((hours + (minutes / 60)) + Number.EPSILON) * 100) / 100

        const proportion = totHours / 24;
        const topPos = proportion * maxHeight;
        return topPos;

    }

    render() {

        const maxHeight = this.props.maxHeight;
        const startTime = this.props.data.startTime;
        const endTime = this.props.data.endTime;

        const offsetHours = this.getPos(this.props.offset, maxHeight);

        const startPos = this.getPos(startTime, maxHeight);

        const endPos = this.getPos(endTime, maxHeight);

        const height = endPos - startPos;

        // let color = 'aqua';
        // const currentTimeDate = new Date(global.get('time'));
        // const currentStringTime = `${currentTimeDate.getHours()}${currentTimeDate.getMinutes()}`;
        // if (parseInt(currentStringTime) >= parseInt(startTime) && parseInt(currentStringTime) < parseInt(endTime)) {
        //     color = 'aquamarine';
        // }

        return (
            <div className="event-container" style={{top: startPos - offsetHours, height: height + 'px' }}>
                <div className="event" style={{ backgroundColor: this.props.data.color}}>
                    <span className="title">{this.props.data.displayName}</span>
                    <div className="under">
                        <span className="room">{this.props.data.room}</span>
                        <span className="times">{this.props.data.startTime} - {this.props.data.endTime}</span>
                    </div>
                </div>

            </div>
        )
    }
}

export default Event;