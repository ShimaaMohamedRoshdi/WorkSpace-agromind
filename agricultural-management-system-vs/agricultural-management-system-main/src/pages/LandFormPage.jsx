import React, { useState, useEffect } from "react";
import api from "../../services/api";
import LocationSearch from "../components/LocationSearch";
import Joi from "joi";

export default function LandFormPage() {
  const [formData, setFormData] = useState({
    id: null,
    landName: "",
    size: "",
    soilType: "",
    irrigationType: "",
    startDate: "",
    latitude: "",
    longitude: "",
    pictureUrl: "",
    weatherCondition: "",
    waterSource: "",
    status: "",
  });

  const [lands, setLands] = useState([]);
  const [errors, setErrors] = useState({});

  // Fetch lands list from backend
  const fetchLands = async () => {
    try {
      const response = await api.get("/GetLands"); // Use controller action route only
      setLands(response.data);
    } catch (error) {
      console.error("Error fetching lands:", error);
    }
  };

  useEffect(() => {
    fetchLands();
  }, []);

  const soilTypes = [
    "Clay",
    "Sandy",
    "Silty",
    "Peaty",
    "Chalky",
    "Loamy",
    "Saline",
    "Laterite",
    "Black Soil",
    "Red Soil",
    "Alluvial",
  ];
  const irrigationTypes = [
    "Surface Irrigation",
    "Drip Irrigation",
    "Sprinkler Irrigation",
    "Manual Irrigation",
    "Subsurface Irrigation",
    "Center Pivot Irrigation",
    "Furrow Irrigation",
    "Flood Irrigation",
    "Basin Irrigation",
    "Border Irrigation",
  ];

  const schema = Joi.object({
    landName: Joi.string().min(3).max(50).required().messages({
      "string.base": "Land Name must be a string.",
      "string.min": "Land Name must be at least 3 characters long.",
      "string.max": "Land Name cannot exceed 50 characters.",
      "any.required": "Land Name is required.",
    }),
    size: Joi.string().min(1).required().messages({
      "string.base": "Size must be a string.",
      "string.min": "Size cannot be empty.",
      "any.required": "Land Size is required.",
    }),
    soilType: Joi.string()
      .valid(...soilTypes)
      .required()
      .messages({
        "any.only": "Please select a valid soil type.",
        "any.required": "Soil Type is required.",
      }),
    irrigationType: Joi.string()
      .valid(...irrigationTypes)
      .required()
      .messages({
        "any.only": "Please select a valid irrigation type.",
        "any.required": "Irrigation Type is required.",
      }),
    startDate: Joi.date().required().messages({
      "date.base": "Start Date must be a valid date.",
      "any.required": "Start Date is required.",
    }),
    latitude: Joi.number().required().messages({
      "number.base": "Latitude must be a number.",
      "any.required": "Latitude is required.",
    }),
    longitude: Joi.number().required().messages({
      "number.base": "Longitude must be a number.",
      "any.required": "Longitude is required.",
    }),
    pictureUrl: Joi.string().uri().optional().messages({
      "string.uri": "Picture URL must be a valid URL.",
    }),
    weatherCondition: Joi.string().optional().messages({
      "string.base": "Weather Condition must be a string.",
    }),
    waterSource: Joi.string().optional().messages({
      "string.base": "Water Source must be a string.",
    }),
    status: Joi.string().optional().messages({
      "string.base": "Status must be a string.",
    }),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationSelect = (location) => {
    setFormData({
      ...formData,
      latitude: location.geometry.lat,
      longitude: location.geometry.lng,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = schema.validate(formData, { abortEarly: false });

    if (error) {
      const newErrors = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    // Map frontend fields to backend fields
    const mappedData = {
      Id: formData.id,
      Name: formData.landName,
      AreaSize: parseFloat(formData.size),
      SoilType: formData.soilType,
      IrrigationType: formData.irrigationType,
      StartDate: formData.startDate,
      Latitude: parseFloat(formData.latitude),
      Longitude: parseFloat(formData.longitude),
      PictureUrl: formData.pictureUrl,

      waterSource: formData.waterSource,
    };

    try {
      if (formData.id) {
        console.log("Updating land:", mappedData);
        const res = await api.put(`/land/${formData.id}`, mappedData);
        console.log("UpdateLand response:", res);
      } else {
        console.log("Adding new land:", mappedData);
        const res = await api.post("/land/AddLand", mappedData);
        console.log("AddLand response:", res);
      }

      setFormData({
        id: null,
        landName: "",
        size: "",
        soilType: "",
        irrigationType: "",
        startDate: "",
        latitude: "",
        longitude: "",
        pictureUrl: "",
        weatherCondition: "",
        waterSource: "",
        status: "",
      });
      setErrors({}); // Clear errors after successful save
      await fetchLands(); // Ensure sidebar is always up-to-date
      alert("Land saved successfully!");
    } catch (err) {
      alert("Error saving land");
      console.error("Error in handleSubmit:", err);
    }
  };

  const handleEdit = (land) => {
    setFormData({ ...land });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this land?")) return;
    try {
      await api.delete(`/land/${id}`);
      await fetchLands();

      alert("Land deleted successfully.");
      if (formData.id === id) {
        setFormData({
          id: null,
          landName: "",
          size: "",
          soilType: "",
          irrigationType: "",
          startDate: "",
          latitude: "",
          longitude: "",
          pictureUrl: "",
          weatherCondition: "",
          waterSource: "",
          status: "",
        });
      }
    } catch (error) {
      alert("Error deleting land.");
      console.error(error);
    }
  };

  return (
    <div className="container-fluid px-0">
      <div className="row g-0">
        {/* Sidebar - flush left, no space */}
        <div
          className="col-lg-2 col-md-4 col-12 px-0"
          style={{
            minHeight: "100vh",
            background: "#f8f9fa",
            borderRight: "1px solid #e0e0e0",
          }}
        >
          <div className="p-4 h-100">
            <h2 className="fs-5 fw-bold mb-4 text-success">My Lands</h2>
            {lands.length === 0 ? (
              <p className="text-muted">No lands added yet.</p>
            ) : (
              <ul className="list-unstyled">
                {lands.map((land) => (
                  <li
                    key={land.id || land.Id}
                    className="bg-white p-3 mb-3 rounded d-flex justify-content-between align-items-center shadow-sm"
                  >
                    <div>
                      <div className="fw-semibold text-success">
                        {land.Name || land.landName}
                      </div>
                      <div className="text-secondary small">
                        {land.AreaSize || land.size}
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        onClick={() => handleEdit(land)}
                        className="btn btn-outline-success btn-sm px-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(land.id || land.Id)}
                        className="btn btn-outline-danger btn-sm px-3"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

<<<<<<< HEAD
          <div>
            <label className="block font-semibold">Land Size:</label>
            <input
              type="text"
              name="size"
              value={formData.size}
              placeholder="Size (e.g., 5 acres)"
              onChange={handleChange}
              className="w-full border p-2"
            />
            {errors.size && <p className="text-red-500">{errors.size}</p>}
          </div>

          <div>
            <label className="block font-semibold">Soil Type:</label>
            <select
              name="soilType"
              value={formData.soilType}
              onChange={handleChange}
              className="w-full border p-2"
            >
              <option value="">-- Select Soil Type --</option>
              {soilTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.soilType && (
              <p className="text-red-500">{errors.soilType}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">Irrigation Type:</label>
            <select
              name="irrigationType"
              value={formData.irrigationType}
              onChange={handleChange}
              className="w-full border p-2"
            >
              <option value="">-- Select Irrigation Type --</option>
              {irrigationTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.irrigationType && (
              <p className="text-red-500">{errors.irrigationType}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border p-2"
            />
            {errors.startDate && (
              <p className="text-red-500">{errors.startDate}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">Search Location:</label>
            <LocationSearch onLocationSelect={handleLocationSelect} />
            {errors.latitude && (
              <p className="text-red-500">{errors.latitude}</p>
            )}
            {errors.longitude && (
              <p className="text-red-500">{errors.longitude}</p>
            )}
          </div>
       
          <div>
            <label className="block font-semibold">Picture URL:</label>
            <input
              type="text"
              name="pictureUrl"
              value={formData.pictureUrl}
              placeholder="https://example.com/image.jpg"
              onChange={handleChange}
              className="w-full border p-2"
            />
            {errors.pictureUrl && (
              <p className="text-red-500">{errors.pictureUrl}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">Water Source:</label>
            <input
              type="text"
              name="waterSource"
              value={formData.waterSource}
              placeholder="e.g., Well, River"
              onChange={handleChange}
              className="w-full border p-2"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
            onClick={handleSubmit}
=======
        {/* Form */}
        <div className="col-lg-9 col-md-8 col-12 px-0">
          <div
            className="bg-white p-4 shadow pe-5"
            style={{ minHeight: "100vh" }}
>>>>>>> recovered-branch
          >
            <h2 className="fs-4 fw-bold mb-4 text-success">
              {formData.id ? "Update Land" : "Add Land Information"}
            </h2>
            <form onSubmit={handleSubmit} className="row ">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Land Name</label>
                <input
                  type="text"
                  name="landName"
                  placeholder="Land Name"
                  value={formData.landName}
                  onChange={handleChange}
                  className="form-control"
                />
                {errors.landName && (
                  <div className="text-danger small">{errors.landName}</div>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Land Size</label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  placeholder="Size (e.g., 5 acres)"
                  onChange={handleChange}
                  className="form-control"
                />
                {errors.size && (
                  <div className="text-danger small">{errors.size}</div>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Soil Type</label>
                <select
                  name="soilType"
                  value={formData.soilType}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">-- Select Soil Type --</option>
                  {soilTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.soilType && (
                  <div className="text-danger small">{errors.soilType}</div>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Irrigation Type
                </label>
                <select
                  name="irrigationType"
                  value={formData.irrigationType}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">-- Select Irrigation Type --</option>
                  {irrigationTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.irrigationType && (
                  <div className="text-danger small">
                    {errors.irrigationType}
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="form-control"
                />
                {errors.startDate && (
                  <div className="text-danger small">{errors.startDate}</div>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Search Location
                </label>
                <LocationSearch onLocationSelect={handleLocationSelect} />
                {errors.latitude && (
                  <div className="text-danger small">{errors.latitude}</div>
                )}
                {errors.longitude && (
                  <div className="text-danger small">{errors.longitude}</div>
                )}
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">Picture URL</label>
                <input
                  type="text"
                  name="pictureUrl"
                  value={formData.pictureUrl}
                  placeholder="https://example.com/image.jpg"
                  onChange={handleChange}
                  className="form-control"
                />
                {errors.pictureUrl && (
                  <div className="text-danger small">{errors.pictureUrl}</div>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Water Source</label>
                <input
                  type="text"
                  name="waterSource"
                  value={formData.waterSource}
                  placeholder="e.g., Well, River"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className=" text-end mt-3">
                <button
                  type="submit"
                  className="btn btn-success me-5 fw-bold shadow-sm"
                  style={{
                    borderRadius: 8,
                    fontSize: 17,
                    letterSpacing: 0.5,
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
