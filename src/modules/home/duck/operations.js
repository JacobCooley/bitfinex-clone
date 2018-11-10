import fetch from 'cross-fetch'
import { Creators } from './actions'
import { baseApiUrl } from 'utils/constants'
import { fundingTickerStructure, tradingTickerStructure } from 'structures/tickers'

const requestTickerJsonAction = Creators.requestTickerJson
const receiveTickerJsonAction = Creators.receiveTickerJson

const fetchTickerData = (ticker) => {
	return async dispatch => {
		dispatch(requestTickerJsonAction(ticker))
		let data
		try {
			const response = await fetch(`${baseApiUrl}/ticker/${ticker}`, {
				method: "GET",
				headers: {
					'X-Requested-With': 'XMLHttpRequest'
				}
			})
			const responseData = await response.json()
			console.log('respdata', responseData)
			data = responseData.map((value, i) => {
				const structure = ticker.substr(0, 1) === ('t') ? tradingTickerStructure : fundingTickerStructure
				const newValueObject = {}
				newValueObject[structure[i]] = value
				return newValueObject
			})
		} catch (e) {
			console.error('ERROR', e)
		}
		dispatch(receiveTickerJsonAction(data))
	}
}

const fetchOrderBookData = (tickers) => {
	return async dispatch => {
		dispatch(requestTickersJsonAction(tickers))
		let data
		console.log('tickers', tickers)
		try {
			const response = await fetch(`${baseApiUrl}/tickers?symbols=${tickers.join()}`, {
				method: "GET",
				headers: {
					'X-Requested-With': 'XMLHttpRequest'
				}
			})
			const responseData = await response.json()
			data = responseData.map((array) => {
				const structure = array[0].substr(0, 1) === ('t') ? tradingTickerStructure : fundingTickerStructure
				return array.map((value, i) => {
					const newValueObject = {}
					newValueObject[structure[i]] = value
					return newValueObject
				})
			})
		} catch (e) {
			console.error('ERROR', e)
		}
		dispatch(receiveTickersJsonAction(data))
	}
}

const fetchTradeData = (tickers) => {
	return async dispatch => {
		dispatch(requestTickersJsonAction(tickers))
		let data
		console.log('tickers', tickers)
		try {
			const response = await fetch(`${baseApiUrl}/tickers?symbols=${tickers.join()}`, {
				method: "GET",
				headers: {
					'X-Requested-With': 'XMLHttpRequest'
				}
			})
			const responseData = await response.json()
			data = responseData.map((array) => {
				const structure = array[0].substr(0, 1) === ('t') ? tradingTickerStructure : fundingTickerStructure
				return array.map((value, i) => {
					const newValueObject = {}
					newValueObject[structure[i]] = value
					return newValueObject
				})
			})
		} catch (e) {
			console.error('ERROR', e)
		}
		dispatch(receiveTickersJsonAction(data))
	}
}

export default {
	fetchTickerData,
	fetchOrderBookData,
	fetchTradeData
}