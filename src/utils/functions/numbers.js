import {BigNumber} from 'bignumber.js';

export const formatNumber = (number) => {
	const bigNumber = new BigNumber(number)
	const formattedDecimals = parseFloat(bigNumber.toFixed(8)).toFixed(Math.max(2, (bigNumber.toString().split('.')[1] || []).length))
	return formattedDecimals.toString().replace(/\B(?=(?=\d*\.)(\d{3})+(?!\d))/g, ',')
}