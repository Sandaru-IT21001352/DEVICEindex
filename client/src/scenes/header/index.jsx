import { DarkMode, LightMode } from "@mui/icons-material";
import { Box, IconButton, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import logo from "../../components/LOGO.svg";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const dispatch = useDispatch();
  return (
    <FlexBetween backgroundColor={alt}>
      <Box
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => navigate("/location")}
      >
        <img src={logo} alt="logo" />
      </Box>

      <IconButton onClick={() => dispatch(setMode())} sx={{ fontSize: "25px" }}>
        {theme.palette.mode === "dark" ? (
          <DarkMode sx={{ fontSize: "25px" }} />
        ) : (
          <LightMode sx={{ color: dark, fontSize: "25px" }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Header;
