import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

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
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validateForm()) {
      try {
        const success = await onLogin(formData);
        if (success) {
          toast.success("Login successful!");
        } else {
          toast.error("Invalid email or password");
        }
      } catch (error) {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
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
                  <h4 className="text-center">Login</h4>
                </div>

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="form-spacing"
                >
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

                  <div>
                    <button type="submit" className="btn btn-primary w-100">
                      Login
                    </button>
                  </div>

                  <div className="text-center">
                    <small>
                      Don't have an account?{" "}
                      <Link to="/register" className="login-link">
                        Register
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

export default Login;
