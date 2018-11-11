import React from 'react'
import ReactDOM from 'react-dom'
import "@babel/polyfill"
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {
	createStore,
	applyMiddleware
} from 'redux'
import App from 'app/App'
import rootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
const middleware = composeWithDevTools(applyMiddleware(thunk))
const store = createStore(rootReducer, middleware)

ReactDOM.render(
	<Provider store={store}>
			<App/>
	</Provider>,
	document.getElementById('app')
)
