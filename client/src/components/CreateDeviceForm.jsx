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
import { Field, Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FlexBetween from "components/FlexBetween";
import { setLocation } from "state";
import Dropzone from "react-dropzone";

const formSchema = yup.object().shape({
  serialNumber: yup.string().required("required"),
  type: yup.string().required("required"),
  imageURL: yup.string().required("required"),
  status: yup.string().required("required"),
});

const initialValues = {
  serialNumber: "",
  type: "",
  imageURL: "",
  status: "inactive",
};

const CreateDeviceForm = ({ locationId ,handleClose}) => {
  const [error, setError] = useState("");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newDevice = async (values, onSubmitProps) => {
    try {
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      formData.append("imageURL", values.imageURL.name);

      const locationRes = await fetch(`/api/device/${locationId}/`, {
        method: "POST",
        body:formData,
      });
      const location = await locationRes.json();

      if (!locationRes.ok) {
        throw new Error("Error!");
      }

      if (locationRes.ok) {

        //TODO dispatch to redux
        handleClose();
        navigate(`/location`);
        onSubmitProps.resetForm();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    newDevice(values, onSubmitProps);
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
              label="Serial Number"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.serialNumber}
              name="serialNumber"
              error={
                Boolean(touched.serialNumber) && Boolean(errors.serialNumber)
              }
              helperText={touched.serialNumber && errors.serialNumber}
            />
            <TextField
              label="Type"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.type}
              name="type"
              error={Boolean(touched.type) && Boolean(errors.type)}
              helperText={touched.type && errors.type}
            />

            <Box
              gridColumn="span 4"
              border={`1px solid ${palette.neutral.medium}`}
              borderRadius="5px"
              p="1rem"
            >
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) =>
                  setFieldValue("imageURL", acceptedFiles[0])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!values.imageURL ? (
                      <p>Add Picture Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{values.imageURL.name}</Typography>
                        <EditOutlinedIcon />
                      </FlexBetween>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Box>
            <div role="group" aria-labelledby="my-radio-group">
              <label>
                <Field type="radio" name="status" value="active" />
                Active
              </label>
              <label>
                <Field type="radio" name="status" value="inactive" />
                Inactive
              </label>
            </div>
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
              Add new Device
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default CreateDeviceForm;
