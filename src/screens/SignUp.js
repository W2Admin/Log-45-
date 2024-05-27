import React, { useState } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerData, userData } from "../Redux/Registration/RegisterAction";
import { BiLoaderCircle } from "react-icons/bi";

function SignUp({
  registerData,
  userData,
  loading,
  error,
  userloading,
  usererror,
}) {
  const formArray = [1, 2, 3];
  const [formNo, setFormNo] = useState(formArray[0]);
  const initialFormData = {
    name: "",
    contact_email: "",
    phone: "",
    industry: "",
    address: "",
    description: "",
  };
  const initialFormDatauser = {
    name: "",
    email: "",
    password: "",
    re_password: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [formDatauser, setFormDataUser] = useState(initialFormDatauser);
  const [errors, setErrors] = useState({});
  const [submiterror, setsubmiterror] = useState(false);
  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    emailaddress: "",
    phonenumber: "",
    gender: "",
    address: "",
    organisationname: "",
    organisationemail: "",
    organisationaddress: "",
    industrytype: "",
    adminname: "",
    adminemail: "",
    password: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // For industry, parse the value to an integer if it's not empty
    if (name === "industry" && value.trim() !== "") {
      setFormData({ ...formData, [name]: parseInt(value.trim()) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormDataUser({ ...formDatauser, [name]: value });
  };
  const next = () => {
    if (
      formNo === 1 &&
      state.firstname &&
      state.lastname &&
      state.dob &&
      state.emailaddress &&
      state.phonenumber &&
      state.gender &&
      state.address
    ) {
      setFormNo(formNo + 1);
    } else if (
      formNo === 2 &&
      state.organisationname &&
      state.organisationemail &&
      state.organisationaddress &&
      state.industrytype
    ) {
      setFormNo(formNo + 1);
    } else {
      toast.error("Please fill up all input fields");
    }
  };

  const pre = () => {
    setFormNo(formNo - 1);
  };

  const finalSubmit = () => {
    if (state.adminname && state.adminemail && state.password) {
      toast.success("Form submitted successfully");
    } else {
      toast.error("Please fill up all input fields");
    }
  };

  const handleOrgSubmit = async (e) => {
    e.preventDefault();
    if (
      formNo === 1 &&
      formData.name &&
      formData.contact_email &&
      formData.phone &&
      formData.industry &&
      formData.address &&
      formData.description
    ) {
      try {
        await registerData(
          formData,
          () => {
            toast.success(
              "Organistion Created Succcessfully please procees to creating first user"
            );
            setFormNo(formNo + 1);
            setFormData({});
          },
          () => {
            setsubmiterror(true);
            toast.error({ error });
          }
        );
      } catch (error) {
        console.error("Error submitting form:", error.message);
      }
    } else {
      toast.error("Please fill up all input fields");
    }
  };
  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    if (
      formNo === 2 &&
      formDatauser.name &&
      formDatauser.email &&
      formDatauser.password &&
      formDatauser.re_password
    ) {
      try {
        await userData(
          formDatauser,
          () => {
            toast.success(
              "Admin User Created Successully, Please check you mail for a Verification mail"
            );
            setFormNo(formNo + 1);
            setFormData({});
          },
          () => {
            setsubmiterror(true);
            toast.error({ usererror });
          }
        );
      } catch (error) {
        console.error("Error submitting form:", error.message);
      }
    } else {
      toast.error("Please fill up all input fields");
    }
  };
  return (
    <div className="w-screen h-screen bg-slate-300 items-center fixed inset-0 flex justify-center bg-opacity-75 z-50">
      <ToastContainer />
      <div className="card w-[370px] rounded-md shadow-md bg-white p-5">
        <div className="flex justify-center items-center">
          {formArray.map((v, i) => (
            <React.Fragment key={i}>
              <div
                className={`w-[35px] my-3 text-white rounded-full ${
                  formNo - 1 === i ||
                  formNo - 1 === i + 1 ||
                  formNo === formArray.length
                    ? "bg-[#66B5A3]"
                    : "bg-slate-400"
                } h-[35px] flex justify-center items-center`}
              >
                {v}
              </div>
              {i !== formArray.length - 1 && (
                <div
                  className={`w-[85px] h-[2px] ${
                    formNo === i + 2 || formNo === formArray.length
                      ? "bg-[#66B5A3]"
                      : "bg-slate-400"
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
        {formNo === 1 && (
          <div>
            <div className="flex flex-col mb-2">
              <label htmlFor="name">Organisation Name</label>
              <input
                value={formData.name}
                onChange={handleChange}
                className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md"
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="contact_email">Organisation Email</label>
              <input
                value={formData.contact_email}
                onChange={handleChange}
                className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md"
                type="email"
                name="contact_email"
                id="contact_email"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="phone">Organisation Phone Number</label>
              <input
                value={formData.phone}
                onChange={handleChange}
                className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md"
                type="text"
                maxLength={11}
                name="phone"
                id="phone"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="address">Organisation Address</label>
              <textarea
                value={formData.address}
                onChange={handleChange}
                className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md"
                name="address"
                id="address"
                rows="3"
              ></textarea>
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="industry">Industry Type</label>
              <select
                value={formData.industry}
                onChange={handleChange}
                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                name="industry"
                id="industry"
              >
                <option value="">Select</option>
                <option value="1">Fish Farming</option>
                <option value="2">Pig Farming</option>
                <option value="3">Crop Farming</option>
                <option value="4">Animal Husbandry</option>
                <option value="5">Laboratory Specialist</option>
                <option value="6">HealthCare</option>
              </select>
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="description">Organisation Description</label>
              <textarea
                value={formData.description}
                onChange={handleChange}
                className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md"
                name="description"
                id="description"
                rows="3"
              ></textarea>
            </div>
            <div className="mt-4 gap-3 flex justify-center items-center">
              <button
                onClick={handleOrgSubmit}
                disabled={loading}
                className="flex justify-center px-3 py-2 text-lg rounded-md w-full text-white bg-[#66B5A3]"
              >
                {loading ? (
                  <BiLoaderCircle className="animate-spin text-white text-2xl" />
                ) : (
                  "Next"
                )}
              </button>
            </div>
          </div>
        )}
        {formNo === 2 && (
          <div>
            <div className="flex flex-col mb-2">
              <label htmlFor="name">Organisation Administration Name</label>
              <input
                value={formDatauser.name}
                onChange={handleChange2}
                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-[#66B5A3] rounded-md"
                type="text"
                name="name"
                placeholder="Admin Name"
                id="name"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="email">Admin Email</label>
              <input
                value={formDatauser.email}
                onChange={handleChange2}
                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-[#66B5A3] rounded-md"
                type="email"
                name="email"
                placeholder="Admin Email"
                id="email"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="password">Create Password</label>
              <input
                value={formDatauser.password}
                onChange={handleChange2}
                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-[#66B5A3] rounded-md"
                type="password"
                name="password"
                placeholder="Password"
                id="password"
              />
            </div>

            <div className="flex flex-col mb-2">
              <label htmlFor="re_password">Confirm Password</label>
              <input
                value={formDatauser.re_password}
                onChange={handleChange2}
                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-[#66B5A3] rounded-md"
                type="password"
                name="re_password"
                placeholder="Password"
                id="re_password"
              />
            </div>
            <div className="mt-4 gap-3 flex justify-center items-center">
              <button
                onClick={pre}
                className="px-3 py-2 text-lg rounded-md w-full text-white bg-[#66B5A3]"
              >
                Previous
              </button>
              <button
                onClick={handleAdminSubmit}
                disabled={userloading}
                className="flex justify-center px-3 py-2 text-lg rounded-md w-full text-white bg-[#66B5A3]"
              >
                {userloading ? (
                  <BiLoaderCircle className="animate-spin text-white text-2xl" />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        )}
        {formNo === 3 && (
          <div>
            <div className="flex flex-col mb-2">
              <label htmlFor="firstname">First Name</label>
              <input
                value={state.firstname}
                onChange={inputHandle}
                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                type="text"
                name="firstname"
                id="firstname"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="lastname">Last Name</label>
              <input
                value={state.lastname}
                onChange={inputHandle}
                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                type="text"
                name="lastname"
                id="lastname"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="dob">Date of Birth</label>
              <input
                value={state.dob}
                onChange={inputHandle}
                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                type="text"
                name="dob"
                id="dob"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="emailaddress">Email Address</label>
              <input
                value={state.emailaddress}
                onChange={inputHandle}
                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                type="text"
                name="emailaddress"
                id="emailaddress"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="phonenumber">Phone Number</label>
              <input
                value={state.phonenumber}
                onChange={inputHandle}
                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                type="text"
                name="phonenumber"
                id="phonenumber"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="gender">Gender</label>
              <select
                value={state.gender}
                onChange={inputHandle}
                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                name="gender"
                id="gender"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="address">Address</label>
              <input
                value={state.address}
                onChange={inputHandle}
                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                type="text"
                name="address"
                id="address"
              />
            </div>
            <div className="mt-4 flex justify-center items-center">
              <button
                onClick={next}
                className="px-3 py-2 text-lg rounded-md w-full text-white bg-[#66B5A3]"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {formNo === 2 && (
          <div>
            <div className="flex flex-col mb-2">
              <label htmlFor="organisationname">Organisation Name</label>
              <input
                value={state.organisationname}
                onChange={inputHandle}
                className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md"
                type="text"
                name="organisationname"
                id="organisationname"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="organisationemail">Organisation Email</label>
              <input
                value={state.organisationemail}
                onChange={inputHandle}
                className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md"
                type="text"
                name="organisationemail"
                id="organisationemail"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="organisationaddress">Organisation Address</label>
              <textarea
                value={state.organisationaddress}
                onChange={inputHandle}
                className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md"
                name="organisationaddress"
                id="organisationaddress"
                rows="3"
              ></textarea>
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="industrytype">Industry Type</label>
              <select
                value={state.industrytype}
                onChange={inputHandle}
                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                name="industrytype"
                id="industrytype"
              >
                <option value="">Select</option>
                <option value="male">Fish Farming</option>
                <option value="female">Pig Farming</option>
                <option value="other">Crop Farming</option>
                <option value="other">Animal Husbandry</option>
                <option value="other">Laboratory Specialist</option>
                <option value="other">HealthCare</option>
              </select>
            </div>
            <div className="mt-4 gap-3 flex justify-center items-center">
              <button
                onClick={pre}
                className="px-3 py-2 text-lg rounded-md w-full text-white bg-[#66B5A3]"
              >
                Previous
              </button>
              <button
                onClick={next}
                className="px-3 py-2 text-lg rounded-md w-full text-white bg-[#66B5A3]"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {formNo === 3 && (
          <div>
            <div className="flex flex-col mb-2">
              <label htmlFor="adminname">
                Organisation Administration Name
              </label>
              <input
                value={state.adminname}
                onChange={inputHandle}
                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-[#66B5A3] rounded-md"
                type="text"
                name="adminname"
                placeholder="Admin Name"
                id="adminname"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="adminemail">Admin Email</label>
              <input
                value={state.adminemail}
                onChange={inputHandle}
                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-[#66B5A3] rounded-md"
                type="text"
                name="adminemail"
                placeholder="Admin Email"
                id="adminemail"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="password">Create Password</label>
              <input
                value={state.password}
                onChange={inputHandle}
                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-[#66B5A3] rounded-md"
                type="password"
                name="password"
                placeholder="Password"
                id="password"
              />
            </div>
            <div className="mt-4 gap-3 flex justify-center items-center">
              <button
                onClick={pre}
                className="px-3 py-2 text-lg rounded-md w-full text-white bg-[#66B5A3]"
              >
                Previous
              </button>
              <button
                onClick={finalSubmit}
                className="px-3 py-2 text-lg rounded-md w-full text-white bg-[#66B5A3]"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStoreToProps = (state) => {
  console.log(state);
  return {
    loading: state.register.loading,
    error: state?.register?.error,
    userloading: state.user.loading,
    usererror: state?.user?.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerData: (registerState, history, setErrorHandler) => {
      dispatch(registerData(registerState, history, setErrorHandler));
    },
    userData: (registerState, history, setErrorHandler) => {
      dispatch(userData(registerState, history, setErrorHandler));
    },
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(SignUp);
