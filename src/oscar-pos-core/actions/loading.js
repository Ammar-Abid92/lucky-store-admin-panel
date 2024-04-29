import { LOADING } from './types'

export const setLoadingTrue = () => {
    return dispatch => {
        dispatch({
            type: LOADING.SET_LOADING_TRUE
        })
    }
}

export const setLoadingFalse = () => {
    return dispatch => {
        dispatch({
            type: LOADING.SET_LOADING_FALSE
        })
    }
}

export const setBackupoadingTrue = () => {
    return dispatch => {
        dispatch({
            type: LOADING.SET_BACKUP_LOADING_TRUE
        })
    }
}

export const setBackupoadingFalse = () => {
    return dispatch => {
        dispatch({
            type: LOADING.SET_BACKUP_LOADING_FALSE
        })
    }
}

export const setRestoringTrue = () => {
    return dispatch => {
        dispatch({
            type: LOADING.SET_RESTORING_TRUE
        })
    }
}

export const setRestoringFalse = () => {
    return dispatch => {
        dispatch({
            type: LOADING.SET_RESTORING_FALSE
        })
    }
}