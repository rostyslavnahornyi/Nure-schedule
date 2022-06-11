import React, { useState } from "react";
import "./style.scoped.scss";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const AlertWindow = React.forwardRef(function AlertWindow(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Alert = ({ children, status = "info" }) => {
    const [open, setOpen] = useState(true);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <AlertWindow
                onClose={handleClose}
                severity={status}
                sx={{ width: "100%" }}
            >
                <div className="content">{children}</div>
            </AlertWindow>
        </Snackbar>
    );
};

export default Alert;
