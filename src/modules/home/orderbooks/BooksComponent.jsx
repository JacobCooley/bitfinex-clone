import React from 'react'
import { formatNumber } from 'functions/numbers'
import "./Book.scss"
import shortid from 'shortid'

const BooksComponent = ({ bookData, ticker }) => {
	const bidBooks = bookData.map(book => {
		if(parseFloat(book['AMOUNT']) > 0){
			const amount = formatNumber(book['AMOUNT'], 2)
			const price = book['PRICE']
			const count = book['COUNT']
			return (<tr><td>{price}</td><td>{amount}</td><td>{count}</td></tr>)
		}
	})
	const askBooks = bookData.map(book => {
		if(parseFloat(book['AMOUNT']) < 0){
			const amount = book['AMOUNT']
			const price = book['PRICE']
			const count = book['COUNT']
			return (<tr><td>{price}</td><td>{amount}</td><td>{count}</td></tr>)
		}
	})
	return (
		<div className='book'>
			<h5>{bookData.length > 0 ? 'Books' : null}</h5>
			{bookData.length > 0 ? (
				<>
					<table>
						<tr>
							<th>Price</th>
							<th>Amount</th>
							<th>Count</th>
						</tr>
						<tbody>{bidBooks}</tbody>
					</table>
					<table>
						<tr>
							<th>Price</th>
							<th>Amount</th>
							<th>Count</th>
						</tr>
						<tbody>{askBooks}</tbody>
					</table>
				</>
			) : null
			}
		</div>
	)
}

export default BooksComponent