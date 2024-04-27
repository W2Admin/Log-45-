import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();

  const initialFormData = {
    organizationName: "",
    contactEmail: "",
    contactPhone: "",
    industryType: "",
    primaryLocation: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // const validationErrors = validateFormData(formData);
    // if (Object.keys(validationErrors).length === 0) {
    //   try {
    //     const response = await fetch("backend_api_url", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(formData),
    //     });
    //     if (response.ok) {
    //       // Handle successful submission
    //       console.log("Form submitted successfully");
    //       setFormData(initialFormData); // Reset form data
    //       // Navigate to the home page
    //       navigate("/");
    //     } else {
    //       // Handle backend errors
    //       console.error("Error submitting form:", response.statusText);
    //     }
    //   } catch (error) {
    //     console.error("Error submitting form:", error.message);
    //   }
    // } else {
    //   setErrors(validationErrors);
    // }
  };

  const validateFormData = (data) => {
    const errors = {};

    // Validation rules
    if (!data.organizationName.trim()) {
      errors.organizationName = "Organization name is required";
    }
    if (!data.contactEmail.trim()) {
      errors.contactEmail = "Contact email is required";
    } else if (!isValidEmail(data.contactEmail)) {
      errors.contactEmail = "Invalid email address";
    }
    if (!data.contactPhone.trim()) {
      errors.contactPhone = "Contact phone is required";
    } else if (!isValidPhoneNumber(data.contactPhone)) {
      errors.contactPhone = "Invalid phone number";
    }
    // Add more validation rules as needed

    return errors;
  };

  const isValidEmail = (email) => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phone) => {
    // Phone number validation regex (for demonstration purpose)
    const phoneRegex = /^\+?\d{8,14}$/; // Modify as per your requirements
    return phoneRegex.test(phone);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 z-50">
      {" "}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-40 w-full h-screen flex-colo ">
        <form
          className="w-full max-w-sm mx-auto mb-4 bg-white p-8 rounded-md shadow-md "
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold mb-6 bg-white text-center">
            Registration Form
          </h1>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="organizationName"
            >
              Organization Name
            </label>
            <input
              className={`w-full px-3 py-2 border ${
                errors.organizationName ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:${
                errors.organizationName ? "border-red-500" : "border-indigo-500"
              }`}
              type="text"
              id="organizationName"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleChange}
            />
            {errors.organizationName && (
              <span className="text-red-500 text-sm">
                {errors.organizationName}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="contactEmail"
            >
              Contact Email
            </label>
            <input
              className={`w-full px-3 py-2 border ${
                errors.contactEmail ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:${
                errors.contactEmail ? "border-red-500" : "border-indigo-500"
              }`}
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
            />
            {errors.contactEmail && (
              <span className="text-red-500 text-sm">
                {errors.contactEmail}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="contactPhone"
            >
              Contact Phone
            </label>
            <input
              className={`w-full px-3 py-2 border ${
                errors.contactPhone ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:${
                errors.contactPhone ? "border-red-500" : "border-indigo-500"
              }`}
              type="tel"
              id="contactPhone"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
            />
            {errors.contactPhone && (
              <span className="text-red-500 text-sm">
                {errors.contactPhone}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="industryType"
            >
              Industry Type
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              id="industryType"
              name="industryType"
              value={formData.industryType}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="primaryLocation"
            >
              Primary Location
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              id="primaryLocation"
              name="primaryLocation"
              value={formData.primaryLocation}
              onChange={handleChange}
            />
          </div>
          <button
            className="w-full bg-[#66B5A3] text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-[#216c5a] transition duration-300"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>{" "}
    </div>
  );
};

export default RegistrationForm;
