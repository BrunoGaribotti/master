import React, { Fragment, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Hidden,
  makeStyles,
} from "@material-ui/core";

import clsx from "clsx";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import SelectProfile from "./NavbarComponents/SelectProfile";
import UserInformation from "./NavbarComponents/UserInformation";
import MenuActions from "./NavbarComponents/MenuActions";
import Modal from "../Profile/Modal";

import { handleDrawerOpen } from "./NavbarComponents/navbar-hooks";

import logo from "../../assets/Logo.svg";
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),

    boxShadow: "none",

    "& .MuiToolbar-gutters": {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    "& .MuiBadge-dot": {
      backgroundColor: theme.palette.secondary.light,
    },
    "& .MuiListItemIcon-root": {
      minWidth: 0,
    },
  },

  appBarShift: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),

    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      "& .MuiToolbar-gutters": {
        paddingLeft: 0,
      },
    },
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#FAFAFA",
  },

  menu: {
    display: "flex",
    alignItems: "center",
  },

  link: {
    marginRight: theme.spacing(3),
    width: "fit-content",
  },

  logo: {
    maxHeight: 48,
  },

  menuButton: {
    marginRight: theme.spacing(2),
    "&:hover": {
      background: "none",
    },
  },

  grid: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function MenuAppBar({ open, setOpen, isMobile }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { userData, selectedRole, selectedProfile } = useSelector(
    (state) => state.user
  );

  const [openModal, setOpenModal] = useState(false);
  const [action, setAction] = useState(null);

  const [anchorEl, setAnchorEl] = React.useState({ college: null, menu: null });

  const openSelectCollege = Boolean(anchorEl.college);
  const openPopover = Boolean(anchorEl.menu);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    (async () => {
      if (!isMobile) {
        setOpen(false);
      }
    })();
  }, [setOpen, isMobile]);

  return (
    <Fragment>
      <AppBar
        color="default"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.toolbar}>
          <div className={classes.menu}>
            <Hidden smDown>
              {!open && (
                <Link to="/" className={classes.link}>
                  <img
                    src={
                      selectedProfile?.college.image
                        ? `${import.meta.env.VITE_BACKEND_FILES_URL}/colleges/${
                            selectedProfile.college.image
                          }`
                        : logo
                    }
                    className={classes.logo}
                    alt={
                      selectedProfile?.college.image
                        ? `Logo ${selectedProfile?.college.name}`
                        : "Logo Coledu"
                    }
                  />
                </Link>
              )}
            </Hidden>

            <IconButton
              disableRipple
              color="inherit"
              aria-label="open drawer"
              onClick={() => handleDrawerOpen(open, setOpen)}
              edge="start"
              className={clsx(classes.menuButton)}
            >
              <MenuIcon />
            </IconButton>
          </div>

          <div>
            <Grid container spacing={1} className={classes.grid}>
              <Hidden smDown>
                {selectedRole.role !== "root" && userData.profiles.length > 0 && (
                  <SelectProfile
                    dispatch={dispatch}
                    profiles={userData.profiles}
                    id={id}
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    openSelectCollege={openSelectCollege}
                  />
                )}

                <UserInformation user={userData} />

                <MenuActions
                  user={userData}
                  dispatch={dispatch}
                  id={id}
                  anchorEl={anchorEl}
                  setAnchorEl={setAnchorEl}
                  openPopover={openPopover}
                  setAction={setAction}
                  setOpenModal={setOpenModal}
                />
              </Hidden>
              <Hidden mdUp>
                {selectedRole.role !== "root" && userData.profiles.length > 0 && (
                  <SelectProfile
                    dispatch={dispatch}
                    profiles={userData.profiles}
                    id={id}
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    openSelectCollege={openSelectCollege}
                    mdUp={true}
                  />
                )}

                <UserInformation
                  anchorEl={anchorEl}
                  setAnchorEl={setAnchorEl}
                  mdUp={true}
                />

                <MenuActions
                  dispatch={dispatch}
                  id={id}
                  anchorEl={anchorEl}
                  setAnchorEl={setAnchorEl}
                  openPopover={openPopover}
                  setAction={setAction}
                  setOpenModal={setOpenModal}
                  mdUp={true}
                />
              </Hidden>
              {selectedRole.role !== "root" && (
                <Modal
                  user={userData}
                  open={openModal}
                  action={action}
                  setOpen={setOpenModal}
                />
              )}
            </Grid>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Fragment>
  );
}
