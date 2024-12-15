import React from "react";
import {
  Button,
  makeStyles,
  Typography,
  IconButton as IButton,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing(3),

    "& .MuiButton-contained.Mui-disabled": {
      color: "#F5F5F5",
    },
  },
  gridTitleSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleSection: {
    display: "flex",
    alignItems: "center",
  },
  iconButton: {
    "&:hover": {
      background: "none",
    },
    padding: 0,
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "3px",
    backgroundColor: theme.palette.primary.main,
  },

  icon: {
    margin: 4,
    width: 28,
    height: 28,
    color: "#FFFFFF",
  },

  title: {
    marginLeft: theme.spacing(1),
    color: "#001A38",
  },
  gridActions: {
    overflow: "auto",
    overflowY: "hidden",
    marginLeft: theme.spacing(0),
    display: "flex",
    "@media (min-width:600px)": {
      marginLeft: theme.spacing(3),
      overflow: "auto",
      overflowY: "hidden",
      display: "flex",
    },
  },
  buttonAndComponent: {
    "@media (min-width:600px)": {
      marginLeft: theme.spacing(1),
    },
  },
  gridButton: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    height: theme.spacing(4.5),
    borderRadius: theme.spacing(0.375),
  },
}));

const PageHeader = ({
  isMobile,
  isMobileCustomComponent,
  title,
  Icon,
  disabled,
  disabledButton,
  textButton,
  IconButton,
  variant,
  onClick,
  backbutton,
  onclickBackButton,
  Component,
  disabledComponent,
}) => {
  const classes = useStyles();

  const theme = useTheme();
  const screen = "750";
  const mediaQuery = useMediaQuery(
    theme.breakpoints.down(isMobileCustomComponent || screen),
    {
      defaultMatches: true,
    }
  );

  return (
    <div
      className={classes.grid}
      style={
        (Component ? mediaQuery : isMobile) ? { flexDirection: "column" } : null
      }
    >
      <div
        className={classes.gridTitleSection}
        style={
          (Component ? mediaQuery : isMobile)
            ? {
                ...(!disabledButton && {
                  marginBottom: theme.spacing(2),
                }),
                flexDirection: "column",
                width: "100%",
                alignItems: "flex-start",
              }
            : null
        }
      >
        <div
          className={classes.titleSection}
          style={mediaQuery ? { marginBottom: 16 } : null}
        >
          {backbutton && (
            <IButton
              disableRipple
              className={classes.iconButton}
              onClick={onclickBackButton}
            >
              <ArrowBackIosIcon color="primary" />
            </IButton>
          )}
          <div className={classes.iconContainer}>
            <Icon className={classes.icon} />
          </div>
          <Typography className={classes.title} variant="h2">
            {title}
          </Typography>
        </div>

        {mediaQuery && Component && !disabledComponent && (
          <div style={{ width: "100%" }}>
            <Component />
          </div>
        )}
      </div>
      <div
        className={classes.gridActions}
        style={
          (Component ? mediaQuery : isMobile)
            ? {
                width: "100%",
              }
            : null
        }
      >
        {!mediaQuery && !disabledComponent && (
          <div>{Component && <Component />}</div>
        )}
        {!disabledButton && (
          <div
            className={`${classes.gridButton} ${
              Component && !mediaQuery && classes.buttonAndComponent
            }`}
          >
            <Button
              disabled={disabled}
              variant={variant ? variant : "outlined"}
              disableElevation
              startIcon={IconButton ? <IconButton /> : null}
              className={classes.button}
              color="primary"
              fullWidth={(Component ? mediaQuery : isMobile) ? true : false}
              onClick={onClick}
            >
              {textButton}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
