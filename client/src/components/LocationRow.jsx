import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import FlexBetween from "./FlexBetween";

const LocationRow = ({ id, name, address }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <Box
      flexDirection="column"
      width="100%"
      onClick={() => {
        navigate(`/location/${id}`);
        // navigate(0);
      }}
      sx={{
        "&:hover": {
          backgroundColor: palette.primary.light,
          cursor: "pointer",
        },
      }}
    >
      <Typography variant="h4" color={palette.neutral.dark}>
        {name}
      </Typography>
      <Typography variant="body1" color={palette.neutral.dark}>
        {address}
      </Typography>
    </Box>
  );
};
export default LocationRow;
