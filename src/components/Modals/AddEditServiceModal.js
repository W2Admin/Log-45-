import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { Button, Input, Switchi, Textarea } from "../Form";
import { HiOutlineCheckCircle } from "react-icons/hi";
// import { toast } from "react-hot-toast";
import { postservice } from "../../Redux/Service/ServiceAction";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function AddEditServiceModal({profile, closeModal, isOpen, datas, postservice, loading, error }) {
  const [check, setCheck] = useState(false);
  const [showerror, setShowError] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    is_active: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleInputChecked = () => {
    setCheck(!check);

  };
  useEffect(()=>{
    setFormData({
      ...formData,
      is_active: check,
    });
  },[check])
  const handleSubmit = async (e) => {
    console.log(formData)
    e.preventDefault();
    try{
          await postservice(profile.organisation, formData,()=>{
            setFormData({
              name: "",
              price: "",
              description: "",
              is_active: "",
            });
            toast.success("Service Added Successfully");
          }, ()=>{
            setShowError(true)
          })
    }catch(error){

    } 
  }
  useEffect(() => {
    if (datas?.name) {
      setCheck(datas?.status);
    }
  }, [datas]);

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={datas?.name ? "Edit Service" : "New Service"}
      width={"max-w-3xl"}
    >
       <ToastContainer/>
      <div className="flex-colo gap-6">
        {showerror && (
            <div className="error-message">
              <p>{error}</p>
            </div>
        )}
        <Input
          label="Service Name"
          color={true}
          name="name"
          onChange={handleInputChange}
          placeholder={datas?.name && datas.name}
        />

        <Input
          label="Price (Naira)"
          type="number"
          color={true}
          name="price"
          onChange={handleInputChange}
          placeholder={datas?.price ? datas.price : 0}
        />

        {/* des */}
        <Textarea
          label="Description"
          name="description"
          onChange={handleInputChange}
          placeholder="Write description here..."
          color={true}
          rows={5}
        />
        {/* switch */}
        <div className="flex items-center gap-2 w-full">
          <Switchi
            label="Status"
            checked={check}
            onChange={() => { handleInputChecked()}}
          />
          <p className={`text-sm ${check ? "text-subMain" : "text-textGray"}`}>
            {check ? "Enabled" : "Disabled"}
          </p>
        </div>
        {/* buttones */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <button
            onClick={closeModal}
            className="bg-red-600 bg-opacity-5 text-red-600 text-sm p-4 rounded-lg font-light"
          >
            {datas?.name ? "Discard" : "Cancel"}
          </button>
          <Button
            label="Save"
            Icon={HiOutlineCheckCircle}
            onClick={handleSubmit}
            loading={loading}
          />
        </div>
      </div>
    </Modal>
  );
}
const mapStateToProps = state => {
  return{
      errors:state?.createservice?.error,
      loading: state?.createservice?.loading,
      profile: state?.profile?.data,
  }
}

const mapDispatchToProps = dispatch => {
  return{
      postservice: (id, loginState, history, setErrorHandler) => {
          dispatch(postservice(id, loginState, history, setErrorHandler));
      },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddEditServiceModal);
