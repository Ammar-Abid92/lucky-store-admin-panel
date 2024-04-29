import initialState from "./initialState";
import { LOADING } from "../actions/types";

export const loadingReducer = (state = initialState.loading, action) => {
    switch (action.type) {
        case LOADING.SET_LOADING_TRUE:
            return true;
        case LOADING.SET_LOADING_FALSE:
            return false;
        default:
            return state
    }
}

export const backupLoadingReducer = (state = initialState.backupLoading, action) => {
    switch (action.type) {
        case LOADING.SET_BACKUP_LOADING_TRUE:
            return true;
        case LOADING.SET_BACKUP_LOADING_FALSE:
            return false;
        default:
            return state
    }
}

export const restoringReducer = (state = initialState.restoring, action) => {
    switch (action.type) {
        case LOADING.SET_RESTORING_TRUE:
            return true;
        case LOADING.SET_RESTORING_FALSE:
            return false;
        default:
            return state
    }
}