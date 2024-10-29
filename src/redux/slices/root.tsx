import { combineReducers } from '@reduxjs/toolkit';
import paginationReducer from './paginationReducer';
import filmsReducer from './filmsReducer';

const rootReducer = combineReducers({ paginationReducer, filmsReducer });

export default rootReducer;
