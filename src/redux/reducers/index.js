import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import listReducer from './listReducer';

export default combineReducers({
	routing: routerReducer,
	list: listReducer,
});
