import types from "../types.js";
import axios from "axios";

const getDataPending = () => ({
    type: types.GET_DATA_PENDING,
    status: "PENDING",
});
const getDataSuccess = (data) => ({
    type: types.GET_DATA_SUCCESS,
    status: "SUCCESS",
    payload: data,
});
const getDataFail = (error) => ({
    type: types.GET_DATA_FAIL,
    status: "FAIL",
    error: error,
});

const setLastUpdate = (data) => ({
    type: types.SET_LAST_UPDATE,
    payload: data,
});
const removeLastUpdate = () => ({
    type: types.REMOVE_LAST_UPDATE,
});

export const getData = () => (dispatch) => {
    dispatch(removeLastUpdate());

    const currGroupId = JSON.parse(localStorage.getItem("currentGroup"))["id"];
    if (currGroupId) {
        dispatch(getDataPending());

        axios
            .get(`https://nure-schedule-v2.herokuapp.com/schedule?id=${currGroupId}`)
            .then((response) => {
                const date = new Date().toLocaleString().split(",");

                dispatch(getDataSuccess(response.data));
                dispatch(
                    setLastUpdate({
                        date: date[0],
                        time: date[1],
                    })
                );
            })
            .catch((error) => dispatch(getDataFail(error.message)));
    } // todo if !!group
};

export const removeData = () => ({
    type: types.REMOVE_DATA,
});
