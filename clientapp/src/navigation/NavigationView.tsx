import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";


const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width:"100%"
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0,
  },
}));

interface IProps{
    
}

const NavigationView : React.FC<IProps> = (props) => {
  const dummyCategories = ['Questions and Answers', 'Post a new question', 'Profile', 'Logout']
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }
  //This is the layout of the drawer
  const drawer = (
    <div>
      <List>
          <ListItem button component="a" href="/questions">
            <ListItemText primary={"Questions and Answers"}/>
          </ListItem>
          <ListItem button component="a" href="/newquestion">
            <ListItemText primary={"Ask a new question"}/>
          </ListItem>
          <ListItem button href="/">
            <ListItemText primary={"Your Profile"}/>
          </ListItem>
          <ListItem button href="/">
            <ListItemText primary={"Something"}/>
          </ListItem>
      </List>
    </div>
  );

  const appBar = (
  <AppBar position="fixed" className={classes.appBar}>
  <Toolbar>
    <IconButton
      color="inherit"
      aria-label="Open drawer"
      edge="start"
      onClick={handleDrawerToggle}
      className={classes.menuButton}
    >
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" noWrap>
      Viknowledge
    </Typography>
  </Toolbar>
</AppBar>);
  
  return (
    <div className={classes.root}>
      {appBar}  
      <nav className={classes.drawer}>
        <Hidden smUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
              <CloseIcon/>
            </IconButton>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            {drawer}
          </Drawer>  
        </Hidden>
      </nav>
      <Box width={1}>
          <Toolbar/>
          {props.children}
      </Box>
    </div>
  );
}

export default NavigationView;