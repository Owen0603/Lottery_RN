import * as ActionType from '../actions/actionTypes'

const initialState = {
    loginPageVisible:false,
}

export default Todo = (state = initialState, action) =>{
    switch(action.type){
        case ActionType.SHOW_LOGIN:
            return{
                ...state,
                loginPageVisible:true,
            }
        case ActionType.CLOSE_LOGIN:
            return{
                ...state,
                loginPageVisible:false,
            }
        default:
            return state
    }
}