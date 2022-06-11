import React from "react";
import "./style.scoped.scss";

import BackIcon from "@mui/icons-material/NavigateBeforeOutlined";
import NextIcon from "@mui/icons-material/NavigateNextOutlined";
import CurrIcon from "@mui/icons-material/AdjustOutlined";

const ScheduleControls = ({ scrollElement, indexOfCurr }) => {
    const toStartClick = (e) => {
        scrollElement.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    };
    const toCurrClick = (e) => {
        const dayWidth =
            scrollElement.current.getBoundingClientRect().width / 7;

        scrollElement.current.scrollTo({
            top: 0,
            left: Math.floor(dayWidth * (indexOfCurr - 2)),
            behavior: "smooth",
        });
    };
    const toFinishClick = (e) => {
        const fullWidth = scrollElement.current.scrollWidth;
        scrollElement.current.scrollTo({
            top: 0,
            left: fullWidth,
            behavior: "smooth",
        });
    };

    return (
        <div className="wrapper">
            <BackIcon className="start" onClick={toStartClick} />
            <CurrIcon className="curr" onClick={toCurrClick} />
            <NextIcon className="finish" onClick={toFinishClick} />
        </div>
    );
};

export default ScheduleControls;
