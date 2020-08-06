import React from 'react';
import { useSelector } from 'react-redux';

// -----Components-----
import ListItem from 'components/List/ListItem';
import { Grid } from '@material-ui/core';

const ListWrapper = ({page, offset}) => {
  // -----Local state-----
  const { list } = useSelector(state => state.list);

  return (
    <Grid container spacing={3}>
      {list
        .slice((page - 1) * offset, (page - 1) * offset + offset)
        .map(item => (
        <ListItem 
          key={item.id}
          item={item}
        />
      ))}
    </Grid>
  )
}

export default ListWrapper
