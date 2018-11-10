import React from 'react';
import './Input.scss'
import PropTypes from 'prop-types'

const Input = ({ label, type, name, onChange, value }) => (
	<>
		<label>
			{label}
			<input value={value} type={type} name={name} onChange={onChange} />
		</label>
	</>
)

Input.propTypes = {
	type: PropTypes.string,
	value: PropTypes.string,
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
}

Input.defaultProps = {
	name: '',
	value: '',
	type: 'text',
	label: '',
	onChange: () => {}
}

export default Input;