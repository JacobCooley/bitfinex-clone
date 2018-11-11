import React from 'react'
import { formatNumber } from 'functions/numbers'
import "./Book.scss"
import shortid from 'shortid'

const BooksComponent = ({ bookData, ticker }) => {
	let bidTotal = 0
	const bidBooks = bookData.map(book => {
		if (parseFloat(book['AMOUNT']) > 0) {
			const amount = formatNumber(book['AMOUNT'], 2)
			const price = book['PRICE']
			const count = book['COUNT']
			bidTotal += parseFloat(amount)
			const row = (<tr key={shortid.generate()}>
				<td>{price}</td>
				<td>{amount}</td>
				<td>{bidTotal.toFixed(2)}</td>
				<td>{count}</td>
			</tr>)
			return row
		}
	})
	let askTotal = 0
	const askBooks = bookData.map(book => {
		if (parseFloat(book['AMOUNT']) < 0) {
			const amount = formatNumber(Math.abs(book['AMOUNT']), 2)
			const price = book['PRICE']
			const count = book['COUNT']
			askTotal += parseFloat(amount)
			const row = (<tr key={shortid.generate()}>
				<td>{price}</td>
				<td>{amount}</td>
				<td>{askTotal.toFixed(2)}</td>
				<td>{count}</td>
			</tr>)
			return row
		}
	})
	return (
		<div className='book'>
			<h5>{bookData.length > 0 ? 'Books' : null}</h5>
			{bookData.length > 0 ? (
				<>
					<table>
						<thead>
						<tr style={{ color: 'green' }}>
							<th>Price</th>
							<th>Amount</th>
							<th>Total</th>
							<th>Count</th>
						</tr>
						</thead>
						<tbody>{bidBooks}</tbody>
					</table>
					<table>
						<thead>
						<tr style={{ color: '#984B43' }}>
							<th>Price</th>
							<th>Amount</th>
							<th>Total</th>
							<th>Count</th>
						</tr>
						</thead>
						<tbody>{askBooks}</tbody>
					</table>
				</>
			) : null
			}
		</div>
	)
}

export default BooksComponent