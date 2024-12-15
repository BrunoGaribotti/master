import React, { useState } from "react";
import Navbar from "./Navbar";
import Drawer from "./Drawer";
import { Hidden, useMediaQuery, useTheme } from "@material-ui/core";
import { useSelector } from "react-redux";

const Navigation = ({ open, setOpen}) => {
  const [openMobile, setOpenMobile] = useState(false);

  const theme = useTheme();
  const screen = "md";
  const isMobile = useMediaQuery(theme.breakpoints.up(screen), {
    defaultMatches: true,
  });

  return (
    <div>
      <Navbar
        open={!isMobile ? openMobile : open}
        setOpen={!isMobile ? setOpenMobile : setOpen}
        isMobile={isMobile}
      />
      <Hidden mdUp>
        <Drawer
          open={openMobile}
          setOpen={setOpenMobile}
          variant="temporary"
          isMobile={isMobile}
        />
      </Hidden>
      <Hidden smDown>
        <Drawer
          open={open}
          setOpen={setOpen}
          variant="persistent"
          isMobile={isMobile}
        />
      </Hidden>
    </div>
  );
};

export default Navigation;
