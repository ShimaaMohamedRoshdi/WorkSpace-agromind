import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Joi from "joi";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");

export default function LandFormPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedLandId, setSelectedLandId] = useState(null);
  const [selectedLand, setSelectedLand] = useState(null);
  const [lands, setLands] = useState([]);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    id: null,
    landName: "",
    size: "",
    soilType: "",
    irrigationType: "",
    pictureUrl: "",
    location: "",
    waterSource: "",
  });

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

  const governorates = [
    "Cairo",
    "Alexandria",
    "Giza",
    "Shubra El Kheima",
    "Port Said",
    "Suez",
    "Mansoura",
    "Tanta",
    "Asyut",
    "Ismailia",
    "Zagazig",
    "Fayoum",
    "Beni Suef",
    "Qena",
    "Luxor",
    "Aswan",
    "Damanhour",
    "Minya",
    "Damietta",
    "Helwan",
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
    location: Joi.string()
      .valid(...governorates)
      .required()
      .messages({
        "any.only": "Please select a valid governorate.",
        "any.required": "Governorate is required.",
      }),
    pictureUrl: Joi.string().uri().allow("").optional().messages({
      "string.uri": "Picture URL must be a valid URL.",
    }),
    waterSource: Joi.string().allow("").optional().messages({
      "string.base": "Water Source must be a string.",
    }),
  });

  useEffect(() => {
    fetchLands();
  }, []);

  // In LandFormPage.jsx

  const fetchLands = async () => {
    // Get the token from localStorage to authorize the request
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, cannot fetch user's lands.");
      // Optionally, you could redirect to login here
      // navigate('/signin');
      return;
    }

    try {
      // CHANGED: This endpoint now correctly gets ONLY the lands for the logged-in user.
      const response = await api.get("/api/Land/GetMyLands", {
        headers: {
          // ADDED: The secure endpoint requires the token to be sent.
          Authorization: `Bearer ${token}`,
        },
      });
      setLands(response.data);
    } catch (error) {
      console.error("Error fetching my lands:", error);
      // Handle potential auth errors if the token is expired
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        alert(
          "Your session may have expired. Please log in again to see your lands."
        );
        // navigate('/signin');
      }
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, ...dataToValidate } = formData;
    const { error } = schema.validate(dataToValidate, { abortEarly: false });

    if (error) {
      const newErrors = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    const mappedData = {
      LandName: formData.landName,
      Size: parseFloat(formData.size),
      SoilType: formData.soilType,
      IrrigationType: formData.irrigationType,
      Location: formData.location,
      PictureUrl: formData.pictureUrl,
      waterSource: formData.waterSource,
      FarmerId: localStorage.getItem("userId"),
    };
    if (formData.id) mappedData.Id = formData.id;

    try {
      if (formData.id) {
        await api.put(`/api/Land/UpdateLandById/${formData.id}`, mappedData);
      } else {
        await api.post("api/Land/AddLand", mappedData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setFormData({
        id: null,
        landName: "",
        size: "",
        soilType: "",
        irrigationType: "",
        location: "",
        pictureUrl: "",
        waterSource: "",
      });
      setErrors({});
      fetchLands();
      alert("Land saved successfully!");
    } catch (err) {
      console.error("Error saving land:", err);
      alert(`Error saving land: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleEdit = (land) => {
    setFormData({
      id: land.id || land.Id || null,
      landName: land.LandName || "",
      size: land.Size?.toString() || "",
      soilType: land.SoilType || "",
      irrigationType: land.IrrigationType || "",
      location: land.Location || "",
      pictureUrl: land.PictureUrl || "",
      waterSource: land.waterSource || "",
    });
  };

  const handleDelete = (id) => {
    setModalAction("delete");
    setSelectedLandId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/api/Land/DeletLand/${selectedLandId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchLands();
      setShowModal(false);
      alert("Land deleted successfully.");
    } catch (error) {
      alert("Error deleting land.");
    }
  };

  const handleStartPlantingButton = (land) => {
    setSelectedLand(land); // Set the full land data
    setSelectedLandId(land.Id); // Set the ID correctly

    setModalAction("plant");
    setShowModal(true);
  };

  const goToRecommendation = () => {
    setShowModal(false);
    localStorage.setItem("landId", selectedLandId);
    navigate(`/RecommendPlan`);
    // navigate(`/RecommendPlan/${selectedLandId}`);
  };

  const goToSpecifyPlant = (land) => {
    setShowModal(false);
    navigate(`/create-plan?landId=${selectedLandId}`); 
    // localStorage.setItem("landId", selectedLandId);
  };

  return (
    <div className="container-fluid">
      <div className="row g-0">
        {/* Sidebar - flush left, no space */}
        <div className="col-lg-3 col-md-4 col-12 bg-light p-3 border-end">
          <div className="p-2 h-100 ">
            <h2 className="fs-3 fw-bolder mb-4 text-success text-center">
              My Lands
            </h2>
            {lands.length === 0 ? (
              <p className="text-muted">No lands added yet.</p>
            ) : (
              <ul className="list-unstyled">
                {lands.map((land) => (
                  <li
                    key={land.Id}
                    className="bg-white p-3 mb-3  rounded d-flex justify-content-between align-items-center shadow-sm"
                  >
                    <div>
                      <div className="fw-semibold text-success">
                        {land.LandName}
                      </div>
                      <div className="text-secondary small">
                        {land.Location}
                      </div>
                      <div className="text-secondary small">
                        <p>Size: {land.Size}</p>
                      </div>
                    </div>
                    <div className="d-flex gap-2 flex-wrap justify-content-end">
                      <button
                        onClick={() => handleEdit(land)}
                        className="btn btn-outline-success btn-sm w-100 w-sm-auto"
                      >
                        Edit Land
                      </button>
                      <button
                        onClick={() => handleDelete(land.Id)}
                        className="btn btn-outline-danger btn-sm w-100 w-sm-auto"
                      >
                        Delete Land
                      </button>
                      <button
                        onClick={() => handleStartPlantingButton(land)}
                        className="btn btn-outline-primary btn-sm w-100 w-sm-auto"
                      >
                        Start planting
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Form */}
        <div className=" my-5 col-lg-8 col-md-8 col-12 d-flex justify-content-center align-items-center">
          <div className="bg-white ">
            <h2 className="fs-3 fw-bold mb-4 text-success ">
              {formData.id ? "Update Land" : "Add Land Information"}
            </h2>
            <form onSubmit={handleSubmit} className="row ">
              <div className="col-md-7">
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
              <div className="col-md-7">
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
              <div className="col-md-7">
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
              <div className="col-md-7">
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

              {/* Governorate */}
              <div className="col-md-7">
                <label className="form-label fw-semibold">Location</label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">-- Select location --</option>
                  {governorates.map((gov, index) => (
                    <option key={index} value={gov}>
                      {gov}
                    </option>
                  ))}
                </select>
                {errors.location && (
                  <div className="text-danger small">{errors.location}</div>
                )}
              </div>

              <div className="col-md-7">
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
              <div className="col-md-7">
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

              <div className="col-5 text-end mt-5 ">
                <button
                  type="submit"
                  className="btn btn-success me-5 fw-bold shadow-sm"
                  style={{
                    borderRadius: 10,
                    fontSize: 17,
                    letterSpacing: 0.5,
                    width: 200,
                  }}
                >
                  {formData.id ? "Update Land" : "Save Land"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog ">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-success">
                  {modalAction === "delete"
                    ? "Confirm Delete"
                    : "Planting Options"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {modalAction === "delete" && (
                  <p>Are you sure you want to delete this land?</p>
                )}
                {modalAction === "plant" && (
                  <>
                    <p>
                      What would you like to do on{" "}
                      <strong>{selectedLand?.LandName}</strong>?
                    </p>
                    <div className="d-flex flex-column gap-2 mt-3">
                      <button
                        className="btn btn-outline-primary"
                        onClick={goToRecommendation}
                      >
                        🌱 Get Plant Recommendation
                      </button>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={goToSpecifyPlant}
                      >
                        🧑‍🌾 Specify Plant to Grow
                      </button>
                    </div>
                  </>
                )}
              </div>
              {modalAction === "delete" && (
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={confirmDelete}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
