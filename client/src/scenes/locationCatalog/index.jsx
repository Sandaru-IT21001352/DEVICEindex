import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocations } from "state";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import CreateLocationForm from "components/CreateLocationForm";
import FlexBetween from "components/FlexBetween";
import LocationRow from "components/LocationRow";
import WidgetWrapper from "components/WidgetWrapper";
import AddIcon from '@mui/icons-material/Add';

const LocationCatalog = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const locations = useSelector((state) => state.locations);

  const getLocations = async () => {
    try {
      const response = await fetch("/api/location/");
      const data = await response.json();
      dispatch(setLocations({ locations: data }));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getLocations();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <WidgetWrapper>
      <FlexBetween flexDirection="column" gap="0.75rem">
        <Button
          fullWidth
          sx={{
            m: "0.75rem 0",
            p: "0.5rem",
            backgroundColor: palette.primary.main,
            color: palette.background.alt,
            "&:hover": { color: palette.primary.main },
          }}
          endIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Add Location
        </Button>
        {locations &&
          locations.map((location) => (
            <LocationRow key={location.id} {...location} />
          ))}
      </FlexBetween>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Add new Location
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <CreateLocationForm />
        </DialogContent>
      </Dialog>
    </WidgetWrapper>
  );
};

export default LocationCatalog;
