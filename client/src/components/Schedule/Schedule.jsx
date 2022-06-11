import React from "react";

import Group from "../Group/Group";
import TimeScale from "../TimeScale/TimeScale";
import Graph from "../Graph/Graph";
import "./style.scoped.scss";

import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../redux/actions/creators/data";
import Tooltip from "@mui/material/Tooltip";

const Schedule = () => {
    const state = useSelector((store) => store.data);
    const dispatch = useDispatch();

    const clickHandler = (e) => dispatch(getData());

    return (
        <main className="schedule">
            <div onClick={clickHandler} className={`restart`}>
                <RestartAltIcon
                    className={state.status === "PENDING" ? "spined" : ""}
                />

                {state?.events ? (
                    <Tooltip
                        className="last-update-time"
                        title="Last update"
                        placement="bottom"
                    >
                        <div>
                            <p className="date">
                                {state.lastUpdate?.date}&nbsp;
                            </p>
                            <p className="time">{state.lastUpdate?.time}</p>
                        </div>
                    </Tooltip>
                ) : null}
            </div>

            <Group />

            <div className="main">
                <div className="timetable">
                    <TimeScale />
                    <Graph />
                </div>
            </div>
        </main>
    );
};

export default Schedule;
