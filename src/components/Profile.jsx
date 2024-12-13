import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Edit } from "lucide-react";

function Profile({ user, setCurrentUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    gender: user.gender,
    about: user.about || "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.fullName.trim()) {
      tempErrors.fullName = "Full name is required";
      isValid = false;
    } else if (/\d/.test(formData.fullName)) {
      tempErrors.fullName = "Name cannot contain numbers";
      isValid = false;
    }

    if (!formData.gender) {
      tempErrors.gender = "Please select a gender";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (formData.about && formData.about.length > 500) {
      tempErrors.about = "About section cannot exceed 500 characters";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Update the current user state
      const updatedUser = { ...user, ...formData };
      setCurrentUser(updatedUser);

      // Update user in localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((u) =>
        u.email === user.email ? updatedUser : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // Update current user in localStorage
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } else {
      toast.error("Please fix the errors in the form");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent numbers in fullName field
    if (name === "fullName" && /\d/.test(value)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="card-title m-0">Profile Details</h4>
                {!isEditing && (
                  <button
                    className="btn btn-outline-primary d-flex align-items-center gap-2"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit size={18} />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>

              {!isEditing ? (
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="p-3 bg-light rounded">
                      <small className="text-muted d-block mb-1">
                        Full Name
                      </small>
                      <div className="fw-bold">{user.fullName}</div>
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <div className="p-3 bg-light rounded">
                      <small className="text-muted d-block mb-1">Email</small>
                      <div className="fw-bold">{user.email}</div>
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <div className="p-3 bg-light rounded">
                      <small className="text-muted d-block mb-1">Gender</small>
                      <div className="fw-bold text-capitalize">
                        {user.gender}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 min-">
                    <div
                      className="p-3 bg-light rounded"
                      style={{ minHeight: "125px" }}
                    >
                      <small className="text-muted d-block mb-1">About</small>
                      <div className="fw-bold">
                        {user.about || (
                          <span className="text-muted fst-italic">
                            No information provided
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="form-spacing">
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.fullName ? "is-invalid" : ""
                      }`}
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                    {errors.fullName && (
                      <div className="invalid-feedback">{errors.fullName}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <select
                      className={`form-select ${
                        errors.gender ? "is-invalid" : ""
                      }`}
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && (
                      <div className="invalid-feedback">{errors.gender}</div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="form-label">About</label>
                    <textarea
                      className={`form-control ${
                        errors.about ? "is-invalid" : ""
                      }`}
                      name="about"
                      value={formData.about}
                      onChange={handleChange}
                      rows="3"
                      style={{ resize: "none" }}
                    />
                    {errors.about && (
                      <div className="invalid-feedback">{errors.about}</div>
                    )}
                    <small className="text-muted">Maximum 500 characters</small>
                  </div>

                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        setFormData({
                          fullName: user.fullName,
                          email: user.email,
                          gender: user.gender,
                          about: user.about || "",
                        });
                        setIsEditing(false);
                        setErrors({});
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
