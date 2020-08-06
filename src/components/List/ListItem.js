import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

// -----Actions-----
import { deleteItem, updateItem } from 'redux/actions/listActions';

// -----Components-----
import { 
  Grid, Card, CardContent,
  TextField, Box,
} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

// -----Styles-----
const useStyles = makeStyles({
  root: {
    minWidth: 100,
  },
});

const ListItem = ({
  item,
}) => {
  // -----Local state-----
  const classes = useStyles();
  const dispatch = useDispatch();
  const [ isEdit, setIsEdit ] = useState(false);
  const [ value, setValue ] = useState(item.value);
  const inputRef = useRef(null);

  // -----Methods-----
  const handleDoubleClick = () => {
    setIsEdit(!isEdit);

    setTimeout(() => {
      inputRef.current.focus();
    }, 100);

  }

  const handleBlur = () => {
    setIsEdit(false);

    dispatch(updateItem({id: item.id, value}));
  }

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  }

  return (
    <Grid item xs={6}>
      <Card 
        onDoubleClick={() => handleDoubleClick(item.id)}
        onBlur={handleBlur}
        className={classes.root}>
        <CardContent>
          { isEdit && 
            <TextField 
              type="text" 
              value={value}
              onChange={(e) => setValue(e.target.value)}
              fullWidth
              inputRef={inputRef}
            />
          }

          { !isEdit &&
            <Box 
              display="flex" 
              justifyContent="space-between"
              alignItems="center"
            >
              {value}

              <button 
                onClick={() => handleDelete(item.id)}
                className="button-simple"
              >
                <DeleteOutlineIcon />
              </button>
            </Box>
          }
        </CardContent>
      </Card>
    </Grid>
  )
}

export default ListItem;
