import initialState from "./initialState";
import { QUIZ } from "../actions/types";

export const quizStartDateReducer = (state = initialState.quiz_start_date, action) => {
    switch(action.type) {
        case QUIZ.SET_QUIZ_START_DATE:
            return action.payload;
        default:
            return state
    }
}

export const quizEndDateReducer = (state = initialState.quiz_end_date, action) => {
    console.log('coming here?', action);
    switch(action.type) {
        case QUIZ.SET_QUIZ_END_DATE:
            console.log("Action payload", action.payload)
            return action.payload;
        default:
            return state
    }
}