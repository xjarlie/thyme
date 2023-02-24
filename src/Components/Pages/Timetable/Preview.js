import React from "react";
import styles from '../../../css/Preview.module.css';

class Preview extends React.Component {
    constructor(props) {
        super();

        this.props = props;
        this.styles = props.styles;
    }

    render() {
        return (
            <div className={styles.preview} style={{ backgroundColor: this.props.data.color }}>
                <span className={styles.title}>{this.props.data.subject || 'Subject'}</span>
                <span className={styles.center}></span>
                <div className={styles.under}>
                    <span className={styles.room}>{this.props.data.room || 'Room'}</span>
                    <span className={styles.times}>{this.props.data.startTime || '00:00'} - {this.props.data.endTime || '00:00'}</span>
                </div>
            </div>
        )
    }
}

export default Preview;