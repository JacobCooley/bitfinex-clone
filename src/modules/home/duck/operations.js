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
		console.log('tickerdata', tickerData)
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

const fetchOrderBookData = (data, currentBookData) => {
	return async dispatch => {
		const bookData = JSON.parse(data)
		if (bookData[1] && bookData[1].length > 2) {
			const structure = orderBookStructure
			let bookStructuredData
			if(bookData[1].length > 4) {
				bookStructuredData = bookData[1].map((bookArray, i) => {
					let newValueObject = {}
					bookArray.forEach((bookValue, i) => {
						const newValue = structure[i]
						newValueObject[newValue] = bookValue
					})
					return newValueObject
				})
			}else {
				let newValueObject = {}
				bookData[1].forEach((bookValue, i) => {
					const newValue = structure[i]
					newValueObject[newValue] = bookValue
				})
				bookStructuredData = newValueObject
			}
			let newBookData
			if(currentBookData.length !== 0 && !Array.isArray(bookStructuredData)){
				let priceFound = false
				newBookData = currentBookData.map((book) => {
					if(book['PRICE'] === bookStructuredData['PRICE']){
						priceFound = true
						return {...book, ...bookStructuredData}
					}
					else{
						return {...book}
					}
				})
				if(!priceFound){
					newBookData.push(bookStructuredData)
					newBookData.sort((a, b) => a['PRICE'] > b['PRICE'])
				}
			} else {
				newBookData = bookStructuredData
			}
			const finalArray = newBookData.filter(book => {
				return book['COUNT'] !== 0
			})
			dispatch(receiveOrderBookJsonAction(finalArray))
		}
	}
}

const fetchTradeData = (data, currentTrades) => {
	return async dispatch => {
		const tradeData = JSON.parse(data)
		console.log('tradeData', tradeData)
		const structure = tradeStructure
		if (tradeData[1] && tradeData[1].length > 2) {
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
		if(tradeData[2]){
			let newValueObject = {}
			tradeData[2].forEach((tradeValue, i) => {
				const newValue = structure[i]
				newValueObject[newValue] = tradeValue
			})
			currentTrades.push(newValueObject)
			currentTrades.sort((a, b) => a['TIME'] > b['TIME'])
			dispatch(receiveTradeJsonAction(currentTrades))
		}
	}
}

export default {
	fetchTickerData,
	fetchOrderBookData,
	fetchTradeData,
	changeTicker
}