import React from 'react'
import { Link } from 'react-router-dom'
import { projectTitle } from 'utils/constants'
import './Header.scss'

const HeaderComponent = () => (
	<header>
		<div>{projectTitle}</div>
		<nav>
			<div>WebSocket Controls:</div>
			<div><a>Connect</a></div>
			<div><a>Disconnect</a></div>
		</nav>
	</header>
)

export default HeaderComponent;