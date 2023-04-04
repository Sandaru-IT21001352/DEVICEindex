import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";
import { setLocations } from "state";
import { useDispatch } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DeleteConfirm({ locationId }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteLocation = async () => {
    await fetch(`/api/location/${locationId}`, {
      method: "DELETE",
    });
    const response = await fetch("/api/location/");
    const data = await response.json();
    dispatch(setLocations({ locations: data }));
    navigate("/location");

    setOpen(false);
  };

  return (
    <div>
      <IconButton
        aria-label="close"
        onClick={handleClickOpen}
        sx={{
          color: (theme) => theme.palette.warning.main,
        }}
      >
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are You Sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This will remove the location permanently.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteLocation}>Delete</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteConfirm;
