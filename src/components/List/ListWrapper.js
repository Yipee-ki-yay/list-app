import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// -----Actions-----
import { setList } from 'redux/actions/listActions';

// -----Components-----
import ListItem from 'components/List/ListItem';
import { Grid } from '@material-ui/core';

const ListWrapper = ({page, offset}) => {
  // -----Local state-----
  const dispatch = useDispatch();
  const { list } = useSelector(state => state.list);

  // -----Methods-----
  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = list[dragIndex];
      const updatedArr = [ ...list ];

      updatedArr.splice(dragIndex, 1);
      updatedArr.splice(hoverIndex, 0, dragCard);

      dispatch(setList(updatedArr));
    },
    [list, dispatch],
  )

  return (
    <Grid container spacing={3}>
      {list
        .slice((page - 1) * offset, (page - 1) * offset + offset)
        .map((item, index) => (
          <ListItem 
            key={item.id}
            index={index + ((page - 1) * offset)}
            item={item}
            moveCard={moveCard}
          />
      ))}
    </Grid>
  )
}

export default ListWrapper
