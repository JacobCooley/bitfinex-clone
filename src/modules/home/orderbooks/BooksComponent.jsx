import React from 'react'
import { formatNumber } from 'functions/numbers'
import "./Book.scss"
import shortid from 'shortid'

const BooksComponent = ({ bookData, ticker }) => {
	let bidTotal = 0
	const bidBooks = bookData.map(book => {
		if(parseFloat(book['AMOUNT']) > 0){
			const amount = formatNumber(book['AMOUNT'], 2)
			const price = book['PRICE']
			const count = book['COUNT']
			bidTotal += parseFloat(amount)
			const row = (<tr><td>{price}</td><td>{amount}</td><td>{bidTotal.toFixed(2)}</td><td>{count}</td></tr>)
			return row
		}
	})
	let askTotal = 0
	const askBooks = bookData.map(book => {
		if(parseFloat(book['AMOUNT']) < 0){
			const amount = formatNumber(Math.abs(book['AMOUNT']), 2)
			const price = book['PRICE']
			const count = book['COUNT']
			askTotal += parseFloat(amount)
			const row = (<tr><td>{price}</td><td>{amount}</td><td>{askTotal.toFixed(2)}</td><td>{count}</td></tr>)
			return row
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
							<th>Total</th>
							<th>Count</th>
						</tr>
						<tbody>{bidBooks}</tbody>
					</table>
					<table>
						<tr>
							<th>Price</th>
							<th>Amount</th>
							<th>Total</th>
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