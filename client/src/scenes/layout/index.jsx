import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "scenes/header";
import LocationCatalog from "scenes/locationCatalog";

const Layout = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <Box>
      <Header />
      <Box
        width="100%"
        padding="2rem 10%"
        display="flex"
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <LocationCatalog />
        </Box>

        <Box flexBasis="74%">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
