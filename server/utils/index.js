import { DAYS } from "./constants.js";

export const getDatesBetweenTwoDates = (startDate, endDate) => {
    const days = DAYS;

    const dates = [];
    const date = new Date(startDate);

    while (date <= endDate) {
        const currDate = new Date(date);
        const month = currDate.getMonth() + 1;

        dates.push({
            time:   currDate,
            desc: `${days[currDate.getDay()]}, ${currDate.getDate()}.${month
                .toString()
                .padStart(2, "0")}`,
        });
        date.setDate(date.getDate() + 1);
    }

    return dates;
};

export const eventsToDays = (events, days, maxNumberPair) => {
    const daysEvents = Array.from({ length: days }, () =>
        Array.from({ length: maxNumberPair }, () => [])
    );

    const firstDay = events[0].start_time * 1000;

    events.forEach((event, index) => {
        const currDay = new Date(event.start_time * 1000);
        const diffInTime = currDay - firstDay;

        const indexDay = Math.floor(diffInTime / (1000 * 60 * 60 * 24));
        const indexPair = event.number_pair - 1;

        daysEvents[indexDay][indexPair] = [
            ...daysEvents[indexDay][indexPair],
            event,
        ];
    });

    return daysEvents;
};

export const setMaxPairsDay = (events) => {
    let maxNumberPair = 0;

    events.forEach((event) => {
        const numberPair = event["number_pair"];

        if (numberPair > maxNumberPair) {
            maxNumberPair = numberPair;
        }
    });

    return maxNumberPair;
};
