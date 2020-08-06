import {
	SET_LIST,
	ADD_ITEM,
	DELETE_ITEM,
	UPDATE_ITEM,
} from 'redux/constants';

const initialState = {
	list: []
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {

		case SET_LIST: {
			return {
				...state, list: [ ...payload ]
			};
		}

		case ADD_ITEM: {
			return {
				...state, list: [ ...state.list, payload ]
			};
		}

		case DELETE_ITEM: {
			return {
				...state, 
				list: [ 
					...state.list.filter(i => i.id !== payload), 
				]
			};
		}

		case UPDATE_ITEM: {
			return {
				...state, 
				list: [ 
					...state.list.slice(0, payload.idx),
					payload.item, 
					...state.list.slice(payload.idx + 1), 
				]
			};
		}

		default:
			return state;
	}
}
