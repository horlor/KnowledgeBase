import React, { useState } from 'react'
import { makeStyles, TextField, InputBase, fade, Popover, Typography, Paper,  List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import { useHistory } from 'react-router'
import { useSearchBarHook } from '../../hooks/MenuHooks'
import { Link } from 'react-router-dom'
import { SearchRecordType } from '../../models/SearchModels'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import SearchIcon from '@material-ui/icons/Search'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'


interface IProps{

}

const useStyles = makeStyles(theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
      dropdown:{
        minWidth:"240px",
        width:"20vw"
      },
      searchItem:{
        width:"100%"
      }
}))

const SearchBar : React.FC<IProps> = (props) =>{
  const classes = useStyles()
  const {value, onChange, anchorEl, onClose, records} = useSearchBarHook();
  return (
      <>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            onChange={onChange}
            value={value}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <Popover
          open={!!anchorEl}
          anchorEl={anchorEl}
          anchorOrigin={{vertical:"bottom", horizontal: "right"}}
          transformOrigin={{vertical:"top", horizontal:"right"}}
          disableAutoFocus disableEnforceFocus
          onClose={onClose}
        >
          <Paper>
            {records?
            <List className={classes.dropdown}>
              {
                records.map((r, i)=>
                <ListItem className={classes.searchItem} 
                button key={i} component={Link} 
                to={r.link}
                onClick={onClose}>
                  {
                    <ListItemAvatar>{
                      r.type === SearchRecordType.search?
                      <SearchIcon/>:r.type===SearchRecordType.question?<QuestionAnswerIcon/>:<AccountCircleIcon/>
                      }</ListItemAvatar>
                  }
                  <ListItemText>{r.title}</ListItemText>
                </ListItem>
                )
              }
            </List>
            : "Loading..."
            }
          </Paper>
        </Popover>
      </>
  );
}

export default SearchBar;