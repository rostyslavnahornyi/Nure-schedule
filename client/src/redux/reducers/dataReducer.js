import types from "../actions/types";

const initialState = {
    status: null,
    error: null,
    events: JSON.parse(localStorage.getItem("events")) ?? null,
    lastUpdate: JSON.parse(localStorage.getItem("lastUpdate")) ?? null,
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_DATA_PENDING:
            return { ...state, status: action.status };

        case types.GET_DATA_SUCCESS:
            localStorage.setItem("events", JSON.stringify(action.payload));
            return { ...state, status: action.status, events: action.payload };

        case types.GET_DATA_FAIL:
            return {
                ...state,
                events: [],
                status: action.status,
                error: action.error,
            };

        case types.REMOVE_DATA:
            localStorage.removeItem("events");
            return { ...state, events: [] };

        case types.SET_LAST_UPDATE:
            const lastUpdate = {
                date: action.payload.date,
                time: action.payload.time,
            };
            localStorage.setItem("lastUpdate", JSON.stringify(lastUpdate));
            return { ...state, lastUpdate };

        case types.REMOVE_LAST_UPDATE:
            localStorage.removeItem("lastUpdate");
            return { ...state, lastUpdate: null };

        default:
            return state;
    }
};

export default dataReducer;
