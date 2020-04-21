import React from 'react';
import { List, ListItem, ListItemText, Divider, ListSubheader } from '@material-ui/core';
import {Link } from 'react-router-dom';
import { useLoginState } from '../../hooks/LoginHooks';

interface IProps{

}
const Menu : React.FC<IProps> = (props) => {
    const {loggedIn, role} = useLoginState();
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
          {
              (role==="Admin")?
              <>
                <Divider/>
                <Divider/>
                <ListSubheader>Admin</ListSubheader>
                <ListItem button component={Link} to="/admin">
                  <ListItemText primary={"Role management"}/>
                </ListItem>
                <ListItem button component={Link} to="/admin">
                  <ListItemText primary={"Statistics"}/>
                </ListItem>
                <ListItem button component={Link} to="/topics">
                  <ListItemText primary={"Topics"}/>
                </ListItem>
              </>
              :""
          }
        </List>
      </div>
    );
}

export default Menu;