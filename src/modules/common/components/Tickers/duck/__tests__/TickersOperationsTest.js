import TickersComponent from '../../TickersComponent'
import React from 'react'
import { configure, mount } from 'enzyme/build'
import Adapter from 'enzyme-adapter-react-16/build'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import TickersContainer from '../../TickersContainer'
configure({ adapter: new Adapter() })

describe('TICKERS OPERATIONS TEST', () => {
	const initialState = {
		tickers: {
			tickersData: [],
			showSpinner: false
		}
	}
	const middlewares = [thunk]
	const mockStore = configureStore(middlewares)
	let store, wrapper
	
	beforeEach(() => {
		store = mockStore(initialState)
		wrapper = mount(<Provider store={store}><TickersContainer/></Provider>)
	})
	
	it('Test click event', () => {
		wrapper.find(TickersComponent).find('input').simulate('change', { target: { value: 'tBTCUSD' } })
		wrapper.find(TickersComponent).find('button').simulate('click')
	})
})