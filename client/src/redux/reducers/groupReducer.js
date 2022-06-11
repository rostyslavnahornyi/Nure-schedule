import types from "../actions/types";

const initialState = {
    allGroups: [],
    status: null,

    myGroups: JSON.parse(localStorage.getItem("groups")) ?? [],
    current: JSON.parse(localStorage.getItem("currentGroup")) ?? null,
};

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_GROUPS_PENDING:
            return { ...state, status: action.status };

        case types.GET_GROUPS_SUCCESS:
            return {
                ...state,
                status: action.status,
                allGroups: action.payload,
            };

        case types.GET_GROUPS_FAIL:
            return { ...state, status: action.status };

        case types.PREV_GROUP: {
            const groupIdx = state.myGroups.findIndex(
                (group) => group.id === state.current.id
            );
            const current =
                state.myGroups[groupIdx - 1] ??
                state.myGroups[state.myGroups.length - 1];

            localStorage.setItem("currentGroup", JSON.stringify(current));
            localStorage.removeItem("events");
            return { ...state, current };
        }

        case types.NEXT_GROUP: {
            const groupIdx = state.myGroups.findIndex(
                (group) => group.id === state.current.id
            );
            const current = state.myGroups[groupIdx + 1] ?? state.myGroups[0];

            localStorage.setItem("currentGroup", JSON.stringify(current));
            localStorage.removeItem("events");
            return { ...state, current };
        }

        case types.ADD_GROUP:
            return {
                ...state,
                myGroups: action.payload,
                current: action.current,
            };

        case types.REMOVE_GROUPS:
            const groups = state.myGroups.filter(
                (value) => !action.payload.includes(value)
            );

            let current = state.current;
            const isCurrentInMyGroups = groups.some((group) => {
                return group.id === state.current.id;
            });
            if (!isCurrentInMyGroups) {
                current = groups.length ? groups[0] : {};
            }

            localStorage.setItem("groups", JSON.stringify(groups));
            localStorage.setItem("currentGroup", JSON.stringify(current));

            return { ...state, myGroups: groups, current };

        default:
            return state;
    }
};

export default groupReducer;
