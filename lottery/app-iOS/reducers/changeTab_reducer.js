
import * as ActionType from '../actions/actionTypes'

export default Todo = (state = {}, action) => {
    if (action.type === ActionType.TAB_CHANGE){
        return {
            ...state,
            tab:action.tab
        }
    }else {
        return state
    }
}