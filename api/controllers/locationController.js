import getLocation from "../utils/geolocationHelper.js";
import apiResponse from "../utils/apiResponse.js";
import SavedLocation from "../models/SavedLocation.js";

export const getLocation1 = async (req, res) => {
  try {
    const location = await getLocation(req.query.lat, req.query.lng);
    return apiResponse.success(res, location);
  } catch (error) {
    return apiResponse.error(res, error);
  }
};
export const getAllLocation = async (req, res) => {
  try {
    const location = await SavedLocation.find();
    return apiResponse.success(res, location);
  } catch (error) {
    return apiResponse.error(res, error);
  }
};

export const saveAddress = async (req, res) => {
  try {
    const address = await SavedLocation.create(req.body);
    return apiResponse.success(res, address);
  } catch (error) {
    return apiResponse.error(res, error);
  }
};
export const deleteLocation = async (req, res) => {
  try {
    const location = await SavedLocation.findByIdAndDelete(req.params._id);
    return apiResponse.success(res, location);
  } catch (error) {
    return apiResponse.error(res, error);
  }
};
