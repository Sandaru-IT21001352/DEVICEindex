import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  name: {
    type:String,
    required: true,
    unique: true,
  },address: {
    type:String,
    required: true,
  },phoneNumber: {
    type:Number,
    required: true,
  },devices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Device",
    default: [],
  }],
}, { timestamps: true });

const Location = mongoose.model("Location", LocationSchema);
export default Location;