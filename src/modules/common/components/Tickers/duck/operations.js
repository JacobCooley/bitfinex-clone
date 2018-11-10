import fetch from 'cross-fetch'
import { Creators } from './actions'
import { baseApiUrl } from 'utils/constants'
import { fundingTickerStructure, tradingTickerStructure } from 'utils/data-structures'
const requestTickersJsonAction = Creators.requestTickersJson
const receiveTickersJsonAction = Creators.receiveTickersJson

const fetchTickersJson = (tickers) => {
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
	fetchTickersJson
}