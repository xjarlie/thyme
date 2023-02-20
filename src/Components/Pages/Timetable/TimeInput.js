import React from "react";
import styles from '../../../css/TimeInput.module.css';

class TimeInput extends React.Component {
    constructor(props) {
        super();
        this.props = props;
    }

    render() {

        return (

            <input type={'time'} className={styles.timeInput} pattern="[0-9]{2}:[0-9]{2}" {...this.props} />

        )

    }
}

export default TimeInput;