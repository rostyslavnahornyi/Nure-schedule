import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGroup, getGroups } from "../../redux/actions/creators/group";
import Alert from "../Alert/Alert";
import "./style.scoped.scss";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { getData } from "../../redux/actions/creators/data";

const filterOptions = createFilterOptions({
    limit: 100,
});

const AddGroupModal = () => {
    const dispatch = useDispatch();
    const state = useSelector((store) => store.group);

    const [open, setOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState({});

    const btnHandler = () => {
        if (selectedGroup.id) {
            dispatch(addGroup(selectedGroup));
            dispatch(getData(selectedGroup.id));
        }
    };

    return (
        <>
            {state.status === "SUCCESS" ? (
                <Alert status="success">Groups loaded!</Alert>
            ) : null}
            {state.status === "FAIL" ? (
                <Alert status="error">Cist not responding...</Alert>
            ) : null}

            <Autocomplete
                id="asynchronous-demo"
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                onChange={(_, value) => setSelectedGroup(value)}
                getOptionLabel={(option) => option.name}
                options={state.allGroups}
                loading={state.status === "PENDING"}
                filterOptions={filterOptions}
                className="search-field"
                renderOption={(props, option) => (
                    <Box
                        component="li"
                        {...props}
                        style={{ fontWeight: 400, fontSize: "18px" }}
                        key={option.id}
                    >
                        {option.name}
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Group (100+)"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {state.status === "PENDING" ? (
                                        <CircularProgress
                                            color="inherit"
                                            size={20}
                                        />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />
            <Button
                variant="outlined"
                color="error"
                className="btn"
                onClick={btnHandler}
            >
                Add
            </Button>
        </>
    );
};

export default AddGroupModal;
