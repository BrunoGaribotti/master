import React from "react";
import { makeStyles, Drawer } from "@material-ui/core";
import { Link } from "react-router-dom";

import ListItems from "./ListItems/ListItems";

import logo from "../../assets/Logo.svg";
import banner from "../../assets/banner.png";

import ITEMS from "../../configs/ITEMS";
import { useSelector } from "react-redux";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paperAnchorDockedLeft": {
      border: "none",
    },
  },
  drawerPaper: {
    height: "100vh",
    width: drawerWidth,
    backgroundColor: "#FAFAFA",
    display: "flex",
    flexDirection: "column",
  },

  toolbar: {
    margin: theme.spacing(0.5, 1),
    minHeight: 48,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "@media (min-width:600px)": {
      margin: theme.spacing(1),
    },
  },

  logo: {
    maxHeight: 48,
  },
  banner: { width: "100%" },
  bannerLink: {
    margin: theme.spacing(0.5, 1),
    display: "flex",
    "@media (min-width:600px)": {
      margin: theme.spacing(1),
    },
  },
}));

const DrawerComponent = ({ open, setOpen, variant, isMobile }) => {
  const classes = useStyles();

  const selectedRole = useSelector((state) => state.user.selectedRole);
  const college =
    selectedRole.role !== "root"
      ? useSelector((state) => state.user.selectedProfile.college)
      : null;

  const handleDrawerClose = () => {
    if (!isMobile) {
      setOpen(false);
    }
  };

  return (
    <Drawer
      onClose={handleDrawerClose}
      className={classes.drawer}
      variant={variant}
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Link
        to="/"
        className={classes.toolbar}
        style={
          college?.image && {
            backgroundImage: `url(${
              import.meta.env.VITE_BACKEND_FILES_URL
            }/colleges/${college.image})`,
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }
        }
      >
        {!college?.image && (
          <img src={logo} className={classes.logo} alt={"Logo Coledu"} />
        )}
      </Link>

      <ListItems
        className={classes}
        closeDrawer={handleDrawerClose}
        items={ITEMS[selectedRole.role]}
      />

      {selectedRole.role === "responsible" && (
        <a
          href="https://coleshop.ar/"
          target="_blank"
          className={classes.bannerLink}
          rel="noreferrer"
        >
          <img
            src={banner}
            className={classes.banner}
            alt={"Banner Coleshop"}
          />
        </a>
      )}
    </Drawer>
  );
};

export default DrawerComponent;
