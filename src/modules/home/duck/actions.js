import { createActions } from 'reduxsauce';

const { Creators, Types } = createActions({
    requestTickerJson: ['ticker'],
    changeTickerString: ['ticker'],
    receiveTickerJson: ['tickerData'],
    receiveOrderBookJson: ['bookData'],
    receiveTradeJson: ['tradeData'],
});

export { Creators, Types };