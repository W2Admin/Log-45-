import React, { useState, useEffect } from "react";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

const OrgRegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organizationName: "",
    contactEmail: "",
    phoneNumber: "",
    industryType: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [apiData, setApiData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://med-farm.onrender.com/api/organisations/"
  //       );
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       setApiData(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      setSubmitted(true);
      sendConfirmationEmail(formData.contactEmail);
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  };

  const validateForm = (data) => {
    let errors = {};
    if (!data.organizationName) {
      errors.organizationName = "Organization name is required";
    }
    if (!data.contactEmail) {
      errors.contactEmail = "Contact email is required";
    } else if (!isValidEmail(data.contactEmail)) {
      errors.contactEmail = "Invalid email format";
    }
    if (!data.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    }
    if (!data.industryType) {
      errors.industryType = "Industry type is required";
    }
    if (!data.address) {
      errors.address = "Address is required";
    }
    return errors;
  };

  const isValidEmail = (email) => {
    // Basic email format validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const sendConfirmationEmail = (email) => {
    // Simulate sending confirmation email
    console.log(`Confirmation email sent to ${email}`);
  };
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!loading && !apiData) {
  //   return <div>Error fetching data.</div>;
  // }
  return (
    <div className="w-full h-screen absolute inset-0 bg-gray-900 bg-opacity-40 flex-colo flex-colo">
      {!submitted ? (
        <form
          className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md"
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
              <div className="error">{errors.organizationName}</div>
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
              <div className="error">{errors.contactEmail}</div>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              className={`w-full px-3 py-2 border ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:${
                errors.phoneNumber ? "border-red-500" : "border-indigo-500"
              }`}
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && (
              <div className="error">{errors.phoneNumber}</div>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="industryType"
            >
              Industry Type
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              id="industryType"
              name="industryType"
              value={formData.industryType}
              onChange={handleChange}
            >
              <option value="">Select Industry Type</option>
              <option value="Fish Farming">Fish Farming</option>
              <option value="Pig Farming">Pig Farming</option>
              <option value="Crop Framing">Crop Framing</option>
              <option value="Animal Husbandry">Animal Husbandry</option>
              <option value="Laboratory Specialist">
                Laboratory Specialist
              </option>
              <option value="HealthCare">HealthCare</option>
            </select>
            {errors.industryType && (
              <div className="error">{errors.industryType}</div>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <div className="error">{errors.address}</div>}
          </div>
          <button
            className="w-full bg-[#66B5A3] text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-[#216c5a] transition duration-300"
            type="submit"
          >
            Submit
          </button>
        </form>
      ) : (
        <div>
          <div className="flex h-screen w-full items-center justify-center">
            <div className="rounded-xl bg-[#66B5A3] bg-opacity-70 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
              <div className="text-white">
                <div className="mb-8 flex flex-col items-center">
                  <img src={logo} width="150" alt="logo" />
                  <h2 className="text-gray-700 text-lg mt-5 font-bold">
                    Registration Successful!
                  </h2>
                </div>
                <p className="text-center">
                  A confirmation email has been sent to {formData.contactEmail}.
                </p>
                <p>Redirecting to the welcome page...</p>
              </div>
            </div>
          </div>

          {/* <h2>Registration Successful!</h2>
          <p>A confirmation email has been sent to {formData.contactEmail}.</p>
          <p>Redirecting to the welcome page...</p> */}
          {/* Implement redirection logic here */}
        </div>
      )}
    </div>
  );
};

export default OrgRegistrationForm;
