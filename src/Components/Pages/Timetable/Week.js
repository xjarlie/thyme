import React from "react";
import DayHeader from "./DayHeader.js";
import DayContent from "./DayContent.js";
import styles from "../../../css/Timetable.module.css"

class Week extends React.Component {

    constructor(props) {
        super(props);

        const days = [
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

        // const subjects = {
        //     maths: {
        //         name: 'Maths',
        //         color: '#C34D4D',
        //     },
        //     physics: {
        //         name: 'Physics',
        //         color: '#7A4DC3'
        //     },
        //     tok: {
        //         name: 'TOK',
        //         color: '#4DAEC3'
        //     },
        //     english: {
        //         name: 'English',
        //         color: '#C3A94D'
        //     },
        //     spanish: {
        //         name: 'Spanish',
        //         color: '#AC3AA0'
        //     }
        // };

        // const events = [
        //     {
        //         name: 'spanish',
        //         startTime: "0230",
        //         endTime: "0400",
        //         room: '123',
        //         day: 2
        //     },
        //     {
        //         name: "maths",
        //         startTime: "0820",
        //         endTime: "0920",
        //         room: "504",
        //         day: 1
        //     },
        //     {
        //         name: "english",
        //         startTime: "0920",
        //         endTime: "1020",
        //         room: "406",
        //         day: 1
        //     },
        //     {
        //         name: "physics",
        //         startTime: "1040",
        //         endTime: "1140",
        //         room: "416",
        //         day: 0
        //     },
        //     {
        //         name: "tok",
        //         startTime: "1140",
        //         endTime: "1240",
        //         room: "god knows",
        //         day: 2
        //     },
        //     {
        //         name: "maths",
        //         startTime: "1330",
        //         endTime: "1430",
        //         room: "504",
        //         day: 2
        //     },
        //     {
        //         name: "english",
        //         startTime: "1430",
        //         endTime: "1530",
        //         room: "401",
        //         day: 4
        //     }
        // ];

        const timetable = this.props.loaderData.result.timetable;
        const week = timetable.weeks[this.props.weekNum];
        const events = week.events;
        const subjects = timetable.subjects;

        let objSubjects = {};
        for (const i in subjects) {
            objSubjects[subjects[i].id] = subjects[i];
        }

        let highestDay = 0;
        for (const i in events) {
            if (events[i].day > highestDay) highestDay = events[i].day;
        }

        if (highestDay < 5) highestDay = 4;

        let currentDay = (new Date(Date.now())).getDay() - 1;
        if (currentDay === -1) currentDay = 6;

        let activeDay = currentDay;
        if (activeDay > highestDay) activeDay = 0;

        this.state = {
            days,
            subjects: objSubjects,
            events,
            numDays: highestDay,
            activeDay
        }

        this.handleNextDay = this.handleNextDay.bind(this);
        this.handlePrevDay = this.handlePrevDay.bind(this);
        
    }

    componentDidMount() {
        document.querySelector(`.${styles.timetable}`).style['min-width'] = `${170*(Number(this.state.numDays)+1)}px`
    }

    handleNextDay() {
        const activeDay = Number(this.state.activeDay);
        this.setState({
            activeDay: activeDay + 1
        })
    }

    handlePrevDay() {
        const activeDay = Number(this.state.activeDay);
        this.setState({
            activeDay: activeDay - 1
        })
    }

    render() {


        const {events, subjects, days, numDays: highestDay} = this.state;

        const hourlyHeight = 70;
        const earliestStart = Number(events[0]?.startTime) - 60 || 0;
        const offsetHours = (earliestStart).toString().padStart(4, '0');
        
        return (
            <div className={styles.week} >
                <div className={styles.dayHeaders}>
                    {

                        Object.entries(days).map(([key, value]) => {
                            if (key <= highestDay) {
                                return <DayHeader key={`${value.dayName}-header`} currentDay={this.state.activeDay} handleNextDay={this.handleNextDay} handlePrevDay={this.handlePrevDay} dayName={value.dayName} dayNumber={key} number={key} />
                            } else {
                                return false;
                            }

                        })
                    }
                </div>
                <div className={styles.dayContent}>
                    {
                        Object.entries(days).map(([key, value]) => {
                            const dayEvents = events.filter(o => o.day === key);
                            
                            if (key <= highestDay) {
                                return <DayContent key={`${value.dayName}-content`} currentDay={this.state.activeDay} dayName={value.dayName} events={dayEvents} subjects={subjects} number={key} height={hourlyHeight * 24} offset={offsetHours} />
                            } else {
                                return false;
                            }

                        })
                    }
                </div>
            </div>
        )
    }
}

export default Week;