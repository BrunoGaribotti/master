import React, { Fragment } from "react";
import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Popover,
} from "@material-ui/core";

import {
  handleClick,
  handleClose,
  logOut,
  navigate,
  onClickHandler,
} from "./navbar-hooks";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { useHistory } from "react-router-dom";
import { useNotifications } from "../../../hooks/use-notifications";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  color: {
    color: theme.palette.primary.dark,
  },

  listNav: {
    padding: theme.spacing(1.625, 0),
  },

  listItem: {
    padding: theme.spacing(0.875, 1.75),
    color: theme.palette.primary.dark,
  },

  listItemIconPopover: {
    minWidth: 0,
    marginRight: theme.spacing(1),
  },

  listItemText: {
    margin: 0,
    minWidth: 95,
    "& .MuiTypography-body1": {
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "16px",
      color: "#5F5F5F",
    },
  },
}));

const MenuActions = ({
  dispatch,
  id,
  anchorEl,
  setAnchorEl,
  openPopover,
  setAction,
  setOpenModal,
  mdUp,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { removeListeners } = useNotifications();
  const selectedRole = useSelector((state) => state.user.selectedRole);

  return (
    <Fragment>
      {!mdUp && (
        <Grid item>
          <IconButton
            aria-label="signup"
            onClick={(e) => handleClick(e, "menu", anchorEl, setAnchorEl)}
            className={classes.color}
          >
            {openPopover ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Grid>
      )}
      <Popover
        id={id}
        open={openPopover}
        anchorEl={anchorEl.menu}
        onClose={() => handleClose("menu", anchorEl, setAnchorEl)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: mdUp ? "center" : "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: mdUp ? "center" : "right",
        }}
        PaperProps={{
          style: {
            borderRadius: "5px",
          },
        }}
      >
        <List component="nav" className={classes.listNav}>
          {selectedRole.role !== "student" && selectedRole.role !== "root" && (
            <ListItem
              button
              className={classes.listItem}
              onClick={() => {
                onClickHandler("editProfile", setAction, setOpenModal);
                handleClose("menu", anchorEl, setAnchorEl);
              }}
            >
              <ListItemIcon
                className={`${classes.color} ${classes.listItemIconPopover}`}
              >
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText
                primary="Editar perfil"
                className={classes.listItemText}
              />
            </ListItem>
          )}

          {(selectedRole.role === "admin" || selectedRole.role === "responsible") && (
            <ListItem
              button
              className={classes.listItem}
              onClick={() => {
                if (selectedRole.role === "admin") {
                  onClickHandler("editCollege", setAction, setOpenModal);
                } else {
                  navigate(history);
                }
                handleClose("menu", anchorEl, setAnchorEl);
              }}
            >
              <ListItemIcon
                className={`${classes.color} ${classes.listItemIconPopover}`}
              >
                {selectedRole.role === "admin" ? (
                  <AccountBalanceIcon />
                ) : (
                  <SupervisedUserCircleIcon />
                )}
              </ListItemIcon>
              <ListItemText
                primary={
                  selectedRole.role === "admin" ? "Editar colegio" : "Alumnos a cargo"
                }
                className={classes.listItemText}
              />
            </ListItem>
          )}

          <ListItem
            button
            onClick={() => logOut(dispatch, removeListeners)}
            className={classes.listItem}
          >
            <ListItemIcon
              className={`${classes.color} ${classes.listItemIconPopover}`}
            >
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Salir" className={classes.listItemText} />
          </ListItem>
        </List>
      </Popover>
    </Fragment>
  );
};

export default MenuActions;
