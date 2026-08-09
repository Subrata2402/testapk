import { AsyncLocalStorage } from 'async_hooks';

export const localeStorage = new AsyncLocalStorage<string>();
