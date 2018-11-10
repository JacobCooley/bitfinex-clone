import { connect } from 'react-redux'
import BooksComponent from './BooksComponent'
import PropTypes from 'prop-types'
import React from 'react'

const mapStateToProps = (state) => {
	const { ticker, bookData } = state.ticker
	return {
		bookData,
		ticker
	}
}

const BooksContainer = connect(
	mapStateToProps
)(BooksComponent)

BooksContainer.propTypes = {
	bookData: PropTypes.array
}

BooksContainer.defaultProps = {
	bookData: []
}

export default BooksContainer