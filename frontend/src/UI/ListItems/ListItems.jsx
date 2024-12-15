import React, { useState, Fragment } from "react";
import {
  makeStyles,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import Collapse from "@material-ui/core/Collapse";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  nav: {
    padding: theme.spacing(4, 2),
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
  },
  listItem: {
    color: theme.palette.primary.dark,
    paddingLeft: theme.spacing(5),
    height: theme.spacing(6.25),
    width: theme.spacing(28.75),
    borderRadius: theme.spacing(0.375),
    marginBottom: theme.spacing(2),
    "&:hover": {
      backgroundColor: "#63B4FF",
      color: "#FAFAFA",
    },
  },
  badge: {
    "& .MuiBadge-dot": {
      backgroundColor: theme.palette.secondary.light,
    },
  },

  color: {
    color: "inherit",
  },
  selected: {
    color: "#FAFAFA",
  },
  nested: {
    color: theme.palette.primary.dark,
    paddingLeft: theme.spacing(8),
    borderRadius: theme.spacing(0.375),
    marginBottom: theme.spacing(2),

    "&:hover": {
      backgroundColor: "#63B4FF",
      color: "#FAFAFA",
    },
  },

  background: {
    backgroundColor: theme.palette.primary.light,
    boxShadow: `0px 6px 17px -6px ${theme.palette.primary.light}`,
    color: "#FAFAFA",
  },
}));

const ListItems = ({ closeDrawer, items }) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [expandMenu, setExpandMenu] = useState(false);
  const currentAlerts = useSelector((state) => state.alerts.currentAlerts);
  
  return (
    <List component="nav" className={classes.nav}>
      {items.map((item, index) => (
        <Fragment key={index}>
          <ListItem
            button
            onClick={() => {
              if (item.route) {
                history.push(item.route);
                closeDrawer();
              } else {
                setExpandMenu((state) => !state);
              }
            }}
            className={`${classes.listItem} ${
              location.pathname.includes(item.route) && classes.background
            }`}
          >
            <ListItemIcon
              className={
                location.pathname.includes(item.route)
                  ? classes.selected
                  : classes.color
              }
            >
              {item.Icon &&
                (item.badge ? (
                  <Badge
                    className={classes.badge}
                    overlap="rectangular"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    variant="dot"
                    invisible={currentAlerts[item.notification].length === 0}
                  >
                    <item.Icon />
                  </Badge>
                ) : (
                  <item.Icon />
                ))}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
          {item.subroutes && (
            <Collapse in={expandMenu} timeout="auto" unmountOnExit>
              <List component="div" disablePadding className={classes.menu}>
                {item.subroutes.map((sr, i) => (
                  <ListItem
                    onClick={() => {
                      history.push(sr.route);
                      closeDrawer();
                    }}
                    key={i}
                    button
                    className={`${classes.nested} ${
                      location.pathname.includes(sr.route) && classes.background
                    }`}
                  >
                    <ListItemIcon
                      className={
                        location.pathname === sr.route
                          ? classes.selected
                          : classes.color
                      }
                    >
                      {sr.Icon &&
                        (sr.badge ? (
                          <Badge
                            className={classes.badge}
                            overlap="rectangular"
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            variant="dot"
                            invisible={
                              currentAlerts[sr.notification].length === 0
                            }
                          >
                            <sr.Icon />
                          </Badge>
                        ) : (
                          <sr.Icon />
                        ))}
                    </ListItemIcon>
                    <ListItemText
                      className={
                        location.pathname === sr.route
                          ? classes.selected
                          : classes.color
                      }
                      primary={sr.name}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}
        </Fragment>
      ))}
    </List>
  );
};

export default ListItems;
