import React from "react";
import "./style.scoped.scss";

const Modal = ({ active, setActive, children }) => {
    return (
        <div
            className={active ? "modal active" : "modal"}
            onClick={() => setActive(false)}
            onWheel={(e) => {e.stopPropagation()}}   
        >
            <div className="content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
