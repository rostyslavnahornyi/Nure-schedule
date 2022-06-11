import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { PAIR_TIMES } from "../../constants";
import "./style.scoped.scss";

const parseTime = (time) => {
    time = time.split(":");
    const hours = +time[0];
    const minutes = +time[1];

    const today = new Date();
    today.setHours(hours);
    today.setMinutes(minutes);
    return +today;
};

const TimeLine = ({ scrollElement }) => {
    const store = useSelector((state) => state.data);
    const currentTimeLineElement = useRef(null);

    const maxNumberPair = store.events?.maxNumberPair - 1;
    let currentTime = 0;
    if (maxNumberPair) {
        const firstTime = parseTime(PAIR_TIMES[0][0]);
        const lastTime = parseTime(PAIR_TIMES[maxNumberPair][1]);
        const currTime = +new Date();

        currentTime = Math.round(
            ((currTime - firstTime) * 100) / (lastTime - firstTime)
        );
        if (currentTime <= 5) currentTime = 0;
        if (currentTime >= 100) currentTime = 99;
    }

    setTimeout(() => {
        if (currentTimeLineElement.current) {
            currentTimeLineElement.current.style.width = `${
                scrollElement.current.scrollWidth
            }px`;
        }
    });

    return (
        <>
            {store?.events?.days?.length ? (
                <div
                    className="current-time-line"
                    ref={currentTimeLineElement}
                    style={{
                        top: `${currentTime}%`,
                    }}
                />
            ) : null}
        </>
    );
};

export default TimeLine;
