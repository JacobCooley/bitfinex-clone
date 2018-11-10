import { combineReducers } from 'redux';
import  tickerReducer  from 'home/duck/reducers'

const rootReducer = combineReducers({
    ticker: tickerReducer
});

export default rootReducer;