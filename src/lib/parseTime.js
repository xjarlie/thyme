export function parseTime(time, format='string') {

    let hours = time.slice(0,2);
    let mins = time.slice(2);
    if (format === 'number') {
        hours = parseInt(hours);
        mins = parseInt(mins);

        return { hours, minutes: mins };
    } else {
        hours = parseInt(hours);
        console.log(hours, mins);
        return `${hours}:${mins}`;
    }
}
