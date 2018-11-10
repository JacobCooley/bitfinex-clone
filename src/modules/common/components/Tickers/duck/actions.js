import { createActions } from 'reduxsauce';

const { Creators, Types } = createActions({
    requestTickersJson: ['tickers'],
    receiveTickersJson: ['tickersData']
});

export { Creators, Types };