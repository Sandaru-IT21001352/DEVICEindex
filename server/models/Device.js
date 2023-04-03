import mongoose from "mongoose";

const DeviceSchema = new mongoose.Schema({
  serialNumber: {
    type:String,
    required: true,
    unique: true,
  },type: {
    type:String,
    required: true,
  },imageURL: {
    type:Number,
    required: true,
  },status: {
    type: Boolean,
    required: true,
  },
}, { timestamps: true });

const Device = mongoose.model("Device", DeviceSchema);
export default Device;