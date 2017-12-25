import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'


import ChangeTabReducers from './reducers/changeTab_reducer'



const reducer = combineReducers({
    changeTabState: ChangeTabReducers,
})

const middleware = [thunk]
if (process.env.NODE_ENV !== 'production'){
    middleware.push(createLogger())
}

const  store = createStore(
    reducer,
    applyMiddleware(...middleware)
)

export default store