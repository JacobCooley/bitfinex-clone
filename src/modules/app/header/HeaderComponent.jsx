import React from 'react'
import { Link } from 'react-router-dom'
import { projectTitle } from 'utils/constants'
import './Header.scss'



class HeaderComponent extends React.Component {
	
	componentDidMount(){
	}
	render() {
		return (
			<header>
				<div>{projectTitle}</div>
			</header>
		)
	}
}

export default HeaderComponent