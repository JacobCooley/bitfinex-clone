import { Creators } from './actions'
import { fundingTickerStructure, tradingTickerStructure, orderBookStructure, tradeStructure } from 'utils/data-structures'
const requestTickerJsonAction = Creators.requestTickerJson
const changeTickerJsonAction = Creators.changeTickerString
const receiveTickerJsonAction = Creators.receiveTickerJson
const receiveOrderBookJsonAction = Creators.receiveOrderBookJson
const receiveTradeJsonAction = Creators.receiveTradeJson

const changeTicker = (ticker) => {
	return dispatch => dispatch(changeTickerJsonAction(ticker))
}

const fetchTickerData = (data) => {
	return async dispatch => {
		const tickerData = JSON.parse(data)
		if (tickerData[1] && tickerData[1].length > 7) {
			const structure = tickerData[1].length <= 10 ? tradingTickerStructure : fundingTickerStructure
			const tickerStructure = tickerData[1].map((value, i) => {
				const newValueObject = {}
				newValueObject[structure[i]] = value
				return newValueObject
			})
			dispatch(receiveTickerJsonAction(tickerStructure))
		}
	}
}

const fetchOrderBookData = (data) => {
	return async dispatch => {
		const bookData = JSON.parse(data)
		if (bookData[1] && bookData[1].length > 20) {
			const structure = orderBookStructure
			const bookStructure = bookData[1].map((bookArray, i) => {
				let newValueObject = {}
				bookArray.forEach((bookValue, i) => {
					const newValue = structure[i]
					newValueObject[newValue] = bookValue
				})
				return newValueObject
			})
			dispatch(receiveOrderBookJsonAction(bookStructure))
		}
	}
}

const fetchTradeData = (data) => {
	return async dispatch => {
		const tradeData = JSON.parse(data)
		if (tradeData[1] && tradeData[1].length > 2) {
			const structure = tradeStructure
			const tradedStructure = tradeData[1].map((tradeArray, index) => {
				let newValueObject = {}
				tradeArray.forEach((tradeValue, i) => {
					const newValue = structure[i]
					newValueObject[newValue] = tradeValue
				})
				return newValueObject
			})
			dispatch(receiveTradeJsonAction(tradedStructure))
		}
	}
}

export default {
	fetchTickerData,
	fetchOrderBookData,
	fetchTradeData,
	changeTicker
}