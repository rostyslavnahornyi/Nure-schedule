import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeGroups } from "../../redux/actions/creators/group";
import { removeData } from "../../redux/actions/creators/data";
import "./style.scoped.scss";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const MyGroupsModal = () => {
    const dispatch = useDispatch();
    const state = useSelector((store) => store.group);

    const [checkedItems, setCheckedItems] = React.useState([]);

    const btnHandler = () => {
        if (checkedItems.length) {
            dispatch(removeGroups(checkedItems));
            dispatch(removeData());
        }
    };

    const handleToggle = (value) => () => {
        const currentIndex = checkedItems.indexOf(value);
        const newChecked = [...checkedItems];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setCheckedItems(newChecked);
    };

    return (
        <div className="wrapper">
            <Button variant="outlined" color="error" onClick={btnHandler}>
                <DeleteIcon />
            </Button>

            <div className="list">
                {state.myGroups.map((group) => (
                    <ListItem
                        key={group.id}
                        className="item"
                        secondaryAction={<></>}
                    >
                        <ListItemButton
                            className="button"
                            onClick={handleToggle(group)}
                            dense
                        >
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    tabIndex={-1}
                                    checked={checkedItems.indexOf(group) !== -1}
                                    inputProps={{
                                        "aria-labelledby": group.id,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={group.id} primary={group.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </div>
        </div>
    );
};

export default MyGroupsModal;
