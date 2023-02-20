import React from "react";

class TimeInput extends React.Component {
    constructor(props) {
        super();
        this.props = props;
        this.styles = props.styles;
    }

    render() {

        return (

            <input type={'time'} className={this.styles.timeInput}  {...this.props} />

        )

    }
}

export default TimeInput;