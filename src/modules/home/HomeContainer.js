import { connect } from 'react-redux'
import HomeComponent from './HomeComponent'
import { tickerOperations } from './duck/index'
import PropTypes from 'prop-types'

const mapStateToProps = (state) => {
	const { tickerData, orderBookData, tradeData, showSpinner } = state.ticker
	return {
		tickerData,
		orderBookData,
		tradeData,
		showSpinner
	}
}

const mapDispatchToProps = (dispatch) => {
	const fetchTickerData = (ticker) => {
		dispatch(tickerOperations.fetchTickerData(ticker))
	}
	return { fetchTickerData }
}

const HomeContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeComponent)

HomeContainer.propTypes = {
	tickerData: PropTypes.array,
	orderBookData: PropTypes.array,
	tradeData: PropTypes.array,
	showSpinner: PropTypes.bool
}

HomeContainer.defaultProps = {
	tickerData: [],
	orderBookData: [],
	tradeData: [],
	showSpinner: false
}

export default HomeContainer