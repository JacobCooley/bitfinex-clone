import { connect } from 'react-redux'
import HomeComponent from './HomeComponent'
import { tickerOperations } from './duck/index'
import PropTypes from 'prop-types'
import React from 'react'

const mapStateToProps = (state, ownProps) => {
	const { ticker, tickerData, bookData, tradeData, showSpinner } = state.ticker
	return {
		ticker,
		tickerData,
		bookData,
		tradeData,
		showSpinner,
		ownProps
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const fetchTickerData = (ticker, tickerSocket, bookSocket, tradeSocket) => {
		if (tickerSocket.readyState !== tickerSocket.CLOSED && bookSocket.readyState !== bookSocket.CLOSED && tradeSocket.readyState !== tradeSocket.CLOSED) {
			tickerSocket.send(JSON.stringify({
				event: 'subscribe',
				channel: 'ticker',
				symbol: ticker
			}))
			tickerSocket.addEventListener('message', function (event) {
				dispatch(tickerOperations.fetchTickerData(event.data))
			})
			
			bookSocket.send(JSON.stringify({
				event: 'subscribe',
				channel: 'book',
				symbol: ticker
			}))
			bookSocket.addEventListener('message', function (event) {
				dispatch(tickerOperations.fetchOrderBookData(event.data))
			})
			tradeSocket.send(JSON.stringify({
				event: 'subscribe',
				channel: 'trades',
				symbol: ticker
			}))
			tradeSocket.addEventListener('message', function (event) {
				dispatch(tickerOperations.fetchTradeData(event.data))
			})
		} else {
			console.error("Websocket Closed!")
		}
	}
	const changeTicker = (ticker) => {
		dispatch(tickerOperations.changeTicker(ticker))
	}
	return { fetchTickerData, changeTicker }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const newprops = {
		...dispatchProps,
		...stateProps,
		bookData: stateProps.bookData,
		...ownProps
	}
	console.log('new', newprops)
	return newprops
}


const HomeContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeComponent)

HomeContainer.propTypes = {
	tickerData: PropTypes.array,
	bookData: PropTypes.array,
	tradeData: PropTypes.array,
	showSpinner: PropTypes.bool,
	ticker: PropTypes.string
}

HomeContainer.defaultProps = {
	tickerData: [],
	bookData: [],
	tradeData: [],
	showSpinner: false,
	ticker: 'tbtcusd'
}

export default HomeContainer