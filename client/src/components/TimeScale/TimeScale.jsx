import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scope.scss";
import { PAIR_TIMES } from "../../constants";

const Markup = () => (
    <div className="markup">
        <div className="line" />
        <div className="line" />
        <div className="line" />
        <div className="line" />
        <div className="line" />
    </div>
);

const TimeScale = () => {
    const maxNumberPair =
        useSelector((state) => state.data.events?.maxNumberPair - 1) ?? 0;

    return (
        <div className="times">
            {maxNumberPair
                ? PAIR_TIMES.map((pair, index) => {
                      if (index <= maxNumberPair) {
                          return (
                              <div className="lesson" key={index}>
                                  <Markup />
                                  <div className="time">{pair[0]}</div>
                                  <div className="time">{pair[1]}</div>
                              </div>
                          );
                      }
                  })
                : null}
        </div>
    );
};

export default TimeScale;
