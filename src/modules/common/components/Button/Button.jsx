import React from 'react'
import './Buttons.scss'
import PropTypes from "prop-types"

const Button = ({ text, onClick }) => (
	<>
		<button onClick={onClick}>{text}</button>
	</>
)

Button.propTypes = {
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
}

Button.defaultProps = {
	text: '',
	onClick: () => {}
}


export default Button