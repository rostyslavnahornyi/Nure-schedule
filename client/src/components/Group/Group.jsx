import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { prevGroup, nextGroup } from "../../redux/actions/creators/group";
import { getData, removeData } from "../../redux/actions/creators/data";
import "./style.scope.scss";

const Group = () => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);

    const prevGroupHandler = () => {
        dispatch(prevGroup());
        dispatch(removeData());
        dispatch(getData(store.group.current.id));
    };
    const nextGroupHandler = () => {
        dispatch(nextGroup());
        dispatch(removeData());
        dispatch(getData(store.group.current.id));
    };

    return (
        <div className="group">
            
            <div className="btn-controls" onClick={prevGroupHandler}>
                &#10094;
            </div>

            <div className="value">
                {store?.group?.current?.name ?? "your group"}
            </div>

            <div className="btn-controls" onClick={nextGroupHandler}>
                &#10095;
            </div>
        </div>
    );
};

export default Group;
