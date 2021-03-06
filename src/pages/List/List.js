import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// -----Actions-----
import { setList } from 'redux/actions/listActions';

// -----Components-----
import Pagination from '@material-ui/lab/Pagination';
import { Box } from '@material-ui/core';
import ListWrapper from 'components/List/ListWrapper'


const List = ({match, history}) => {
  // ----- Local state -----
  const dispatch = useDispatch();
  const { list } = useSelector(state => state.list);
  const { params: { page } } = match;
  const offset = 10;
  
  // ----- Methods -----
  const handleChangePage = (ev, page) => {
    history.push(`/${page}`);
  };

  const handleRandomValues = () => {
    return [...new Array(100)].map((el, idx) => {
      return {
        id: idx,
        value: Math.floor(Math.random() * (100 - 1) + 1)
      }
    })
  }

  // ----- Component Did Mount -----
  useEffect(() => {
    const list_storage = JSON.parse(localStorage.getItem('list'));

    if ( list_storage && list_storage.length && list.length === 0 ) {
      dispatch(setList(list_storage))
    }
    
    if ( !list_storage && list.length === 0 ) {
      dispatch(setList(handleRandomValues()))
    }
  });

  return (
    <>
      <h3>
        Page {page}
      </h3>

      <DndProvider backend={HTML5Backend}>
        <ListWrapper
          page={page}
          offset={offset}
        />
      </DndProvider>

      <Box mt={4}>
        <Pagination 
          count={Math.ceil(list.length / 10)} 
          page={Number(page)}
          onChange={handleChangePage}
        />
      </Box>
    </>
  )
}

export default List;
