import React from "react";
import "./style.scoped.scss";

const AccordionTab = ({ children, color }) => (
    <div className="tab-content">
        <div style={{ background: color }} className="color" />
        <div className="text">{children}</div>
    </div>
);

export default AccordionTab;
