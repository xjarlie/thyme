export function parseTime(time, format='string') {

    if (time.includes(':')) {
        time = time.replace(':', '');
    }

    if (time.length !== 4) {
        time = `0${time}`;
    }

    let hours = time.slice(0,2);
    let mins = time.slice(2);
    if (format === 'number') {
        hours = parseInt(hours);
        mins = parseInt(mins);
        return { hours, minutes: mins };
    } else if (format === 'string') {
        hours = parseInt(hours);
        return `${hours}:${mins}`;
    } else if (format === 'input') {
        return `${hours}:${mins}`;
    }
}
