import React from 'react';
import Button from 'component/Button/Button'
import Input from 'component/Input/Input'
import Loader from 'component/Loader'

class HomeComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ticker: 'tBTCUSD'
		}
	}
	
	handleChangeValue = (e) => this.setState({ ticker: e.target.value })
	
	fetchTicker = () => {
		const formattedTicker = this.state.ticker.substr(0, 1).toLowerCase() + this.state.ticker.substr(1, this.state.ticker.length)
		this.props.fetchTickerData(formattedTicker)
	}
	
	render() {
		return (
			<div>
				{this.props.showSpinner ? <Loader/> : null}
				<p>{`Enter the ticker you wish to view`}</p>
				<Input value={this.state.ticker} label={`Tickers:`} name={`tickers`} onChange={this.handleChangeValue}/>
				<Button onClick={this.fetchTicker} text='Get Ticker Data'/>
			</div>
		)
	}
}

export default HomeComponent;