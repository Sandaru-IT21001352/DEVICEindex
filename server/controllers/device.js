import Device from "../models/Device.js";
import Location from "../models/Location.js";

/* CREATE */
export const createDevice = async (req, res) => {
  try {
    const { serialNumber, type, imageURL, status } = req.body;
    //check if all the fields are filled
    if (!serialNumber || !type || !imageURL || !status)
      throw new Error("Please fill all the fields");

    const location = await Location.findById(req.params.locationId);
    if (!location) throw new Error("Location not found!");

    const newDevice = new Device({ serialNumber, type, imageURL, status });
    await newDevice.save();

    location.devices.push(newDevice);
    await location.save();

    res.status(201).json(location);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

//TODO remove

/* get all locations */
export const getAllDevices = async (req, res) => {
  try {
    const devices = await Device.find();
    res.status(200).json(devices);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* deleteLocation */
export const deleteDevice = async (req, res) => {
  try {
    const { deviceId, locationId } = req.params;

    const location = await Location.findById(locationId);
    if (!location) throw new Error("Location not found!");

    const device = await Device.findById(deviceId);
    if (!device) throw new Error("Device not found!");

    //delete from device document
    const deletedDevice = await device.deleteOne({ _id: deviceId });

    //delete from array
    location.devices.pull(deviceId);
    await location.save();

    res.status(201).json(deletedDevice);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
/* update a location */
export const updateDevice = async (req, res) => {
  try {
    const { deviceId, locationId } = req.params;

    const location = await Location.findById(locationId);
    if (!location) throw new Error("Location not found!");

    const updatedDevice = await Device.findByIdAndUpdate({_id:deviceId}, req.body, {
      new: true,
    });

    res.status(201).json(updatedDevice);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
