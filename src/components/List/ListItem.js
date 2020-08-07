import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from 'constants/ItemTypes';

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
  index,
  moveCard,
}) => {
  // -----Local state-----
  const classes = useStyles();
  const dispatch = useDispatch();
  const [ isEdit, setIsEdit ] = useState(false);
  const [ value, setValue ] = useState(item.value);
  const inputRef = useRef(null);
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })
  const [{isDragging}, drag] = useDrag({
    item: { type: ItemTypes.CARD, id: item.id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

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

  drag(drop(ref));

  return (
    <Grid item xs={6}
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
      }}
    >
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
