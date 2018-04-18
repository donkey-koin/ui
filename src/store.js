import { createStore, combineReducers, applyMiddleware } from 'redux'
import status from './reducers/login'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    status: status
})

const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

export default store;