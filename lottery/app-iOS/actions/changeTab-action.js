import * as ActionType from './actionTypes'


export function changeTab(tab) {
    return (dispatch) =>{
        dispatch({
            type: ActionType.TAB_CHANGE,
            tab:tab
        })
    }
}