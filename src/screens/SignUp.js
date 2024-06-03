import React, { useState } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { registerData, userData } from "../Redux/Registration/RegisterAction";
import { BiLoaderCircle } from "react-icons/bi";
import LottieAnimation from "../Lotties";
import success from "../images/success.json";

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

  const navigate = useNavigate();

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

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      <ToastContainer />
      <div className="w-1/3 bg-gray-100 flex flex-col items-center justify-center p-8">
        <div className="text-3xl font-bold mb-2">Log45</div>
        <div className="text-xl mb-4">Sign up your business on Log45</div>
        <div className="text-gray-500">Create your account effortlessly.</div>
      </div>
      <div className="w-2/3 bg-white flex flex-col justify-center p-20">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl mb-1 font-bold">
              Organisation Information
            </h2>
            <p className="text-gray-500">
              This information would be used to create your account.
            </p>
          </div>
          {/* <button onClick={handleClose} className="text-red-500">
            Log In
          </button> */}
        </div>

        {formNo === 1 && (
          <div>
            <div className="flex flex-col mb-4">
              <label htmlFor="name">Organisation Name</label>
              <input
                value={formData.name}
                onChange={handleChange}
                className="p-5 block border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 rounded mt-1"
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="contact_email">Organisation Email</label>
              <input
                value={formData.contact_email}
                onChange={handleChange}
                className="p-5 block border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 rounded mt-1"
                type="email"
                name="contact_email"
                id="contact_email"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="phone">Organisation Phone Number</label>
              <input
                value={formData.phone}
                onChange={handleChange}
                className="p-5 block border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 rounded mt-1"
                type="text"
                maxLength={11}
                name="phone"
                id="phone"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="industry">Industry Type</label>
              <select
                value={formData.industry}
                onChange={handleChange}
                className="p-5 block border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 rounded mt-1"
                name="industry"
                id="industry"
              >
                <option value="">Select</option>
                <option value="1">Fish Farming</option>
                <option value="2">Pig Farming</option>
                <option value="3">Crop Farming</option>
                <option value="4">Diary Farming</option>
                <option value="5">Poultry Farming</option>
                <option value="6">Other</option>
              </select>
            </div>{" "}
            <div className="flex flex-col mb-4">
              <label htmlFor="address">Organisation Address</label>
              <textarea
                value={formData.address}
                onChange={handleChange}
                className="border p-2 rounded mt-1"
                name="address"
                id="address"
                rows="3"
              ></textarea>
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="description">Description</label>
              <textarea
                value={formData.description}
                onChange={handleChange}
                className="p-5 block border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 rounded mt-1"
                name="description"
                id="description"
                rows="3"
              ></textarea>
            </div>
            <button
              onClick={handleOrgSubmit}
              className="w-full p-2 text-white mt-2 bg-subMain rounded-md"
            >
              {loading ? (
                <BiLoaderCircle className="animate-spin mx-auto" size={24} />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        )}
        {formNo === 2 && (
          <div>
            <div className="flex flex-col gap-4 w-full mb-6">
              <label htmlFor="name">Full Name</label>
              <input
                value={formDatauser.name}
                onChange={handleChange2}
                className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 rounded-md"
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="flex flex-col gap-4 w-full mb-6">
              <label htmlFor="email">Email Address</label>
              <input
                value={formDatauser.email}
                onChange={handleChange2}
                className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 rounded-md"
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div className="flex flex-col gap-4 w-full mb-6">
              <label htmlFor="password">Password</label>
              <input
                value={formDatauser.password}
                onChange={handleChange2}
                className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 rounded-md"
                type="password"
                name="password"
                id="password"
              />
            </div>
            <div className="flex flex-col gap-4 w-full mb-6">
              <label htmlFor="re_password">Confirm Password</label>
              <input
                value={formDatauser.re_password}
                onChange={handleChange2}
                className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 rounded-md"
                type="password"
                name="re_password"
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
            <div className="flex-col justify-center">
              <LottieAnimation data={success} />
              <p>Please check your mail for a Verification Link</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  loading: state.register.loading,
  error: state.register.error,
  userloading: state.user.loading,
  usererror: state.user.error,
});

const mapDispatchToProps = {
  registerData,
  userData,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
