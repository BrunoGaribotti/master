import React, { Fragment } from "react";
import {
  Badge,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Popover,
} from "@material-ui/core";

import ROLES_IN_SPANISH from "../../../configs/ROLES_IN_SPANISH";

import {
  changeCollege,
  handleClick,
  handleClose,
  invisible,
} from "./navbar-hooks";

import NotificationsIcon from "@material-ui/icons/Notifications";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  currentCollege: {
    "& .MuiListItemText-root": {
      width: "100%",
      maxWidth: 85,
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      "@media (min-width:390px)": {
        maxWidth: 150,
      },      
      "@media (min-width:550px)": {
        maxWidth: 300,
      },
      "@media (min-width:1070px)": {
        maxWidth: 500,
      },
      "@media (min-width:1200px)": {
        maxWidth: 850,
      },

    },

    "& .MuiTypography-root": {
      color: theme.palette.primary.dark,
      display: "contents",
    },

    "& .MuiListItem-gutters": {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },

    [theme.breakpoints.up("md")]: {
      "& .MuiListItem-gutters": {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
    },
  },

  listItemDisabled: {
    "&:hover": {
      backgroundColor: "transparent",
      cursor: "default",
    },
  },

  color: {
    color: theme.palette.primary.dark,
  },

  ccNotificationsIcon: {
    marginLeft: theme.spacing(2),
    justifyContent: "flex-end",
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(3.75),
    },
  },

  listItemContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    "& .MuiBadge-dot": {
      backgroundColor: theme.palette.secondary.light,
    },

    "& .MuiTypography-root": {
      display: "contents",
    },

    "& .MuiListItemIcon-root": {
      minWidth: 0,
    },

    "& .MuiListItemText-root": {
      width: "100%",
      maxWidth: 850,
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
    },
  },

  divider: {
    margin: theme.spacing(1, 1, 1, 0),
    backgroundColor: theme.palette.primary.dark,
  },

  colorText: {
    color: theme.palette.grey[700],
  },

  selectedProfile: {
    color: theme.palette.primary.dark,
  },
  list: {
    width: "100%",
    maxWidth: 250,
    "@media (min-width:960px)": {
      maxWidth: 400,
    },
    "@media (min-width:1200px)": {
      maxWidth: 850,
    },
  },
  listItemIcon: {
    marginLeft: theme.spacing(5.625),
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const SelectProfile = ({
  dispatch,
  id,
  anchorEl,
  setAnchorEl,
  openSelectCollege,
  mdUp,
}) => {
  const classes = useStyles();

  const { userData, selectedProfile, selectedRole } = useSelector(
    (state) => state.user
  );

  const { alerts, currentAlerts } = useSelector((state) => state.alerts);

  return (
    <Fragment>
      <Grid item className={classes.currentCollege}>
        <ListItem
          className={`${
            (userData?.profiles.length <= 1  || userData?.profiles[0].roles.length > 1) && classes.listItemDisabled
          }`}
          disableRipple={userData?.profiles.length > 1 || userData?.profiles[0].roles.length > 1 ? false : true}
          button
          onClick={(e) => {
            if (userData?.profiles.length > 1 || userData?.profiles[0].roles.length > 1)
              handleClick(e, "college", anchorEl, setAnchorEl);
          }}
        >
          <ListItemText
            primary={`${ROLES_IN_SPANISH[selectedRole.role]} - ${
              selectedProfile.college.name
            }`}
          />
          <ListItemIcon
            className={`${classes.color} ${classes.ccNotificationsIcon}`}
          >
            <Badge
              overlap="rectangular"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              variant="dot"
              invisible={invisible(currentAlerts)}
            >
              <NotificationsIcon />
            </Badge>
          </ListItemIcon>
          {userData?.profiles.length > 1 && (
            <ListItemIcon className={classes.color}>
              {openSelectCollege ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemIcon>
          )}
        </ListItem>

        {/* Seleccion de colegio */}
        <Popover
          id={id}
          open={openSelectCollege}
          anchorEl={anchorEl.college}
          onClose={() => handleClose("college", anchorEl, setAnchorEl)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: mdUp ? "center" : "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: mdUp ? "center" : "right",
          }}
        >
          <List component="nav" className={classes.list}>
            {userData?.profiles.reduce(
              (array, entry, index) => [
                ...array,
                ...entry.roles.map((role, indexR) => (
                  <div
                    className={classes.listItemContainer}
                    key={`listItem-${index}-${entry._id}-${role.role}`}
                  >
                    <ListItem
                      button
                      onClick={() =>
                        changeCollege(
                          entry,
                          role,
                          selectedProfile,
                          selectedRole.role,
                          dispatch,
                          anchorEl,
                          setAnchorEl
                        )
                      }
                      className={`${classes.colorText} ${
                        entry._id === selectedProfile._id &&
                        role.role === selectedRole.role &&
                        classes.selectedProfile
                      }`}
                    >
                      <ListItemText
                        primary={`${ROLES_IN_SPANISH[role.role]} - ${
                          entry.college.name
                        }`}
                      />
                      <ListItemIcon
                        className={`${classes.color} ${classes.listItemIcon}`}
                      >
                        <Badge
                          overlap="rectangular"
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          variant="dot"
                          invisible={(() => {
                            const profileAlerts = alerts.find(
                              (a) =>
                                a.profile === entry._id && a.role === role.role
                            );
                            return invisible(profileAlerts);
                          })()}
                        >
                          <NotificationsIcon />
                        </Badge>
                      </ListItemIcon>
                    </ListItem>
                    {(index !== userData?.profiles.length - 1 ||
                      indexR !== entry.roles.length - 1) && (
                      <Divider
                        style={{
                          width: "95%",
                          backgroundColor: "#A2A2A2",
                        }}
                      />
                    )}
                  </div>
                )),
              ],
              []
            )}
          </List>
        </Popover>
      </Grid>
      <Divider className={classes.divider} orientation="vertical" flexItem />
    </Fragment>
  );
};

export default SelectProfile;
