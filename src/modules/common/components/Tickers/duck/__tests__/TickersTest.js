import TickersContainer from '../../TickersContainer'
import TickersComponent from '../../TickersComponent'
import { mapDispatchToProps } from '../../TickersContainer'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, mount, configure } from 'enzyme'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

configure({ adapter: new Adapter() })

describe('<TickersComponent /> TEST', () => {
	const state = {
		tickersData: [['tbtcusd', 12, 33, 123], ['tbtceth', 2, 32, .234, 423]]
	}
	it('+++ capturing Snapshot of <TickersComponent />', () => {
		const renderedValue = renderer.create(<TickersComponent tickersData={[[0, 12, 33, 123]]}/>).toJSON()
		expect(renderedValue).toMatchSnapshot()
	})
	
	it('+++ capturing Snapshot of <TickersComponent /> with loading', () => {
		const renderedValue = renderer.create(<TickersComponent tickersData={[[0, 12, 33, 123]]}
																showSpinner={true}/>).toJSON()
		expect(renderedValue).toMatchSnapshot()
	})
	
	it('should call handleChangeValue prop', () => {
		const wrapper = mount(<TickersComponent {...state} />)
		wrapper.find('input').simulate('change', { target: { value: 'Your new Value' } })
		expect(wrapper.state('tickers')).toBe('Your new Value')
	})
})


describe('<TickersContainer /> mount copy', () => {
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
	
	it('render the connected component', () => {
		expect(wrapper.find(TickersContainer).length).toEqual(1)
	})
	
	it('check Prop matches with initialState', () => {
		expect(wrapper.find(TickersComponent).prop('tickersData')).toEqual(initialState.tickers.tickersData)
		expect(wrapper.find(TickersComponent).prop('showSpinner')).toEqual(initialState.tickers.showSpinner)
	})
})