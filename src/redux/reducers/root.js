import { combineReducers } from 'redux';
import { adminReducer } from './admin';

export const rootReducer = combineReducers(
    { adminReducer, }
);