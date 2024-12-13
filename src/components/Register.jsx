import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    about: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    // Full name validation
    if (!formData.fullName.trim()) {
      tempErrors.fullName = "Full name is required";
      isValid = false;
    } else if (/\d/.test(formData.fullName)) {
      tempErrors.fullName = "Name cannot contain numbers";
      isValid = false;
    } else if (formData.fullName.length < 2) {
      tempErrors.fullName = "Full name must be at least 2 characters";
      isValid = false;
    }

    // Gender validation
    if (!formData.gender) {
      tempErrors.gender = "Please select a gender";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Please enter a valid email";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // About validation (optional)
    if (formData.about && formData.about.length > 500) {
      tempErrors.about = "About section cannot exceed 500 characters";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validateForm()) {
      try {
        const success = await onRegister(formData);
        if (success) {
          toast.success("Registration successful!");
        } else {
          toast.error("Email already exists");
        }
      } catch (error) {
        toast.error("Registration failed. Please try again.");
      }
    } else {
      toast.error("Please fix the errors in the form");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent numbers in full name field
    if (name === "fullName" && /\d/.test(value)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-5">
            <div className="card shadow-lg">
              <div className="card-body p-4">
                <div className="heading-container">
                  <img src="/images/logo.jpg" width="50px" height="50px" />
                  <h4 className="text-center">Create Account</h4>
                </div>

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="form-spacing"
                >
                  <div>
                    <input
                      type="text"
                      className={`form-control ${
                        isSubmitted && errors.fullName ? "is-invalid" : ""
                      }`}
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Full Name"
                    />
                    {isSubmitted && errors.fullName && (
                      <div className="invalid-feedback">{errors.fullName}</div>
                    )}
                  </div>

                  <div>
                    <select
                      className={`form-select ${
                        isSubmitted && errors.gender ? "is-invalid" : ""
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
                    {isSubmitted && errors.gender && (
                      <div className="invalid-feedback">{errors.gender}</div>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      className={`form-control ${
                        isSubmitted && errors.email ? "is-invalid" : ""
                      }`}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                    />
                    {isSubmitted && errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  <div className="password-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${
                        isSubmitted && errors.password ? "is-invalid" : ""
                      }`}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      className="eye-icon"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {isSubmitted && errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>

                  <div className="password-container">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className={`form-control password-input ${
                        isSubmitted && errors.confirmPassword
                          ? "is-invalid"
                          : ""
                      }`}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm Password"
                    />
                    <button
                      type="button"
                      className="eye-icon"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                    {isSubmitted && errors.confirmPassword && (
                      <div className="invalid-feedback">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>

                  <div>
                    <textarea
                      className={`form-control compact-textarea ${
                        isSubmitted && errors.about ? "is-invalid" : ""
                      }`}
                      name="about"
                      value={formData.about}
                      onChange={handleChange}
                      placeholder="About (Optional)"
                    />
                    {isSubmitted && errors.about && (
                      <div className="invalid-feedback">{errors.about}</div>
                    )}
                  </div>

                  <div>
                    <button type="submit" className="btn btn-primary w-100">
                      Create Account
                    </button>
                  </div>

                  <div className="text-center">
                    <small>
                      Already have an account?{" "}
                      <Link to="/login" className="login-link">
                        Login
                      </Link>
                    </small>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
