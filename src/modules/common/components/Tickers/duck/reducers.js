import { createReducer } from 'reduxsauce'
import { Types } from './actions'

export const INITIAL_STATE = {
    tickers: '',
    showSpinner: false,
    tickersData: []
}


export const request_tickers_json = (state = INITIAL_STATE, action) => {
    const { tickers } = action;
    return {
        ...state,
		tickers,
		tickersData: [],
        showSpinner: true
    }
}

export const receive_tickers_json = (state = INITIAL_STATE, action) => {
    const { tickersData } = action;
    return {
        ...state,
		tickersData,
        showSpinner: false
    }
}

export const HANDLERS = {
    [Types.REQUEST_TICKERS_JSON]: request_tickers_json,
    [Types.RECEIVE_TICKERS_JSON]: receive_tickers_json
}

export default createReducer(INITIAL_STATE, HANDLERS)