import React from 'react'
import { formatNumber, timeConverter } from 'functions/numbers'
import "./Trade.scss"
import shortid from 'shortid'


const TradeComponent = ({ tradeData, ticker }) => {
	const list = tradeData.map(trade => {
		const time = timeConverter(parseInt(trade['TIME']))
		const price = formatNumber(trade['PRICE'] , 2)
		const amount = trade['AMOUNT']
		return (<li key={shortid.generate()}>{`${time} | ${price} | ${amount}`}</li>)
	})
	return (
		<div className='trade'>
			<h5>{tradeData.length > 0 ? 'Trades' : null}</h5>
			<ul>
				{list}
			</ul>
		</div>
	)
}

export default TradeComponent