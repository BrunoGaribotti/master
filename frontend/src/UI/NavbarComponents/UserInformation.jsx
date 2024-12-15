import React, { Fragment } from "react";
import { Avatar, Grid, makeStyles, Typography } from "@material-ui/core";

import { deepPurple } from "@material-ui/core/colors";

import { handleClick } from "./navbar-hooks";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },

  color: {
    color: theme.palette.primary.dark,
  },

  avatarMobile: {
    cursor: "pointer",
    width: theme.spacing(4.75),
    height: theme.spacing(4.75),
  },

  profileName: {
    fontSize: "14px",
    fontWeight: "bold",
    lineHeight: "20px",
  },
}));

const UserInformation = ({ anchorEl, setAnchorEl, mdUp }) => {
  const classes = useStyles();
  const {userData, selectedRole, selectedProfile} = useSelector((state) => state.user);

  return (
    <Fragment>
      <Grid item>
        <Avatar
          src={
            selectedRole.role !== "root" && userData.image
              ? `${import.meta.env.VITE_BACKEND_FILES_URL}/users/${userData.image}`
              : ""
          }
          className={`${classes.purple} ${mdUp && classes.avatarMobile}`}
          onClick={(e) => {
            if (mdUp) {
              handleClick(e, "menu", anchorEl, setAnchorEl);
            }
          }}
        >
          {selectedRole.role !== "root"
            ? `${selectedProfile.lastname[0].toUpperCase()}${selectedProfile.name[0].toUpperCase()}`
            : "R"}
        </Avatar>
      </Grid>
      {!mdUp && (
        <Grid item>
          <div>
            <Typography className={`${classes.profileName} ${classes.color}`}>
              {selectedRole.role !== "root"
                ? `${selectedProfile.lastname} ${selectedProfile.name}`
                : "Usuario"}
            </Typography>
          </div>
        </Grid>
      )}
    </Fragment>
  );
};

export default UserInformation;
