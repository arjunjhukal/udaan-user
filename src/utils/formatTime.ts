
export const getTime = (dateString: string) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${formattedMinutes} ${ampm}`;
};


type TimeInput = string | number | Date;

export function getTimeDifference(
    from: TimeInput,
    to?: TimeInput
) {
    const fromTime = new Date(from).getTime();
    const toTime = to ? new Date(to).getTime() : Date.now();

    const diffMs = Math.abs(toTime - fromTime);

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return {
        milliseconds: diffMs,
        seconds,
        minutes,
        hours,
        days,
    };
}



