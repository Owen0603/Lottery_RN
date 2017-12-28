import * as ActionType from './actionTypes'

export function showLogin() {
    return (dispatch) =>{
        dispatch({
            type : ActionType.SHOW_LOGIN
        })
    }
}

export function closeLogin() {
    return (dispatch) =>{
        dispatch({
            type : ActionType.CLOSE_LOGIN
        })
    }
}