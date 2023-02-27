export function parseTime(time, format='string') {

    const regex = new RegExp('/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/');
    

    let hours = time.slice(0,2);
    let mins = time.slice(2);
    if (format === 'number') {
        hours = parseInt(hours);
        mins = parseInt(mins);

        return { hours, minutes: mins };
    } else {
        if (regex.test(time)) {
            return time;
        }
        hours = parseInt(hours);
        console.log(hours, mins);
        return `${hours}:${mins}`;
    }
}
