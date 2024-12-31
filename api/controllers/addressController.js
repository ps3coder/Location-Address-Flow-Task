import Address from "../models/Address.js";
import apiResponse from "../utils/apiResponse.js";

export const addAddress = async (req, res) => {
  try {
    const address = await Address.create(req.body);
    return apiResponse.success(res, address, "Address added Successfully");
  } catch (error) {
    // console.error(error);
    return apiResponse.error(res, error);
  }
};

export const getAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      return apiResponse.error(res, { message: "Address not found" }, 404);
    }
    return apiResponse.success(res, address, "Address found Successfully");
  } catch (error) {
    // console.error(error);
    return apiResponse.error(res, error);
  }
};
export const getAllAddress = async (req, res) => {
  try {
    const address = await Address.find();
    if (!address) {
      return apiResponse.error(res, { message: "Address not found" }, 404);
    }
    return apiResponse.success(res, address, "Address found Successfully");
  } catch (error) {
    // console.error(error);
    return apiResponse.error(res, error);
  }
};

export const updateAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!address) {
      return apiResponse.error(res, { message: "Address not found" }, 404);
    }
    return apiResponse.success(res, address, "Address updated Successfully");
  } catch (error) {
    // console.error(error);
    return apiResponse.error(res, error);
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndDelete(req.params.id);

    if (!address) {
      return apiResponse.error(res, { message: "Address not found" }, 404);
    }
    return apiResponse.success(res, address, "Address deleted Successfully");
  } catch (error) {
    // console.error(error);
    return apiResponse.error(res, error);
  }
};
