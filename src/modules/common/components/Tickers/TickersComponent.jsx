import React from 'react'
import { formatNumber } from 'functions/numbers'
import Button from 'component/Button/Button'
import Input from 'component/Input/Input'
import Loader from 'component/Loader'
import './Tickers.scss'

class TickersComponent extends React.Component {
	
	handleChangeValue = (e) => this.setState({ tickers: e.target.value })
	
	fetchTickers = () => {
		const tickersArray = this.state.tickers.split(",").map((item) => {
			const newItem = item.toUpperCase().trim()
			return newItem.substr(0, 1).toLowerCase() + newItem.substr(1, newItem.length)
		})
		this.props.fetchTickersJson(tickersArray)
	}
	
	render() {
		return (
			<>
				{this.props.showSpinner ? <Loader/> : null}
				<p>{`Enter Tickers you want to see. Separate with commas and prepend \'t\' or \'f\'`}</p>
				<Input label={`Tickers:`} name={`tickers`} onChange={this.handleChangeValue}/>
				<Button onClick={this.fetchTickers} text='Show Bitfinex tickers'/>
				<div className='tickers-list'>
					{this.props.tickersData.map((ticker, index) => {
							return (
								<ul key={Object.values(ticker[0])}>
									{
										ticker.map((value, i) => {
											return (
												<li key={Object.values(ticker[0]) + i}>{Object.keys(value)}: {isNaN(Object.values(value)) ? Object.values(value) : formatNumber(Object.values(value))}</li>
											)
										})
									}
								</ul>
							)
						}
					)}
				</div>
			</>
		)
	}
}

export default TickersComponent