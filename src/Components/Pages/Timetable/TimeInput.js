import React from "react";
import styles from '../../../css/TimeInput.module.css';
import { parseTime } from "../../../lib/parseTime";

class TimeInput extends React.Component {
    constructor(props) {
        super();
        this.props = props;

    }

    render() {

        const value = parseTime(this.props.value, 'input');

        return (

            <input type={'time'} className={styles.timeInput} pattern="[0-9]{2}:[0-9]{2}" {...this.props} value={value} />

        )

    }
}

export default TimeInput;