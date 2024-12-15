import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { resetSnackData } from "../../Redux/Action/snackDataActions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomSnackbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const snackData = useSelector((state) => state.snackData.snackData);

  const handleClose = (event, reason) => {
    let data = {
      open: false,
      message: snackData.message,
      severity: snackData.severity,
    };

    if (reason === "clickaway") {
      return;
    }

    dispatch(resetSnackData(data));
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={snackData.open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackData.severity}
          variant="filled"
          elevation={6}
        >
          {snackData.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomSnackbar;
