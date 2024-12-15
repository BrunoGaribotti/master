import {
  setCurrentProfile,
  logOutUser,
} from "../../../Redux/Action/userActions";

export const handleClick = (event, value, anchorEl, setAnchorEl) => {
  setAnchorEl({ ...anchorEl, [value]: event.currentTarget });
};

export const handleClose = (value, anchorEl, setAnchorEl) => {
  setAnchorEl({ ...anchorEl, [value]: null });
};

export const logOut = (dispatch, removeListeners) => {
  dispatch(logOutUser(removeListeners));
};

export const handleDrawerOpen = (open, setOpen) => {
  setOpen(!open);
};

export const changeCollege = (
  profile,
  role,
  selectedProfile,
  selectedRole,
  dispatch,
  anchorEl,
  setAnchorEl
) => {
  if (
    profile.college._id !== selectedProfile.college._id ||
    role.role !== selectedRole
  ) {
    dispatch(setCurrentProfile(profile, role));
  }

  handleClose("college", anchorEl, setAnchorEl);
};

export const invisible = (alerts) => {
  if (!alerts) return true;

  return (
    alerts.pendingConversations.length === 0 &&
    alerts.pendingNotifications.length === 0 &&
    alerts.pendingPosts.length === 0 &&
    alerts.pendingTransactions.length === 0 &&
    alerts.pendingCalendar.length === 0
  );
};

export const onClickHandler = (action, setAction, setOpenModal) => {
  setAction(action);
  setOpenModal(true);
};

export const navigate = (history) => {
  history.push("/alumnos-a-cargo");
};
