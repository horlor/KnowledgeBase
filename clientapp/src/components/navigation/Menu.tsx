import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@material-ui/core';
import {Link } from 'react-router-dom';
import { useLoggedInState } from '../../hooks/LoginHooks';

interface IProps{

}
const Menu : React.FC<IProps> = (props) => {
    const loggedIn = useLoggedInState();
    return (
      <div>
        <List>
          <ListItem button component={Link} to="/questions">
            <ListItemText primary={"Questions and Answers"} />
          </ListItem>
          {loggedIn ? (
            <>
              <ListItem button component={Link} to="/newquestion">
                <ListItemText primary={"Ask a new question"} />
              </ListItem>
              <ListItem button component={Link} to="/users">
                <ListItemText primary={"Users"} />
              </ListItem>
              <Divider/>
              <ListItem button component={Link} to="/profile">
                <ListItemText primary={"Profile"} />
              </ListItem>
              <ListItem button component={Link} to="/notifications">
                <ListItemText primary={"Notifications"}/>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button component={Link} to="/users">
                <ListItemText primary={"Users"} />
              </ListItem>
              <Divider/>
              <ListItem button component={Link} to="/login">
                <ListItemText primary={"Login"} />
              </ListItem>
              <ListItem button component={Link} to="/register">
                <ListItemText primary={"Register"} />
              </ListItem>
            </>
          )}
        </List>
      </div>
    );
}

export default Menu;