import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

// -----Actions-----
import { addItem } from 'redux/actions/listActions';

// -----Components-----
import { 
  TextField, Box, Paper, Button,
} from '@material-ui/core';

// -----Styles-----
const useStyles = makeStyles({
  root: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
  },
});

const AddListItem = () => {
  // ----- Local state -----
  const classes = useStyles();
  const dispatch = useDispatch();
  const [ value, setValue ] = useState('');
  
  // ----- Methods -----
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id: Date.now(),
      value
    };

    dispatch(addItem(payload));
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Paper className={classes.root} elevation={2}>
        <span>Добавить новый элемент</span>
        <TextField 
          type="text" 
          value={value}
          onChange={(e) => setValue(e.target.value)}
          fullWidth
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Добавить
          </Button>
        </Box>
      </Paper>
    </form>
  )
}

export default AddListItem
