import React, { useState } from "react";

const OrgRegistrationForm = () => {
  const [formData, setFormData] = useState({
    organizationName: "",
    contactEmail: "",
    phoneNumber: "",
    industryType: "",
    address: "",
    emailError: "",
    requiredError: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      emailError:
        name === "contactEmail" && !validateEmail(value)
          ? "Invalid email format"
          : "",
      requiredError: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check for required fields
    const requiredFields = [
      "organizationName",
      "contactEmail",
      "phoneNumber",
      "industryType",
      "address",
    ];
    const hasEmptyField = requiredFields.some((field) => !formData[field]);
    if (hasEmptyField) {
      setFormData({
        ...formData,
        requiredError: "All fields are required",
      });
    } else if (formData.emailError) {
      // Email format error
      // Handle email format error
    } else {
      // Form submission logic
      sendConfirmationEmail();
      redirectToWelcomePage();
      clearFormData();
    }
  };

  const validateEmail = (email) => {
    // Basic email format validation
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const sendConfirmationEmail = () => {
    // Send confirmation email logic
  };

  const redirectToWelcomePage = () => {
    // Redirect logic to welcome page
  };

  const clearFormData = () => {
    setFormData({
      organizationName: "",
      contactEmail: "",
      phoneNumber: "",
      industryType: "",
      address: "",
      emailError: "",
      requiredError: "",
    });
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Organization Registration
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Register your organization to access our services.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="organizationName"
              className="block text-sm font-semibold leading-6 text-black"
            >
              Organization Name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="organizationName"
                id="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                autoComplete="organization"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="contactEmail"
              className="block text-sm font-semibold leading-6 text-black"
            >
              Contact Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="contactEmail"
                id="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
              />
              {formData.emailError && (
                <p className="text-red-600 mt-1">{formData.emailError}</p>
              )}
            </div>
          </div>
          <div>
            <div>
              <label
                htmlFor="contactEmail"
                className="block text-sm font-semibold leading-6 text-black"
              >
                Phone Number
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="phoneNumber"
                  id="c phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  autoComplete="phoneNumber"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                />
                {formData.emailError && (
                  <p className="text-red-600 mt-1">{formData.emailError}</p>
                )}
              </div>

              {/* Add more input fields */}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="block w-full rounded-md bg-cyan-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-8"
        >
          Register
        </button>
        {formData.requiredError && (
          <p className="text-red-600 mt-2">{formData.requiredError}</p>
        )}
      </form>
    </div>
  );
};

export default OrgRegistrationForm;
