import React from "react";
import { useState } from "react";

const drawerWidth = 240;

const Admin = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Toolbar />
        <Typography variant="h6" noWrap>
          Admin Dashboard
        </Typography>
        <List>
          <ListItem button>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Typography paragraph>Main Content Area</Typography>
      </main>
    </div>
  );
};

export default Admin;
