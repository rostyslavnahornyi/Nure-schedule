import {combineReducers} from "redux";

import groupReducer from "./groupReducer";
import dataReducer from "./dataReducer";

const rootReducers = combineReducers({
    group: groupReducer,
    data: dataReducer,
})

export default rootReducers;