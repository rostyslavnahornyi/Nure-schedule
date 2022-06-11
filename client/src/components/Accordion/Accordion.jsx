import React from "react";
import { useSelector } from "react-redux";
import { defaultPairColors, pairNames } from "../../constants";
import AccordionTab from "../AccordionTab/AccordionTab";
import "./style.scoped.scss";

import { styled } from "@mui/material/styles";
import AccordionMUI from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StyledAccordion = styled((props) => (
    <AccordionMUI disableGutters elevation={0} square {...props} />
))(() => ({
    border: "none",
}));

const StyledAccordionSummary = styled((props) => (
    <AccordionSummary {...props} />
))(() => ({
    backgroundColor: "rgb(196, 196, 196)",
    border: "none",
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: "rgb(196, 196, 196)",
}));

const Accordion = () => {
    const state = useSelector((store) => store.data);

    return (
        <div>
            <StyledAccordion>
                <StyledAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className="summary"
                >
                    <div>Templates</div>
                </StyledAccordionSummary>

                <StyledAccordionDetails className="details">
                    {state.events?.types?.length ? state.events.types.map((type, index) => {
                        const name = pairNames.find((obj) => obj.value === type)
                            .name;
                        const color = defaultPairColors[type];

                        return (
                            <AccordionTab
                                className="tab-content"
                                color={`rgb(${color})`}
                                key={index}
                            >
                                {name}
                            </AccordionTab>
                        );
                    }): null}
                </StyledAccordionDetails>
            </StyledAccordion>
        </div>
    );
};

export default Accordion;
