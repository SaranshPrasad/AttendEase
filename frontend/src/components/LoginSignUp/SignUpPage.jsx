import React, { useState, useEffect } from "react";
import Logo from "../../assets/Logo.png";
import { Link, useNavigate } from 'react-router';
import axios from "axios";
// Define portals and their details
const portals = [
  {
    id: "student",
    name: "Student Portal",
    icon: "📚",
    description: "Access attendance records",
  },
  {
    id: "faculty",
    name: "Faculty Portal",
    icon: "👩‍🏫",
    description: "Manage student attendance",
  },
  {
    id: "admin",
    name: "Admin Portal",
    icon: "⚙️",
    description: "System administration",
  },
];

// Department options for students
const departments = [
  { value: "BCA", label: "BSc Computer Applications" },
  { value: "BSCIT", label: "BSc Information Technology" },
  { value: "BCOMCA", label: "BCom Computer Applications" },
];

// Define fields for each portal
const formFields = {
  student: [
    { name: "name", label: "Full Name", type: "text", required: true },
    { name: "student_id", label: "Student ID", type: "text", required: true },
    { name: "email", label: "Email Address", type: "email", required: true },
    { name: "department", label: "Department", type: "select", required: true },
    {
      name: "session",
      label: "Academic Session",
      type: "text",
      required: true,
      placeholder: "e.g., 2022-2025",
    },
    {
      name: "semester",
      label: "Semester",
      type: "number",
      required: true,
      placeholder: "e.g., 1,2,3,4,5,6",
    },
    { name: "password", label: "Password", type: "password", required: true },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      required: true,
    },
  ],
  faculty: [
    { name: "name", label: "Full Name", type: "text", required: true },
    { name: "faculty_id", label: "Faculty Id ( ask admin to provide id ) ", type: "text", required: true },

    { name: "email", label: "Email Address", type: "email", required: true },
    { name: "password", label: "Password", type: "password", required: true },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      required: true,
    },
    { name: "phone", label: "Phone Number", type: "tel", required: true },
  ],
  admin: [
    { name: "name", label: "Full Name", type: "text", required: true },
    { name: "email", label: "Email Address", type: "email", required: true },
    { name: "password", label: "Password", type: "password", required: true },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      required: true,
    },
    { name: "phone", label: "Phone Number", type: "tel", required: true },
  ],
};

// Reusable InputField component
const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  required,
  placeholder,
  options,
}) => {
  if (type === "select") {
    return (
      <div className="space-y-1">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-red-600">*</span>}
        </label>
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full py-2 px-3 border rounded-md shadow-sm focus:ring-1 transition-colors duration-200 ${
            error
              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-gray-200 focus:ring-blue-500 focus:border-blue-500"
          }`}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
        className={`w-full py-2 px-3 border rounded-md shadow-sm focus:ring-1 transition-colors duration-200 ${
          error
            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
            : "border-gray-200 focus:ring-blue-500 focus:border-blue-500"
        }`}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default function SignupPage() {
  // Track portal selection, form data, errors, and loading state
  const [selectedPortal, setSelectedPortal] = useState("student");
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  // Reset form when portal changes
  useEffect(() => {
    setFormData({});
    setErrors({});
  }, [selectedPortal]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    const fields = formFields[selectedPortal];

    fields.forEach((field) => {
      const value = formData[field.name] || "";

      if (field.required && !value.trim()) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }
      if (
        field.type === "email" &&
        value &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ) {
        newErrors[field.name] = "Please enter a valid email";
      }
      if (
        field.type === "tel" &&
        value &&
        !/^[+]?[\d\s\-()]{10,}$/.test(value)
      ) {
        newErrors[field.name] = "Please enter a valid phone number";
      }
      if (
        field.type === "password" &&
        field.name === "password" &&
        value.length < 8
      ) {
        newErrors.password = "Password must be at least 8 characters";
      }
      if (field.name === "confirmPassword" && value !== formData.password) {
        newErrors.confirmPassword = "Passwords do not match";
      }
      if (field.name === "session" && value && !/^\d{4}-\d{4}$/.test(value)) {
        newErrors.session = "Session format must be YYYY-YYYY";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  setIsLoading(true);

  try {
    // Prepare base payload
    let payload = {
      ...formData,
      password: formData.confirmPassword, // send confirmed password
      role: selectedPortal,
    };

    // Add device info only for students
   if (selectedPortal === "student") {
      // Collect device/browser info only for students
      const deviceInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        deviceModel: navigator.userAgentData?.platform || "unknown",
        os: navigator.userAgent.includes("Windows")
          ? "Windows"
          : navigator.userAgent.includes("Mac")
          ? "MacOS"
          : navigator.userAgent.includes("Linux")
          ? "Linux"
          : "Unknown",
        browser: (() => {
          const ua = navigator.userAgent;
          if (ua.includes("Chrome")) return "Chrome";
          if (ua.includes("Firefox")) return "Firefox";
          if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
          if (ua.includes("Edg")) return "Edge";
          return "Unknown";
        })(),
      };
      payload.deviceInfo = deviceInfo;
    }

    const res = await axios.post(
      "http://localhost:5001/auth/signup",
      payload,
      { withCredentials: true }
    );

    console.log(res.data);
    alert(`Account for ${selectedPortal} created!\nName: ${formData.name}`);
    navigate("/login");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Something went wrong!");
  } finally {
    setIsLoading(false);
  }
};




  // Current portal fields
  const currentFields = formFields[selectedPortal];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img src={Logo} alt="brandLogo" className="w-8" />
            <h1 className="ml-2 text-2xl font-semibold text-[#0372b7]">
              AttendEase
            </h1>
          </div>
          <p className="text-gray-600">
            Flip the Page from Registers to Dashboards Instantly
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">
            Enroll Now
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Portal Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Select Portal
              </label>
              <div className="space-y-2">
                {portals.map((portal) => (
                  <label
                    key={portal.id}
                    className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors duration-200 ${
                      selectedPortal === portal.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="portal"
                      value={portal.id}
                      checked={selectedPortal === portal.id}
                      onChange={(e) => setSelectedPortal(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{portal.icon}</span>
                      <div>
                        <div className="font-medium text-gray-900">
                          {portal.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {portal.description}
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Dynamic Fields */}
            {currentFields.map((field) => (
              <InputField
                key={field.name}
                label={field.label}
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleInputChange}
                error={errors[field.name]}
                required={field.required}
                placeholder={field.placeholder}
                options={field.name === "department" ? departments : undefined}
              />
            ))}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-400 text-white font-medium rounded-md transition-colors duration-200 flex items-center justify-center cursor-pointer"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            

            {/* Link to Login */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          © 2025 AttendEase. All rights reserved.
        </div>
      </div>
    </div>
  );
}
