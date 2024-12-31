import mongoose from "mongoose";

const { Schema, model } = mongoose;

const savedLocationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: mongoose.isValidObjectId,
      message: "Invalid userId",
    },
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: "Address",
    required: true,
    validate: {
      validator: mongoose.isValidObjectId,
      message: "Invalid location ID",
    },
  },
});

const SavedLocation = model("SavedLocation", savedLocationSchema);
export default SavedLocation;
