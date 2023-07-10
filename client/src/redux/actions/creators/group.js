import axios from "axios";
import types from "../types";

const getGroupsPending = () => ({
    type: types.GET_GROUPS_PENDING,
    status: "PENDING",
});
const getGroupsSuccess = (groups) => ({
    type: types.GET_GROUPS_SUCCESS,
    status: "SUCCESS",
    payload: groups,
});
const getGroupsFail = () => ({
    type: types.GET_GROUPS_FAIL,
    status: "FAIL",
});

export const getGroups = () => (dispatch) => {
    dispatch(getGroupsPending());

    axios
        .get("https://nure-schedule.onrender/groups")
        .then((response) => dispatch(getGroupsSuccess(response.data)))
        .catch(() => dispatch(getGroupsFail())); // cist isnt working only
};

export const prevGroup = () => ({
    type: types.PREV_GROUP,
});

export const nextGroup = () => ({
    type: types.NEXT_GROUP,
});

export const addGroup = (group) => {
    const oldGroups = JSON.parse(localStorage.getItem("groups")) || [];
    let newGroups = [];

    if (!oldGroups.length) {
        newGroups.push(group);
    } else {
        if (!oldGroups.find((obj) => obj["id"] === group["id"])) {
            newGroups = [...oldGroups, group];
        } else {
            newGroups = [...oldGroups];
        }
    }

    localStorage.setItem("groups", JSON.stringify(newGroups));
    localStorage.setItem("currentGroup", JSON.stringify(group));

    return {
        type: types.ADD_GROUP,
        current: group,
        payload: newGroups,
    };
};

export const removeGroups = (groups) => ({
    type: types.REMOVE_GROUPS,
    payload: groups,
});
