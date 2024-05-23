import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const formArray = [1, 2, 3];
  const [formNo, setFormNo] = useState(formArray[0]);
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

export default SignUp;
