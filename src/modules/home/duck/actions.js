import { createActions } from 'reduxsauce';

const { Creators, Types } = createActions({
    requestTickerJson: ['ticker'],
    receiveTickerJson: ['tickerData'],
    receiveOrderBookJson: ['orderBookData'],
    receiveTradeJson: ['tradeData'],
});

export { Creators, Types };