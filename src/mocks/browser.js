import { setupWorker } from 'msw/browser';
import dummyHandlers from './dummy.js';

const handlers = [
    ...dummyHandlers
];

export const worker = setupWorker(...handlers);
