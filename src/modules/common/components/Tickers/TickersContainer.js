import { connect } from 'react-redux'
import TickersComponent from './TickersComponent'
import { tickerOperations } from './duck/index'
import PropTypes from 'prop-types'

const mapStateToProps = (state) => {
	const { tickersData, showSpinner } = state.tickers
	return {
		tickersData,
		showSpinner
	}
}

const mapDispatchToProps = (dispatch) => {
	const fetchTickersJson = (tickers) => {
		dispatch(tickerOperations.fetchTickersJson(tickers))
	}
	return { fetchTickersJson }
}

const TickersContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(TickersComponent)

TickersContainer.propTypes = {
	tickersData: PropTypes.array,
	showSpinner: PropTypes.bool
}

TickersContainer.defaultProps = {
	tickersData: [],
	showSpinner: false
}

export default TickersContainer