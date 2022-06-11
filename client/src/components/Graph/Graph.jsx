import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "./style.scoped.scss";
import Event from "../Event/Event";
import Alert from "../Alert/Alert";
import ScheduleControls from "../ScheduleControls/ScheduleControls.jsx";
import { isToday } from "../../constants";
import GroupInfo from "../GroupInfo/GroupInfo";
import TimeLine from "../TimeLine/TimeLine";

const Graph = () => {
    let indexDay = 0;
    const state = useSelector((store) => store.data);
    const scrollElement = useRef(null);
    const maxNumberPair = state.events?.maxNumberPair - 1;

    useEffect(() => {
        const dayWidth =
            scrollElement.current.getBoundingClientRect().width / 7;

        scrollElement.current.scrollTo({
            top: 0,
            left: Math.floor(dayWidth * (indexDay - 2)),
        });
    }, [scrollElement, state]);

    const wheelHandler = (event) => {
        const diff = scrollElement.current.scrollLeft + event.deltaY;

        scrollElement.current.scrollTo({ top: 0, left: diff });
    };


    return (
        <div className="graph">
            {state.status === "SUCCESS" ? (
                <Alert status="success">Data loaded.</Alert>
            ) : null}
            {state.status === "FAIL" ? (
                <Alert status="error">{state.error}</Alert>
            ) : null}

            <div className="scroll" ref={scrollElement} onWheel={wheelHandler}>
                <div className="col col-dates">
                    {state?.events?.days?.length
                        ? state.events.days.map((day, index) => {
                              const isActive = isToday(day.time);
                              if (isActive) {
                                  indexDay = index;
                              }
                              return (
                                  <div
                                      className={`${isActive ? "active" : ""}`}
                                      key={day.desc}
                                  >
                                      {day.desc}
                                  </div>
                              );
                          })
                        : null}
                </div>
                <div className="events">
                    <TimeLine scrollElement={scrollElement} />

                    {state?.events?.daysWithEvents?.length
                        ? state.events.daysWithEvents.map((days, index) => (
                              <div className="col" key={index}>
                                  {days.map((pair, index) => (
                                      <div
                                          className="pair"
                                          key={index}
                                          style={{
                                              height: `calc(100% / ${maxNumberPair})`,
                                          }}
                                      >
                                          {pair.map((event, index) => (
                                              <Event key={index} data={event} />
                                          ))}
                                      </div>
                                  ))}
                              </div>
                          ))
                        : null}
                </div>
            </div>

            {state?.events?.days?.length ? (
                <div className="controls">
                    <ScheduleControls
                        scrollElement={scrollElement}
                        indexOfCurr={indexDay}
                    />
                </div>
            ) : null}

            {state?.events?.days?.length ? (
                <div className="group-info">
                    <GroupInfo />
                </div>
            ) : null}
        </div>
    );
};

export default Graph;
