import tickerReducer from '../reducers'

describe('>REDUCER --- Test tickerReducer', () => {
	it('+++ reducer for REQUEST_TICKERS_JSON', () => {
		let state = {
			tickers: '',
			tickersData: [],
			showSpinner: false
		}
		state = tickerReducer(state, { type: "REQUEST_TICKERS_JSON", tickers: 'tBTCUSD' })
		expect(state).toEqual({
			tickers: 'tBTCUSD',
			tickersData: [],
			showSpinner: true
		})
	})
	it('+++ reducer for RECEIVE_TICKERS_JSON', () => {
		let state = {
			tickersData: [],
			showSpinner: true
		}
		state = tickerReducer(state, { type: "RECEIVE_TICKERS_JSON", tickersData: ['data1', 'data2'] })
		expect(state).toEqual({ tickersData: ['data1', 'data2'], showSpinner: false })
	})
})