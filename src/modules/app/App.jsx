import React, { Component } from 'react'
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom'
import Home from 'home/HomeContainer'
import Header from 'app/header/HeaderComponent'
import { baseSocketUrl } from 'utils/constants'
import SocketTickerContext from 'utils/sockets/socket-ticker-context'
import SocketBookContext from 'utils/sockets/socket-book-context'
import SocketTradeContext from 'utils/sockets/socket-trade-context'
let tickerSocket = new WebSocket(baseSocketUrl)
let tradeSocket = new WebSocket(baseSocketUrl)
let bookSocket = new WebSocket(baseSocketUrl)
import './App.scss'
import { tickerOperations } from '../home/duck'

class App extends Component {
	
	componentDidMount(){
		this.connect()
	}
	
	connect = () => {
		tickerSocket = new WebSocket(baseSocketUrl)
		bookSocket = new WebSocket(baseSocketUrl)
		tradeSocket = new WebSocket(baseSocketUrl)
		bookSocket.addEventListener('open', function (event) {
			console.log('booksocket opened')
		})
		tradeSocket.addEventListener('open', function (event) {
			console.log('tradeSocket opened')
		})
		tickerSocket.addEventListener('open', function (event) {
			console.log('tickerSocket opened')
		})
		bookSocket.addEventListener('close', function (event) {
			console.log('booksocket closed')
		})
		tradeSocket.addEventListener('close', function (event) {
			console.log('tradeSocket closed')
		})
		tickerSocket.addEventListener('close', function (event) {
			console.log('tickerSocket closed')
		})
	}
	
	disconnect = () => {
		tickerSocket.close()
		bookSocket.close()
		tradeSocket.close()
	}
	
	render() {
		return (
			<SocketTickerContext.Provider value={tickerSocket}>
				<SocketBookContext.Provider value={bookSocket}>
					<SocketTradeContext.Provider value={tradeSocket}>
						<Router>
							<div className='container'>
								<Header/>
								<main>
									<Home connect={this.connect} disconnect={this.disconnect}/>
								</main>
							</div>
						</Router>
					</SocketTradeContext.Provider>
				</SocketBookContext.Provider>
			</SocketTickerContext.Provider>
		)
	}
}

export default App