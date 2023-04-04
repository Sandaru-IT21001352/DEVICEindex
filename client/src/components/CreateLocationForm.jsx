import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FlexBetween from "components/FlexBetween";
import { setLocations } from "state";

const formSchema = yup.object().shape({
  name: yup.string().required("required"),
  address: yup.string().required("required"),
  phoneNumber: yup.number().required("required"),
});

const initialValues = {
  name: "",
  address: "",
  phoneNumber: "",
};

const CreateLocationForm = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newLocation = async (values, onSubmitProps) => {

    const locationRes = await fetch("/api/location/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify(values)
    });
    const location = await locationRes.json();
    console.log(location)
    onSubmitProps.resetForm();

    if (location) {
      dispatch(setLocations(location));
      navigate("/");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    newLocation(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={formSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            padding="1rem"
            display="flex"
            flexDirection="column"
            width="450px"
            gap="1rem"
          >
            <TextField
              label="Location Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              name="name"
              error={Boolean(touched.name) && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              label="Address"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.address}
              name="address"
              error={Boolean(touched.address) && Boolean(errors.address)}
              helperText={touched.address && errors.address}
            />
            <TextField
              label="Phone Number"
              type="tel"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.phoneNumber}
              name="phoneNumber"
              error={Boolean(touched.phoneNumber) && Boolean(errors.phoneNumber)}
              helperText={touched.phoneNumber && errors.phoneNumber}
            />
            <Button
              fullWidth
              type="submit"
              sx={{
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              Add new Location
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default CreateLocationForm;
