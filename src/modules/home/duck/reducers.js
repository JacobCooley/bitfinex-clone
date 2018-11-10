import { createReducer } from 'reduxsauce'
import { Types } from './actions'

export const INITIAL_STATE = {
    ticker: '',
    showSpinner: false,
    tickerData: [],
    orderBookData: [],
    tradeData: []
}


export const request_ticker_json = (state = INITIAL_STATE, action) => {
    const { tickers } = action;
    return {
        ...state,
		tickers,
		tickerData: [],
		orderBookData: [],
        tradeData: [],
        showSpinner: true
    }
}

export const receive_ticker_json = (state = INITIAL_STATE, action) => {
    const { tickerData } = action;
    return {
        ...state,
		tickerData,
        showSpinner: false
    }
}

export const receive_order_book_json = (state = INITIAL_STATE, action) => {
	const { orderBookData } = action;
	return {
		...state,
		orderBookData,
		showSpinner: false
	}
}

export const receive_trade_json = (state = INITIAL_STATE, action) => {
	const { tradeData } = action;
	return {
		...state,
		tradeData,
		showSpinner: false
	}
}

export const HANDLERS = {
    [Types.REQUEST_TICKER_JSON]: request_ticker_json,
    [Types.RECEIVE_TICKER_JSON]: receive_ticker_json,
    [Types.RECEIVE_ORDER_BOOK_JSON]: receive_order_book_json,
    [Types.RECEIVE_TRADE_JSON]: receive_trade_json,
}

export default createReducer(INITIAL_STATE, HANDLERS)