import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerData } from "../Redux/Registration/RegisterAction";
import LottieAnimation from "../Lotties";
import loader from "../images/loading.json"

const RegistrationForm = ({registerData, loading, error}) => {
  const navigate = useNavigate();
  const [registerState, setRegisterState] = useState({});
  const initialFormData = {
    name: "",
    contact_email: "",
    phone: "",
    industry: "",
    address: "",
    description: ""
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submiterror, setsubmiterror] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    // For industry, parse the value to an integer if it's not empty
    if (name === 'industry' && value.trim() !== '') {
      setFormData({ ...formData, [name]: parseInt(value.trim()) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        await registerData(formData, ()=>{

        }, ()=>{
          setsubmiterror(true)
        });
      } catch (error) {
        console.error("Error submitting form:", error.message);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateFormData = (data) => {
    const errors = {};

    // Validation rules
    if (!data.name.trim()) {
      errors.name = "Organization name is required";
    }
    if (!data.contact_email.trim()) {
      errors.contact_email = "Contact email is required";
    } else if (!isValidEmail(data.contact_email)) {
      errors.contact_email = "Invalid email address";
    }
    if (!data.phone.trim()) {
      errors.phone = "Contact phone is required";
    } else if (!isValidPhoneNumber(data.phone)) {
      errors.phone = "Invalid phone number";
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
          
         {submiterror && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Organization Name
            </label>
            <input
              className={`w-full px-3 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:${
                errors.name ? "border-red-500" : "border-indigo-500"
              }`}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="contact_email"
            >
              Contact Email
            </label>
            <input
              className={`w-full px-3 py-2 border ${
                errors.contact_email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:${
                errors.contact_email ? "border-red-500" : "border-indigo-500"
              }`}
              type="email"
              id="contact_email"
              name="contact_email"
              value={formData.contact_email}
              onChange={handleChange}
            />
            {errors.contact_email && (
              <span className="text-red-500 text-sm">
                {errors.contact_email}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Contact Phone
            </label>
            <input
              className={`w-full px-3 py-2 border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:${
                errors.phone ? "border-red-500" : "border-indigo-500"
              }`}
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">
                {errors.phone}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="industry"
            >
              Industry Type
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Primary Address
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <button
            className="flex justify-center w-full bg-[#66B5A3] text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-[#216c5a] transition duration-300"
            type="submit"
            disabled={loading}
          >
            {loading ? (
               <LottieAnimation data={loader}/>
            ) : ("Register")}

          </button>
        </form>
      </div>{" "}
    </div>
  );
};
const mapStoreToProps = (state) => {
  console.log(state)
  return {
      loading: state.register.loading,
      error: state?.register?.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerData: (registerState, history, setErrorHandler)=>{
      dispatch(registerData(registerState, history, setErrorHandler))
    },
  };
};
export default connect(mapStoreToProps, mapDispatchToProps)(RegistrationForm);
