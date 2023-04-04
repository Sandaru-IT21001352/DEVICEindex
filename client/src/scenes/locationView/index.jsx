import { useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setLocation } from "state";

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

  return (
    <WidgetWrapper>
      <FlexBetween flexDirection="column" F gap="0.75rem">
        <h1>{location.name}</h1>
        <>{JSON.stringify(location)}</>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default LocationView;
