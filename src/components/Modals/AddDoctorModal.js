import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { Button, Input, Select } from '../Form';
import { BiChevronDown } from 'react-icons/bi';
import { sortsDatas } from '../Datas';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import Access from '../Access';
import Uploader from '../Uploader';
import { connect } from 'react-redux';
import { postuser } from '../../Redux/User/UserAction';

function AddDoctorModal({ closeModal,profile, isOpen, doctor, datas, postuser,loadingg, error, data }) {
  const [instraction, setInstraction] = useState(sortsDatas.title[0]);
  const [access, setAccess] = useState({});
  const [formData, setFormData] = useState({
    user: {
      first_name: "",
      last_name: "",
      organisation: "",
      email: "",
      password: ""
    },
    title: "",
    access_permissions: {
      customer: {
        can_read: false,
        can_edit:false,
        can_create: false,
        can_delete: false     
      },
      laboratory: {
        can_read: false,
        can_edit:false,
        can_create: false,
        can_delete: false   
      },
      invoice: {
        can_read: false,
        can_edit:false,
        can_create: false,
        can_delete: false   
      },
      payment: {
        can_read: false,
        can_edit:false,
        can_create: false,
        can_delete: false   
      }
    }
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [mainKey, subKey] = name.split('.');
    // c else if (name in formData.access_permissions) {
    //   setFormData((prevState) => ({
    //     ...prevState,
    //     access_permissions: {
    //       ...prevState.access_permissions,
    //       [name]: value
    //     }
    //   }));
    // }else {
    //   setFormData((prevState) => ({
    //     ...prevState,
    //     [name]: value
    //   }));
    // }
    if (name in formData.user) {
        setFormData((prevState) => ({
          ...prevState,
          user: {
            ...prevState.user,
            [name]: value
          }
        }));
      } else if (mainKey === 'access_permissions') {
      const [section, permission] = subKey.split('_');
      setFormData((prevState) => ({
        ...prevState,
        access_permissions: {
          ...prevState.access_permissions,
          [section]: {
            ...prevState.access_permissions[section],
            [permission]: value === 'true' || value === 'false' ? value === 'true' : value
          }
        }
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [mainKey]: value
      }));
    }
  };
  const onSubmit = async (e) => {
    console.log(formData)
    e.preventDefault();
    try{
          await postuser(formData,()=>{
            setFormData({
              user: {
                first_name: "",
                last_name: "",
                organisation: "",
                email: "",
                password: ""
              },
              title: ""
            });
            toast.success("User Added Successfully");
          }, ()=>{
            // setShowError(true)
          })
    }catch(error){

    } 
  }
  useEffect(()=>{
    setFormData((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        organisation: profile.organisation
      }
    }));
  },[profile.organisation])
  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={doctor ? 'Add Doctor' : datas?.id ? 'Edit Stuff' : 'Add Stuff'}
      width={'max-w-3xl'}
    >
      <div className="flex gap-3 flex-col col-span-6 mb-6">
        <p className="text-sm">Profile Image</p>
        <Uploader />
      </div>

      <div className="flex-colo gap-6">
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <Input 
            label="First Name" 
            color={true} 
            name="first_name"
            value={formData.user.first_name}
            placeholder="First Name" 
            onChange={handleInputChange}
          />

          <Input 
            label="Last Name" 
            color={true} 
            placeholder="Last Name"
            name="last_name"
            value={formData.user.last_name}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex w-full flex-col gap-3">
            <Input 
              label=" Title" 
              color={true} 
              placeholder="Title"
              name="title" 
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <Input 
            label="Email" 
            color={true}
            name="email"
            value={formData.user.email}
            onChange={handleInputChange}
          />
        </div>

        {/* password */}
        <Input 
          label="Password" 
          color={true} 
          name="password" 
          value={formData.user.password}
          onChange={handleInputChange}
        />

        {/* table access */}
        <div className="w-full">
          <Access setFormData={setFormData} formData={formData} />
        </div>

        {/* buttones */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <button
            onClick={closeModal}
            className="bg-red-600 bg-opacity-5 text-red-600 text-sm p-4 rounded-lg font-light"
          >
            Cancel
          </button>
          <Button label="Save" Icon={HiOutlineCheckCircle} onClick={onSubmit} />
        </div>
      </div>
    </Modal>
  );
}
const mapStateToProps = state => {
  return{
      errors:state?.createuser?.error,
      loading: state?.createuser?.loading,
      data: state?.createuser?.data,
      profile: state?.profile?.data,
  }
}

const mapDispatchToProps = dispatch => {
  return{
      postuser: (loginState, history, setErrorHandler) => {
          dispatch(postuser(loginState, history, setErrorHandler));
      },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddDoctorModal);
