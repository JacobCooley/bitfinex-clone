import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';
import Home from 'home/HomeContainer';
import Header from 'app/header/HeaderComponent';
import './App.scss'

class App extends Component {
	render() {
		return (
			<Router>
				<div className='container'>
					<Header/>
					<main>
						<Route exact path='/' component={Home}/>
					</main>
				</div>
			</Router>
		);
	}
}

export default App;