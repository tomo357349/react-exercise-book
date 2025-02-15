import { setupWorker } from 'msw/browser';
import countryHandlers from './country.js';
import dummyHandlers from './dummy.js';

const handlers = [
    ...countryHandlers,
    ...dummyHandlers
];

export const worker = setupWorker(...handlers);
