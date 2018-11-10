import HomeComponent from 'home/HomeComponent'
// import HomeContainer from 'home/HomeContainer'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'
import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
configure({ adapter: new Adapter() })

jest.mock('component/Tickers/TickersContainer', () => 'tickerscontainer')

describe('<HomeComponent /> --- Snapshot',()=>{
	it('+++ capturing Snapshot of <HomeComponent />', () => {
		const renderedValue =  renderer.create(<HomeComponent />).toJSON()
		expect(renderedValue).toMatchSnapshot();
	});
});

// describe('<HomeComponent /> shallow copy', () => {
// 	let wrapper
//
// 	beforeEach(() => {
// 		wrapper = shallow(<HomeComponent />)
//
// 	})
//
// 	it('+++ render the DUMB component', () => {
// 		expect(wrapper.length).toEqual(1)
// 	})
// })

// describe('<HomeContainer /> shallow copy', () => {
// 	const initialState = {
// 		home: {
// 			count: 0
// 		}
// 	}
// 	const mockStore = configureStore()
// 	let store, container
//
// 	beforeEach(() => {
// 		store = mockStore(initialState)
// 		container = shallow(<HomeContainer store={store}/>)
// 	})
//
// 	it('+++ render the connected(SMART) component', () => {
// 		expect(container.length).toEqual(1)
// 	})
//
// 	it('+++ check Prop matches with initialState', () => {
// 		expect(container.prop('count')).toEqual(initialState.home.count)
// 	})
//
// })
