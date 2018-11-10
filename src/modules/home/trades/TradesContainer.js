import { connect } from 'react-redux'
import TradesComponent from './TradesComponent'
import PropTypes from 'prop-types'
import React from 'react'

const mapStateToProps = (state) => {
	const { ticker, tradeData } = state.ticker
	return {
		tradeData,
		ticker
	}
}

const TradeContainer = connect(
	mapStateToProps
)(TradesComponent)

TradeContainer.propTypes = {
	tradeData: PropTypes.array
}

TradeContainer.defaultProps = {
	tradeData: []
}

export default TradeContainer