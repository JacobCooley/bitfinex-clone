import {BigNumber} from 'bignumber.js';

export const formatNumber = (number, prec) => {
	const bigNumber = new BigNumber(number)
	const precision = prec ? prec : 8
	const formattedDecimals = parseFloat(bigNumber.toFixed(precision))
	return formattedDecimals.toString().replace(/\B(?=(?=\d*\.)(\d{3})+(?!\d))/g, ',')
}

export const timeConverter = (UNIX_timestamp) => {
	const a = new Date(UNIX_timestamp);
	const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	const year = a.getFullYear();
	const month = months[a.getMonth()];
	const date = a.getDate();
	const hour = a.getHours();
	const min = a.getMinutes();
	const sec = a.getSeconds();
	const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
	return time;
}