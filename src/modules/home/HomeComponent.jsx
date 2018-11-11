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
import './Home.scss'
import { tickerOperations } from './duck'

class HomeComponent extends React.Component {
	handleChangeValue = (e) => this.props.changeTicker(e.target.value)
	
	fetchTicker = () => {
		const formattedTicker = this.props.ticker.substr(0, 1).toLowerCase() + this.props.ticker.substr(1, this.props.ticker.length).toUpperCase()
		console.log('formattedTicker', formattedTicker)
		if (this.props.tickerSocket.readyState !== this.props.tickerSocket.CLOSED && this.props.bookSocket.readyState !== this.props.bookSocket.CLOSED && this.props.tradeSocket.readyState !== this.props.tradeSocket.CLOSED) {
			this.props.tickerSocket.send(JSON.stringify({
				event: 'subscribe',
				channel: 'ticker',
				symbol: formattedTicker
			}))
			this.props.tickerSocket.addEventListener('message', (event) => {
				this.props.dispatch(tickerOperations.fetchTickerData(event.data, this.props.tickerData))
			})
			
			this.props.bookSocket.send(JSON.stringify({
				event: 'subscribe',
				channel: 'book',
				symbol: formattedTicker
			}))
			this.props.bookSocket.addEventListener('message', (event) => {
				this.props.dispatch(tickerOperations.fetchOrderBookData(event.data, this.props.bookData))
			})
			this.props.tradeSocket.send(JSON.stringify({
				event: 'subscribe',
				channel: 'trades',
				symbol: formattedTicker
			}))
			this.props.tradeSocket.addEventListener('message', (event) => {
				this.props.dispatch(tickerOperations.fetchTradeData(event.data, this.props.tradeData))
			})
		} else {
			console.error("Websocket Closed!")
		}
	}
	
	disconnect = () => {
		this.props.tradeSocket.send(JSON.stringify({
			event: 'unsubscribe',
			channel: 'trades'
		}))
		this.props.bookSocket.send(JSON.stringify({
			event: 'unsubscribe',
			channel: 'books'
		}))
		this.props.tickerSocket.send(JSON.stringify({
			event: 'unsubscribe',
			channel: 'ticker'
		}))
		this.props.tickerSocket.close()
		this.props.bookSocket.close()
		this.props.tradeSocket.close()
	}
	
	connect = () => {
		this.props.connect().then(() => {
			if(this.props.ticker !== ''){
				this.fetchTicker()
			}
		})
	}
	
	render() {
		return (
			<div>
				{this.props.showSpinner ? <Loader/> : null}
				<div className='ws-controls'>
					<div>WebSocket Controls:</div>
					<div><a onClick={this.connect}>Connect</a></div>
					<div><a onClick={this.disconnect}>Disconnect</a></div>
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