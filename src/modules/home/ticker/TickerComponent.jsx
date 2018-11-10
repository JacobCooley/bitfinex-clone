import React from 'react'
import { formatNumber } from 'functions/numbers'
import "./Ticker.scss"


const TickerComponent = ({ tickerData, ticker }) => {
	const volume = tickerData.map(o => {
		if('VOLUME' in o){
			return formatNumber(Object.values(o)[0])
		}
	})
	const priceChange = tickerData.map(o => {
		if('DAILY_CHANGE' in o){
			return formatNumber(Object.values(o)[0])
		}
	})
	const lastPrice = tickerData.map(o => {
		if('LAST_PRICE' in o){
			return formatNumber(Object.values(o)[0])
		}
	})
	return (
		<div className='ticker'>
			<div>Ticker: {ticker ? ticker : 'None'}</div>
			<div>24hr Vol: {volume}%</div>
			<div>24hr Price Change: {priceChange}%</div>
			<div>Last Price: {lastPrice}</div>
		</div>
	)
}

export default TickerComponent