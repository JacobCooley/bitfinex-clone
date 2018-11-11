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
let tickerSocket
let tradeSocket
let bookSocket
import './App.scss'
import { tickerOperations } from '../home/duck'

class App extends Component {
	
	componentDidMount(){
		this.connect()
	}
	
	connect = () => {
		console.log('connect')
		const tickerPromise = new Promise((resolve, reject) => {
			tickerSocket = new WebSocket(baseSocketUrl)
			tickerSocket.addEventListener('open', function (event) {
				console.log('tickerSocket opened')
				resolve('opened')
			})
			tickerSocket.addEventListener('close', function (event) {
				console.log('tickerSocket closed')
			})
		})
		const bookPromise = new Promise((resolve, reject) => {
			bookSocket = new WebSocket(baseSocketUrl)
			bookSocket.addEventListener('open', function (event) {
				console.log('tickerSocket opened')
				resolve('opened')
			})
			bookSocket.addEventListener('close', function (event) {
				console.log('tickerSocket closed')
			})
		})
		const tradePromise = new Promise((resolve, reject) => {
			tradeSocket = new WebSocket(baseSocketUrl)
			tradeSocket.addEventListener('open', function (event) {
				console.log('tickerSocket opened')
				resolve('opened')
			})
			tradeSocket.addEventListener('close', function (event) {
				console.log('tickerSocket closed')
			})
		})
		
		return Promise.all([tickerPromise,bookPromise,tradePromise]).then(()=>{
			this.setState({
				tickerSocket: tickerSocket,
				bookSocket: bookSocket,
				tradeSocket: tradeSocket
			},() => {
				return 'resolved'
			})
		})
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
									<Home connect={this.connect} />
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