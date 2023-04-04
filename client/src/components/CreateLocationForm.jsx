import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLocations } from "state";
import { useState } from "react";

const formSchema = yup.object().shape({
  name: yup.string().required("required"),
  address: yup.string().required("required"),
  phoneNumber: yup.number("Enter a number!").required("required"),
});

const initialValues = {
  name: "",
  address: "",
  phoneNumber: "",
};

const CreateLocationForm = () => {
  const [error, setError] = useState("");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newLocation = async (values, onSubmitProps) => {
    try {
      const locationRes = await fetch("/api/location/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const locations = await locationRes.json();
   
   
      if (!locationRes.ok) {
        // setError("Error");
          throw new Error('Location already exists!');
        }

      if (locationRes.ok) {
        dispatch(setLocations(locations));
        navigate("/");
        onSubmitProps.resetForm();
      }
    } catch (err) {
      setError(err.message);
      console.log(err);
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
              error={
                Boolean(touched.phoneNumber) && Boolean(errors.phoneNumber)
              }
              helperText={touched.phoneNumber && errors.phoneNumber}
            />
            {error&&<Box><Typography variant="body1" color="red">{error}</Typography></Box>}
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
