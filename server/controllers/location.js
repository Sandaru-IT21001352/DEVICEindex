import Location from "../models/Location.js";

/* get location */
export const getLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id).populate(
      "devices"
    );
    res.status(200).json(location);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* CREATE */
export const createLocation = async (req, res) => {
  try {
    const { name, address, phoneNumber } = req.body;

    console.log(req.body);
    //check if all the fields are filled
    if (!name || !address || !phoneNumber)
      throw new Error("Please fill all the fields location");
    //check if the location already exists
    const foundLocation = await Location.findOne({ name });
    //if it exists, return an error
    if (foundLocation) throw new Error("Location already exists");

    //if it doesn't exist, create a new location
    const newLocation = new Location({ name, address, phoneNumber });
    await newLocation.save();
    const locations = await Location.find();
    res.status(200).json(
      locations.map((location) => ({
        id: location._id,
        name: location.name,
        address: location.address,
      }))
    );
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* get all locations */
export const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(
      locations.map((location) => ({
        id: location._id,
        name: location.name,
        address: location.address,
      }))
    );
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* deleteLocation */
export const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;
    //check if the location exists
    const foundLocation = await Location.findById(id);
    //if not, return an error
    if (!foundLocation) throw new Error("Location not found!");

    //if it exists, delete it
    const deletedLocations = await foundLocation.deleteOne({ _id: id });
    res.status(201).json(deletedLocations);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
/* update a location */
export const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;

    const foundLocation = await Location.findById(id);
    if (!foundLocation) throw new Error("Location not found!");

    const updatedLocation = await Location.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updatedLocation);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
