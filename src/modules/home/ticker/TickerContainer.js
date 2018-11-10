import { connect } from 'react-redux'
import TickerComponent from './TickerComponent'
import PropTypes from 'prop-types'
import React from 'react'

const mapStateToProps = (state) => {
	const { ticker, tickerData } = state.ticker
	return {
		tickerData,
		ticker
	}
}

const TickerContainer = connect(
	mapStateToProps
)(TickerComponent)

TickerContainer.propTypes = {
	tickerData: PropTypes.array
}

TickerContainer.defaultProps = {
	tickerData: []
}

export default TickerContainer