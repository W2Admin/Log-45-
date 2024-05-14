import React from "react";
import Uploder from "../Uploader";
import { sortsDatas } from "../Datas";
import { Button, DatePickerComp, Input, Select } from "../Form";
import { BiChevronDown } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";

function PersonalInformation({ titles }) {
  const [title, setTitle] = React.useState(sortsDatas.title[0]);
  const [date, setDate] = React.useState(new Date());
  const [gender, setGender] = React.useState(sortsDatas.genderFilter[0]);
  return (
    <div className="flex-colo border-l-2 border-[#66B5A3] gap-4">
      {/* uploader  */}
      <div className="flex gap-3 flex-col col-span-6">
        <p className="text-sm">Upload File</p>
        <Uploder />
      </div>

      <div className="flex items-center justify-center p-12">
        <Personaldetails />
      </div>
    </div>
  );
}

const Personaldetails = () => {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    date: "",
    time: "",
    comingToEvent: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.fName.trim()) {
      formErrors.fName = "First name is required";
    }
    if (!formData.lName.trim()) {
      formErrors.lName = "Last name is required";
    }
    if (!formData.date) {
      formErrors.date = "Date is required";
    }
    if (!formData.time) {
      formErrors.time = "Time is required";
    }
    if (!formData.comingToEvent) {
      formErrors.comingToEvent = "Please select if you are coming to the event";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);

      setFormData({
        fName: "",
        lName: "",
        date: "",
        time: "",
        comingToEvent: "",
      });
      setErrors({});
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-[550px]">
      <div className="-mx-3 flex flex-wrap">
        <div className="w-full px-3 sm:w-1/2">
          <div className="mb-5">
            <label
              htmlFor="fName"
              className="mb-3 block font-medium text-xs text-[#07074D]"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fName"
              id="fName"
              placeholder="First Name"
              value={formData.fName}
              onChange={handleInputChange}
              className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-xsfont-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
                errors.fName ? "border-red-500" : ""
              }`}
            />
            {errors.fName && <p className="text-red-500">{errors.fName}</p>}
          </div>
        </div>
        <div className="w-full px-3 sm:w-1/2">
          <div className="mb-5">
            <label
              htmlFor="lName"
              className="mb-3 block text-xs font-medium text-[#07074D]"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="lName"
              id="lName"
              placeholder="Phone Number"
              value={formData.lName}
              onChange={handleInputChange}
              className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
                errors.lName ? "border-red-500" : ""
              }`}
            />
            {errors.lName && <p className="text-red-500">{errors.lName}</p>}
          </div>
        </div>
      </div>
      <div className="mb-5">
        <label
          htmlFor="date"
          className="mb-3 block text-xs font-medium text-[#07074D]"
        >
          Date
        </label>
        <input
          type="date"
          name="date"
          id="date"
          value={formData.date}
          onChange={handleInputChange}
          className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
            errors.date ? "border-red-500" : ""
          }`}
        />
      </div>
      <div className="mb-5">
        <Input
          label="Email"
          color={true}
          type="email"
          onChange={handleInputChange}
          className={`w-full rounded-md border border-[#e0e0e0] mb-3 block bg-white py-3 px-6 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md ${
            errors.date ? "border-red-500" : ""
          }`}
        />
      </div>

      <div className="mb-5">
        <label className="mb-3 block text-xs font-medium text-[#07074D]">
          Gender
        </label>
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <input
              type="radio"
              name="comingToEvent"
              id="radioButton1"
              value="Male"
              checked={formData.comingToEvent === "Male"}
              onChange={handleInputChange}
              className="h-5 w-5"
            />
            <label
              htmlFor="radioButton1"
              className="pl-3 text-xs font-medium text-[#07074D]"
            >
              Male
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="comingToEvent"
              id="radioButton2"
              value="Female"
              checked={formData.comingToEvent === "Female"}
              onChange={handleInputChange}
              className="h-5 w-5"
            />
            <label
              htmlFor="radioButton2"
              className="pl-3 text-xs font-medium text-[#07074D]"
            >
              Female
            </label>
          </div>
        </div>
        {errors.comingToEvent && (
          <p className="text-red-500">{errors.comingToEvent}</p>
        )}
      </div>
      <div>
        <div className="flex justify-center">
          <button className="hover:shadow-form rounded-md bg-[#66B5A3] py-3 px-8 text-center text-xs font-semibold text-white outline-none">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

const OtherInformation = () => {
  return (
    <div className="max-w-full mx-auto">
      {/* Accordion */}
      <Accordion />
    </div>
  );
};

const PersonalInfo = () => {
  return (
    <>
      <div>
        <PersonalInformation />
      </div>
      <div>
        <OtherInformation />
      </div>
    </>
  );
};
// Accordion component integrating the above components
const Accordion = () => {
  const [activeTab, setActiveTab] = useState(null);

  const handleTabClick = (tabIndex) => {
    setActiveTab(activeTab === tabIndex ? null : tabIndex);
  };

  const handleToggle = (idx) => {
    return activeTab === idx ? { maxHeight: "none" } : { maxHeight: "0" };
  };

  return (
    <div id="accordion-collapse" data-accordion="collapse">
      {/* PersonalInfo Section */}
      <div>
        <ul className="flex flex-col font-semibold p-3 cursor-pointer">
          {[2, 3].map((idx) => (
            <li
              key={idx}
              className="bg-[#FFFFF] my-5 shadow-lg "
              style={{
                overflow: "",
                transitionDuration: "500ms",
                ...handleToggle(idx),
                marginBottom: "20px",
              }}
            >
              <h2
                onClick={() => handleTabClick(idx)}
                className="flex flex-row justify-between items-center font-semibold p-3 cursor-pointer"
              >
                <span>{idx === 2 ? "Animal Details" : "Medicals"}</span>
                <svg
                  className={`fill-current text-[#66B5A3] h-6 w-6 transform transition-transform duration-500 ${
                    activeTab === idx ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
                </svg>
              </h2>
              <div id={`tab-${idx}`} className="border-l-2 border-[#66B5A3]">
                {activeTab === idx && (
                  <>
                    {/* {idx === 1 && <Personaldetails />} */}
                    {idx === 2 && <AnimalInfo />}
                    {idx === 3 && <ExaminationInfo />}
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
const AnimalInfo = () => {
  return (
    <>
      <div className="flex items-center justify-center p-12">
        <div className="max-w-[550px] mx-auto">
          <form>
            <div className="flex flex-wrap">
              <div className="w-full sm:w-1/2 px-3">
                <div className="mb-5">
                  <label
                    htmlFor="animalType"
                    className="mb-3 block text-xs font-medium text-[#07074D]"
                  >
                    Animal Type
                  </label>
                  <input
                    type="text"
                    name="animalType"
                    id="animalType"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-xs font-medium text-[#6B7280] outline-none focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full sm:w-1/2 px-3">
                <div className="mb-5">
                  <label
                    htmlFor="species"
                    className="mb-3 block text-xs font-medium text-[#07074D]"
                  >
                    Species
                  </label>
                  <input
                    type="text"
                    name="species"
                    id="species"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-xs font-medium text-[#6B7280] outline-none focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full sm:w-1/2 px-3">
                <div className="mb-5">
                  <label
                    htmlFor="sex"
                    className="mb-3 block text-xs font-medium text-[#07074D]"
                  >
                    Sex
                  </label>
                  <input
                    type="text"
                    name="sex"
                    id="sex"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-xs font-medium text-[#6B7280] outline-none focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full sm:w-1/2 px-3">
                <div className="mb-5">
                  <label
                    htmlFor="weight"
                    className="mb-3 block text-xs font-medium text-[#07074D]"
                  >
                    Weight
                  </label>
                  <input
                    type="text"
                    name="weight"
                    id="weight"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-xs font-medium text-[#6B7280] outline-none focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full px-3">
                <div className="mb-5">
                  <label
                    htmlFor="feed"
                    className="mb-3 block text-xs font-medium text-[#07074D]"
                  >
                    Type of feed/Food
                  </label>
                  <input
                    type="text"
                    name="feed"
                    id="feed"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full mb-5 flex-col gap-3">
              <p className="text-black text-sm">Sample details</p>{" "}
              <select className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none ">
                <option value=""></option>
                <option value="Fish Farming">Normal</option>
                <option value="Pig Farming">Urgent</option>
                <option value="Crop Framing">Fasting</option>
                <option value="Animal Husbandry">Blood</option>
                <option value="Laboratory Specialist">Swab</option>
                <option value="HealthCare">Tissue</option>
              </select>
            </div>
            <div className="flex w-full flex-col gap-3">
              <div>
                <button className="hover:shadow-form rounded-md bg-[#66B5A3] py-3 px-8 text-center text-xs font-semibold text-white outline-none">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const ExaminationInfo = () => {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        <form>
          <div className="flex flex-wrap">
            <div className="w-full sm:w-1/2 px-3">
              <div className="w-full mb-5">
                <p className="text-black text-sm">Reason for Examination</p>{" "}
                <select className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none ">
                  <option value=""></option>
                  <option value="Fish Farming">Normal</option>
                  <option value="Pig Farming">Urgent</option>
                  <option value="Crop Framing">Fasting</option>
                  <option value="Animal Husbandry">Blood</option>
                  <option value="Laboratory Specialist">Swab</option>
                  <option value="HealthCare">Tissue</option>
                </select>
              </div>
            </div>
            <div className="w-full sm:w-1/2 px-3">
              <p className="text-black text-sm">Examination Request</p>{" "}
              <select className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none ">
                <option value=""></option>
                <option value="Fish Farming">Normal</option>
                <option value="Pig Farming">Urgent</option>
                <option value="Crop Framing">Fasting</option>
                <option value="Animal Husbandry">Blood</option>
                <option value="Laboratory Specialist">Swab</option>
                <option value="HealthCare">Tissue</option>
              </select>
            </div>

            <div className="w-full px-3">
              <div className="mb-5">
                <label
                  htmlFor="feed"
                  className="mb-3 block text-xs font-medium text-[#07074D]"
                >
                  Previous Medical History/Treatment
                </label>
                <input
                  type="text"
                  name="feed"
                  id="feed"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-xs font-medium text-[#6B7280] outline-none focus:shadow-md"
                />
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3">
            <div>
              <button className="hover:shadow-form rounded-md bg-[#66B5A3] py-3 px-8 text-center text-xs font-semibold text-white outline-none">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfo;
