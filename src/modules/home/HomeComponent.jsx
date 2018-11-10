import React from 'react'
import Button from 'component/Button/Button'
import Input from 'component/Input/Input'
import Loader from 'component/Loader'
import TickerContainer from 'home/ticker/TickerContainer'
import TradesContainer from 'home/trades/TradesContainer'
import BooksContainer from 'home/orderbooks/BooksContainer'
import SocketTickerContext from 'utils/sockets/socket-ticker-context'
import SocketBookContext from 'utils/sockets/socket-book-context'
import SocketTradeContext from 'utils/sockets/socket-trade-context'
import { baseSocketUrl } from 'utils/constants'

import './Home.scss'

class HomeComponent extends React.Component {
	handleChangeValue = (e) => this.props.changeTicker(e.target.value)
	
	fetchTicker = () => {
		console.log('pros', this.props.ticker)
		const formattedTicker = this.props.ticker.substr(0, 1).toLowerCase() + this.props.ticker.substr(1, this.props.ticker.length).toUpperCase()
		console.log('formattedTicker', formattedTicker)
		this.props.fetchTickerData(formattedTicker, this.props.tickerSocket, this.props.bookSocket, this.props.tradeSocket)
	}
	
	render() {
		return (
			<div>
				{this.props.showSpinner ? <Loader/> : null}
				<div className='ws-controls'>
					<div>WebSocket Controls:</div>
					<div><a onClick={this.props.connect}>Connect</a></div>
					<div><a onClick={this.props.disconnect}>Disconnect</a></div>
				</div>
				<p>{`Enter the ticker you wish to view`}</p>
				<Input value={this.props.ticker} label={`Tickers:`} name={`tickers`} onChange={this.handleChangeValue}/>
				<Button onClick={this.fetchTicker} text='Get Ticker Data'/>
				<TickerContainer/>
				<div className='books-trade'>
					<TradesContainer/>
					<BooksContainer/>
				</div>
			</div>
		)
	}
}

const HomeComponentWithSocket = props => (
	<SocketTickerContext.Consumer>
		{tickerSocket => (
			<SocketBookContext.Consumer>
				{bookSocket => (
					<SocketTradeContext.Consumer>
						{tradeSocket => (
							<HomeComponent {...props} tickerSocket={tickerSocket} bookSocket={bookSocket}
										   tradeSocket={tradeSocket}/>
						)}
					</SocketTradeContext.Consumer>
				)}
			</SocketBookContext.Consumer>
		)}
	</SocketTickerContext.Consumer>
)

export default HomeComponentWithSocket