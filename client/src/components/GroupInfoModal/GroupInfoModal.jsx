import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./style.scoped.scss";

import { styled } from "@mui/material/styles";
import AccordionMUI from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { pairNames } from "../../constants";

const StyledAccordion = styled((props) => (
    <AccordionMUI disableGutters elevation={0} square {...props} />
))(() => ({
    borderLeft: "orange 3px solid",
    marginBottom: "5px",
    borderTop: "none",
}));

const StyledAccordionSummary = styled((props) => (
    <AccordionSummary {...props} />
))(() => ({
    backgroundColor: "rgb(220, 220, 220)",
    border: "none",
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: "rgb(220, 220, 220)",
}));

const GroupInfoModal = () => {
    const state = useSelector((store) => store.data.events);
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className="wrapper">
            <p className="title">Info</p>

            <StyledAccordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
            >
                <StyledAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className="summary"
                >
                    <div>Предметы</div>
                </StyledAccordionSummary>

                <StyledAccordionDetails className="details">
                    <div className="subjects">
                        {state.subjects.map((subject) => {
                            const sumHours = subject.hours.reduce(
                                (curr, value) => value.val + curr,
                                0
                            );

                            return (
                                <div className="subject" key={subject.id}>
                                    <div className="title">
                                        {subject.title} | {subject.brief} -{" "}
                                        {sumHours} часов:
                                    </div>

                                    <ul>
                                        {subject.hours.map((type, index) => (
                                            <li key={index}>
                                                {
                                                    pairNames[
                                                        +type.type.toString()[0]
                                                    ].name
                                                }{" "}
                                                — {type.val} часов
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </StyledAccordionDetails>
            </StyledAccordion>

            <StyledAccordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
            >
                <StyledAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className="summary"
                >
                    <div>Учителя</div>
                </StyledAccordionSummary>

                <StyledAccordionDetails className="details">
                    <ul>
                        {state.teachers.map((teacher, index) => (
                            <li key={index}>
                                {teacher.full_name} — {teacher.short_name}
                            </li>
                        ))}
                    </ul>
                </StyledAccordionDetails>
            </StyledAccordion>
        </div>
    );
};

export default GroupInfoModal;
