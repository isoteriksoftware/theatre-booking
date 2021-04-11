import { combineReducers } from 'redux';
import { adminReducer } from './admin';
import { userReducer } from './user';

export const rootReducer = combineReducers(
    { adminReducer, userReducer, }
);