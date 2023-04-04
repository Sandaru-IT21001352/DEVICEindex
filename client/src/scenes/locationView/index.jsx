import {
  Box,
  Button,
  Typography,
  useTheme,
  DialogTitle,
  DialogContent,
  Dialog,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import DeviceTable from "components/DeviceTable";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setLocation } from "state";
import CreateDeviceForm from "components/CreateDeviceForm";
import DeleteConfirm from "components/DeleteConfirm";
import AddIcon from '@mui/icons-material/Add';


const LocationView = () => {
  const location = useSelector((state) => state.location);
  const { locationId } = useParams();

  const dispatch = useDispatch();
  const { palette } = useTheme();

  const getLocation = async () => {
    const response = await fetch(`/api/location/${locationId}`);
    const data = await response.json();
    dispatch(setLocation({ location: data }));
  };

  useEffect(() => {
    getLocation();
  }, [locationId]); // eslint-disable-line react-hooks/exhaustive-deps

  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {location === null ? (
        <Box>Device not fund</Box>
      ) : (
        <WidgetWrapper>
          <Box display="flex" flexDirection="column" gap="0.75rem">
            <FlexBetween>
              <Typography
                variant="h2"
                color={dark}
                fontWeight="500"
                display="flex"
              >
                {location.name}
              </Typography>
            <DeleteConfirm locationId = {locationId}/>
            </FlexBetween>

            <Box display="flex" flexDirection="column" gap="0rem">
              <Typography variant="body1" color={medium} fontWeight="500">
                Address : {location.address}
              </Typography>
              <Typography variant="body1" color={medium} fontWeight="500">
                Phone Number : {location.phoneNumber}
              </Typography>
            </Box>
            <Box>
              <FlexBetween>
                <Box>Devices</Box>
                <Box>
                  <Button
                    fullWidth
                    sx={{
                      m: "0.75rem 0",
                      backgroundColor: palette.primary.main,
                      color: palette.background.alt,
                      "&:hover": { color: palette.primary.main },
                    }}
                    onClick={handleClickOpen}
                    endIcon={<AddIcon />}
                  >
                    Add New Device
                    
                  </Button>
                </Box>
              </FlexBetween>

              <hr />
            </Box>
            <Box>
              {location === undefined ||
              location.devices === undefined ||
              location.devices.length == 0 ? (
                <Typography variant="body1" color={medium} fontWeight="500">
                  No devices found
                </Typography>
              ) : (
                <DeviceTable devices={location.devices} />
              )}
            </Box>
          </Box>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              Add new device
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
              <CreateDeviceForm
                locationId={location._id}
                handleClose={handleClose}
              />
            </DialogContent>
          </Dialog>
        </WidgetWrapper>
      )}
    </>
  );
};

export default LocationView;
