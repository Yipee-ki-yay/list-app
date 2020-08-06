import {
	SET_LIST, ADD_ITEM, DELETE_ITEM,
} from 'redux/constants';
import store from 'redux/store';
import { setListToLocalStorage } from 'services/setListToLocalStorage';
import { UPDATE_ITEM } from '../constants';

const setList = (payload) => {
  setListToLocalStorage(payload);

	return dispatch => {
    dispatch({type: SET_LIST, payload})
  }
};

const addItem = (payload) => {
  const { list } = store.getState().list;
  const storagePayload = [ ...list, payload ];

  setListToLocalStorage(storagePayload);

	return dispatch => {
    dispatch({type: ADD_ITEM, payload})
  }
};

const deleteItem = (payload) => {
  const { list } = store.getState().list;
  const storagePayload = [ ...list.filter(i => i.id !== payload) ];

  setListToLocalStorage(storagePayload);

  return dispatch => {
    dispatch({type: DELETE_ITEM, payload})
  }
}

const updateItem = (item) => {
  const { list } = store.getState().list;
  const idx = list.findIndex(({id}) => id === item.id);

  const payload = {
    idx,
    item,
  };

  const storagePayload = [ 
    ...list.slice(0, idx),
    item,
    ...list.slice(idx + 1),
  ];

  setListToLocalStorage(storagePayload);
  
  return dispatch => {
    dispatch({type: UPDATE_ITEM, payload})
  }
}

export {
  setList,
  addItem,
  deleteItem,
  updateItem,
}
