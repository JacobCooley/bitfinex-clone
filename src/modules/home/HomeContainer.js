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
	
	const changeTicker = (ticker) => {
		dispatch(tickerOperations.changeTicker(ticker))
	}
	return { changeTicker, dispatch }
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