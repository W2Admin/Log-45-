import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { contactData, sortsDatas } from "../Datas";
import { connect } from "react-redux";
import { postpatient } from "../../Redux/Patients/PatientAction";
import { BiLoaderCircle } from "react-icons/bi";
import { Checkbox } from "../Form";
function PersonalInformation({error, data, loading, postpatient}) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    business_name:"",
    business_area:"",
    nature_of_business:"",
  });
  const [contacts, setContacts] = useState(
    contactData.map((item) => {
      return {
        name: item.name,
        checked: false,
      };
    })
  );
  const [errors, setErrors] = useState({});
  const [showerror, setShowError] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      organisation: data
    });
  };
  const onChangeContact = (e) => {
    const { name, checked } = e.target;
    const newTreatmeants = contacts.map((item) => {
      if (item.name === name) {
        return {
          ...item,
          checked: checked,
        };
      }
      return item;
    });
    setContacts(newTreatmeants);
    console.log(contacts)
  };
  const validateForm = () => {
    let formErrors = {};
    if (!formData.first_name.trim()) {
      formErrors.first_name = "First name is required";
    }
    if (!formData.last_name.trim()) {
      formErrors.last_name = "Last name is required";
    }
    if (!formData.date_of_birth) {
      formErrors.date_of_birth = "Date of birth is required";
    }
    if (!formData.email.trim()) {
      formErrors.email = "Email address is required";
    }
    if (!formData.phone.trim()) {
      formErrors.phone = "Phone number is required";
    }
    if (!formData.gender) {
      formErrors.gender = "Gender is required";
    }
    if (!formData.address.trim()) {
      formErrors.address = "Address is required";
    }
    if (!formData.business_name.trim()) {
      formErrors.business_name = "Business Name is required";
    }
    if (!formData.business_area.trim()) {
      formErrors.business_area = "Business Area is required";
    }
    if (!formData.nature_of_business.trim()) {
      formErrors.nature_of_business = "Nature Of Business is required";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        await postpatient(
          formData,
          () => {
            setFormData({
              first_name: "",
              last_name: "",
              dateOfBirth: "",
              email: "",
              phone: "",
              gender: "",
              address: "",
            });
            toast.success("Customer Added Successfully");
          },
          () => {
            setShowError(true);
          }
        );
      } else {
        console.log("Form validation failed");
      }
    } catch (error) {}
  };
  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full">
      {showerror && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      <ToastContainer />
      <div className="-mx-3 flex flex-wrap">
        <div className="w-full px-3 sm:w-1/2">
          <div className="mb-5">
            <label
              htmlFor="first_name"
              className="mb-3 block font-medium text-sm text-[#07074D]"
            >
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              className={`w-full rounded-md border ${
                errors.first_name ? "border-red-500" : "border-[#e0e0e0]"
              } bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:border-[#66B5A3] focus:shadow-md`}
            />
            {errors.first_name && <p className="text-red-500">{errors.first_name}</p>}
          </div>
        </div>
        <div className="w-full px-3 sm:w-1/2">
          <div className="mb-5">
            <label
              htmlFor="last_name"
              className="mb-3 block text-sm font-medium text-[#07074D]"
            >
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              className={`w-full rounded-md border ${
                errors.last_name ? "border-red-500" : "border-[#e0e0e0]"
              } bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:border-[#66B5A3] focus:shadow-md`}

            />
            {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}
          </div>
        </div>
      </div>
      <div className="-mx-3 flex flex-wrap">
        <div className="w-full px-3 sm:w-1/2">
          <div className="mb-5">
            <label
              htmlFor="date_of_birth"
              className="mb-3 block text-sm text-[#07074D]"
            >
              Date of Birth
            </label>
            <input
              type="date"
              name="date_of_birth"
              id="date_of_birth     "
              value={formData.date_of_birth}
              onChange={handleInputChange}
              className={`w-full rounded-md border ${
                errors.date_of_birth ? "border-red-500" : "border-[#e0e0e0]"
              } bg-white py-3 px-6 text-sm text-[#6B7280] outline-none focus:border-[#66B5A3] focus:shadow-md`}
            />
            {errors.date_of_birth && (
              <p className="text-red-500">{errors.date_of_birth}</p>
            )}
          </div>
        </div>
        <div className="w-full px-3 sm:w-1/2">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-3 block text-sm text-[#07074D]"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full rounded-md border ${
                errors.email ? "border-red-500" : "border-[#e0e0e0]"
              } bg-white py-3 px-6 text-sm text-[#6B7280] outline-none focus:border-[#66B5A3] focus:shadow-md`}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
        </div>
      </div>
      <div className="-mx-3 flex flex-wrap">
        <div className="w-full px-3 sm:w-1/2">
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="mb-3 block text-sm font-medium text-[#07074D]"
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full rounded-md border ${
                errors.phoneNumber ? "border-red-500" : "border-[#e0e0e0]"
              } bg-white py-3 px-6 text-sm text-[#6B7280] outline-none focus:border-[#66B5A3] focus:shadow-md`}
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone}</p>
            )}
          </div>
        </div>
        <div className="w-full px-3 sm:w-1/2">
          <div className="mb-5">
            <label
              htmlFor="gender"
              className="mb-3 block text-sm text-[#07074D]"
            >
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className={`w-full rounded-md border ${
                errors.gender ? "border-red-500" : "border-[#e0e0e0]"
              } bg-white py-3 px-6 text-sm text-[#6B7280] outline-none focus:border-[#66B5A3] focus:shadow-md`}
            >
              <option value="">Select gender</option>
              {sortsDatas.genderFilter.map((genderOption) => (
                <option key={genderOption.id} value={genderOption.name}>
                  {genderOption.name}
                </option>
              ))}
            </select>
            {errors.gender && <p className="text-red-500">{errors.gender}</p>}
          </div>
        </div>
      </div>
      <div className="-mx-3 flex flex-wrap">
        <div className="w-full px-3 sm:w-1/2">
          <div className="mb-5">
            <label
              htmlFor="business_name"
              className="mb-3 block font-medium text-sm text-[#07074D]"
            >
              Business Name
            </label>
            <input
              type="text"
              name="business_name"
              id="business_name"
              value={formData.business_name}
              onChange={handleInputChange}
              className={`w-full rounded-md border ${
                errors.first_name ? "border-red-500" : "border-[#e0e0e0]"
              } bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:border-[#66B5A3] focus:shadow-md`}
            />
            {errors.business_name && <p className="text-red-500">{errors.business_name}</p>}
          </div>
        </div>
        <div className="w-full px-3 sm:w-1/2">
          <div className="mb-5">
            <label
              htmlFor="business_area"
              className="mb-3 block text-sm font-medium text-[#07074D]"
            >
              Business Area
            </label>
            <input
              type="text"
              name="business_area"
              id="business_area"
              value={formData.business_area}
              onChange={handleInputChange}
              className={`w-full rounded-md border ${
                errors.last_name ? "border-red-500" : "border-[#e0e0e0]"
              } bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:border-[#66B5A3] focus:shadow-md`}

            />
            {errors.business_area && <p className="text-red-500">{errors.business_area}</p>}
          </div>
        </div>
      </div>
      <div className="mb-5">
        <label htmlFor="nature_of_business" className="mb-3 block text-sm text-[#07074D]">
        Nature of Business 
        </label>
        <input
          type="text"
          name="nature_of_businessddress"
          id="nature_of_business"
          value={formData.nature_of_business}
          onChange={handleInputChange}
          className={`w-full rounded-md border ${
            errors.nature_of_business ? "border-red-500" : "border-[#e0e0e0]"
          } bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:border-[#66B5A3] focus:shadow-md`}
        />
        {errors.nature_of_business && <p className="text-red-500">{errors.nature_of_business}</p>}
      </div>
      <div className="mb-5">
        <label htmlFor="address" className="mb-3 block text-sm text-[#07074D]">
          Address
        </label>
        <input
          type="text"
          name="address"
          id="address"
          value={formData.address}
          onChange={handleInputChange}
          className={`w-full rounded-md border ${
            errors.address ? "border-red-500" : "border-[#e0e0e0]"
          } bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:border-[#66B5A3] focus:shadow-md`}
        />
        {errors.address && <p className="text-red-500">{errors.address}</p>}
      </div>
      <div className="flex w-full flex-col gap-4">
        <p className="text-black text-sm">Contact Method</p>
        <div className="grid xs:grid-cols-2 md:grid-cols-3 gap-6 pb-6">
          {/* {contactData?.slice(1, 100).map((item) => (
            <Checkbox
              label={item.name}
              checked={
                contacts.find((i) => i.name === item.name).checked
              }
              onChange={onChangeContact}
              name={item.name}
              key={item.id}
            />
          ))} */}
            <div className="text-sm w-full flex flex-row items-center">
              {/* design checkbox */}
              <label htmlFor="online" className="flex-colo cursor-pointer relative">
                <input
                  type="checkbox"
                  name="online"
                  // checked={checked}
                  onChange={handleInputChange}
                  className=""
                />
                {/* <span
                  className={` border rounded  w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
                    checked ? 'border-subMain bg-subMain' : 'border-gray-300 bg-white'
                  }`}
                >
                  <FaCheck
                    className={`text-[10px] ${checked ? 'block text-white' : 'hidden'}`}
                  />
                </span> */}
              </label>
              <p className={'text-black text-xs ml-2'}>Online</p>
            </div>
            <div className="text-sm w-full flex flex-row items-center">
              {/* design checkbox */}
              <label htmlFor="online" className="flex-colo cursor-pointer relative">
                <input
                  type="checkbox"
                  name="online"
                  // checked={checked}
                  onChange={handleInputChange}
                  className=""
                />
                {/* <span
                  className={` border rounded  w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
                    checked ? 'border-subMain bg-subMain' : 'border-gray-300 bg-white'
                  }`}
                >
                  <FaCheck
                    className={`text-[10px] ${checked ? 'block text-white' : 'hidden'}`}
                  />
                </span> */}
              </label>
              <p className={'text-black text-xs ml-2'}>Phone Call</p>
            </div>
            <div className="text-sm w-full flex flex-row items-center">
              {/* design checkbox */}
              <label htmlFor="online" className="flex-colo cursor-pointer relative">
                <input
                  type="checkbox"
                  name="online"
                  // checked={checked}
                  onChange={handleInputChange}
                  className=""
                />
           
              </label>
              <p className={'text-black text-xs ml-2'}>Onsite</p>
            </div>
        </div>
      </div>
      <div>
        <div className="flex justify-center">
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="hover:shadow-form rounded-md bg-[#66B5A3] py-3 px-8 text-center text-sm font-semibold text-white outline-none"
          >
            {loading ? (
              <BiLoaderCircle className="animate-spin text-white text-2xl" />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    errors: state?.createpatient?.error,
    loading: state?.createpatient?.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postpatient: (loginState, history, setErrorHandler) => {
      dispatch(postpatient(loginState, history, setErrorHandler));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInformation);

// const OtherInformation = () => {
//   return (
//     <div className="max-w-full mx-auto">
//       {/* Accordion */}
//       <Accordion />
//     </div>
//   );
// };

// const PersonalInfo = () => {
//   return (
//     <>
//       <div>
//         <PersonalInformation />
//       </div>
//       <div>
//         <OtherInformation />
//       </div>
//     </>
//   );
// };
// Accordion component integrating the above components
// const Accordion = () => {
//   const [activeTab, setActiveTab] = useState(null);

//   const handleTabClick = (tabIndex) => {
//     setActiveTab(activeTab === tabIndex ? null : tabIndex);
//   };

//   const handleToggle = (idx) => {
//     return activeTab === idx ? { maxHeight: "none" } : { maxHeight: "0" };
//   };

//   return (
//     <div id="accordion-collapse" data-accordion="collapse">
//       {/* PersonalInfo Section */}
//       <div>
//         <ul className="flex flex-col font-semibold p-3 cursor-pointer">
//           {[2, 3].map((idx) => (
//             <li
//               key={idx}
//               className="bg-[#FFFFF] my-5 shadow-lg "
//               style={{
//                 overflow: "",
//                 transitionDuration: "500ms",
//                 ...handleToggle(idx),
//                 marginBottom: "20px",
//               }}
//             >
//               <h2
//                 onClick={() => handleTabClick(idx)}
//                 className="flex flex-row justify-between items-center font-semibold p-3 cursor-pointer"
//               >
//                 <span>{idx === 2 ? "Animal Details" : "Medicals"}</span>
//                 <svg
//                   className={`fill-current text-[#66B5A3] h-6 w-6 transform transition-transform duration-500 ${
//                     activeTab === idx ? "rotate-180" : ""
//                   }`}
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
//                 </svg>
//               </h2>
//               <div id={`tab-${idx}`} className="border-l-2 border-[#66B5A3]">
//                 {activeTab === idx && (
//                   <>
//                     {/* {idx === 1 && <Personaldetails />} */}
//                     {idx === 2 && <AnimalInfo />}
//                     {idx === 3 && <ExaminationInfo />}
//                   </>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// // };
// const AnimalInfo = () => {
//   return (
//     <>
//       <div className="flex items-center justify-center p-12">
//         <div className="max-w-[550px] mx-auto">
//           <form>
//             <div className="flex flex-wrap">
//               <div className="w-full sm:w-1/2 px-3">
//                 <div className="mb-5">
//                   <label
//                     htmlFor="animalType"
//                     className="mb-3 block text-sm font-medium text-[#07074D]"
//                   >
//                     Animal Type
//                   </label>
//                   <input
//                     type="text"
//                     name="animalType"
//                     id="animalType"
//                     className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:shadow-md"
//                   />
//                 </div>
//               </div>
//               <div className="w-full sm:w-1/2 px-3">
//                 <div className="mb-5">
//                   <label
//                     htmlFor="species"
//                     className="mb-3 block text-sm font-medium text-[#07074D]"
//                   >
//                     Species
//                   </label>
//                   <input
//                     type="text"
//                     name="species"
//                     id="species"
//                     className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:shadow-md"
//                   />
//                 </div>
// </div>
// <div className="w-full sm:w-1/2 px-3">
//   <div className="mb-5">
//     <p className="mb-3 block text-sm font-medium text-[#07074D]">
//       Sex
//     </p>{" "}
//     <select className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none ">
//       <option value=""></option>
{
  /* <option value="Fish Farming"> Male</option>
                    <option value="Pig Farming">Female</option>
                  </select>
                </div>
              </div>
              <div className="w-full sm:w-1/2 px-3">
                <div className="mb-5">
                  <label
                    htmlFor="weight"
                    className="mb-3 block text-sm font-medium text-[#07074D]"
                  >
                    Weight
                  </label>
                  <input
                    type="text"
                    name="weight"
                    id="weight"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full px-3">
                <div className="mb-5">
                  <label
                    htmlFor="feed"
                    className="mb-3 block text-sm font-medium text-[#07074D]"
                  >
                    Type of feed/Food
                  </label>
                  <input
                    type="text"
                    name="feed"
                    id="feed"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div> */
}

//             <div className="flex w-full flex-col gap-3">
//               <div>
//                 <button className="hover:shadow-form rounded-md bg-[#66B5A3] py-3 px-8 text-center text-sm font-semibold text-white outline-none">
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// const ExaminationInfo = () => {
//   return (
//     <div className="flex items-center justify-center p-12">
//       <div className="mx-auto w-full max-w-[550px]">
{
  /* <form>
          <div className="flex flex-wrap">
            <div className="w-full sm:w-1/2 px-3">
              <div className="w-full mb-5">
                <p className="text-black text-sm">Reason for Investiagtion</p>{" "}
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
              <p className="text-black text-sm">Investigation Request</p>{" "}
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
                  className="mb-3 block text-sm font-medium text-[#07074D]"
                >
                  Previous Investigation History/Treatment
                </label>
                <input
                  type="text"
                  name="feed"
                  id="feed"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:shadow-md"
                />
              </div>
            </div>
          </div> */
}

// <div className="flex w-full mb-5 flex-col gap-3">
//   <p className="text-black text-sm">Sample details</p>{" "}
//   <select className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none ">
//     <option value=""></option>
//     <option value="Fish Farming">Normal</option>
//     <option value="Pig Farming">Urgent</option>
//     <option value="Crop Framing">Fasting</option>
//     <option value="Animal Husbandry">Blood</option>
//     <option value="Laboratory Specialist">Swab</option>
//     <option value="HealthCare">Tissue</option>
//   </select>
// </div>

// <div className="flex w-full flex-col gap-3">
//   <div>
//     <button className="hover:shadow-form rounded-md bg-[#66B5A3] py-3 px-8 text-center text-sm font-semibold text-white outline-none">
//       Submit
//     </button>
//   </div>
// </div>
// </form>
// </div>
// </div>
// );
// };
