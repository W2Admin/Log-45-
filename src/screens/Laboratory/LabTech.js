import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import { Link, useParams } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { Button, Checkbox, Select, Textarea } from "../../components/Form";
import AsyncSelect from "react-select/async"
import { BiChevronDown, BiPlus } from "react-icons/bi";
import {
  laboratoryData,
  technicianData,
  memberData,
  servicesData,
} from "../../components/Datas";
import { MedicineDosageTable } from "../../components/Tables";
import { toast } from "react-hot-toast";
import MedicineDosageModal from "../../components/Modals/MedicineDosage";
import { FaTimes } from "react-icons/fa";
import Uploader from "../../components/Uploader";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { connect } from "react-redux";
import { createantibiotics, createinvestigation, fetchantibiotics, fetchsinglelabortory } from "../../Redux/Laboratory/LaboratoryAction";
import { fetchuser } from "../../Redux/User/UserAction";
import LottieAnimation from "../../Lotties";
import loading2 from '../../images/loading2.json'
import { singlefetchpatient } from "../../Redux/Patients/PatientAction";

const TechnicianData = memberData.map((item) => {
  return {
    id: item.id,
    name: item.title,
  };
});

function NewMedicalRecode({
  singlefetchpatient,
  fetchsinglelabortory,
  fetchuser,
  profile,
  loading,
  error,
  labdata,
  labloading,
  singlepatient,
  customerloading,
  fetchantibiotics,
  antiloading,
  antibiotics,
  createAntibiotics,
  createinvestigation,
  investigationLoading,
  investigationError
}) {
  const {id} = useParams()
  const [technicians, setTechnician] = useState(technicianData[0]);
  const [attachment, setAttachment] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [showerror, setShowError] = useState(false);
  const [formData2, setFormData2] = useState({
    susceptible_ab: [],
    resistant_ab: [],
    intermediate_ab: [],
    pathogen_type: '',
    spp: '',
    lab_request: parseInt(id),
    technician: parseInt(profile.id)
  })
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };
    const handleChange = async (selectedOption, actionMeta) => {
      const { name } = actionMeta;
      // const newOptions = selectedOption.filter(option => !antibiotics.some(antibiotic => antibiotic.value === option.value));
      // for (const option of newOptions) {
      //   try {
      //     await createAntibiotics({ name : option.value },()=>{
      //       fetchantibiotics();
      //     },()=>{
            
      //     });
      //     toast.success(`Antibiotic ${option.value} created successfully`);
      //     fetchantibiotics();  // Refresh the antibiotics list
      //   } catch (error) {
      //     toast.error(`Failed to create antibiotic ${option.value}`);
      //   }
      // }
      setFormData2({
        ...formData2,
        [name]: selectedOption,
      });
    };
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData2({
        ...formData2,
        [name]: value,
      });
    };
    const loadOptions = (searchValue, callback) => {
      // setTimeout(() => {
      const filteredOptions = antibiotics.filter(option => option.value.toLowerCase().includes(searchValue?.toLowerCase()))
      callback(filteredOptions)
      // }, 2000)
    }
   console.log("this is labrequest", labdata)
  const [treatmeants, setTreatmeants] = useState(
    servicesData.map((item) => {
      return {
        name: item.name,
        checked: false,
        price: item.price,
      };
    })
  );

  // on change treatmeants
  const onChangeTreatmeants = (e) => {
    const { name, checked } = e.target;
    const newTreatmeants = treatmeants.map((item) => {
      if (item.name === name) {
        return {
          ...item,
          checked: checked,
        };
      }
      return item;
    });
    setTreatmeants(newTreatmeants);
  };
  const handleSubmit = async (e) =>{
    e.preventDefault();
    // Create a deep copy of formData2 to avoid modifying the state directly
    let dataToSend = JSON.parse(JSON.stringify(formData2));

    // Remove the id field from susceptible_ab, resistant_ab, and intermediate_ab
    dataToSend.susceptible_ab = dataToSend.susceptible_ab.map(item => item.id)
    dataToSend.resistant_ab = dataToSend.resistant_ab.map(item => item.id)
    dataToSend.intermediate_ab = dataToSend.intermediate_ab.map(item => item.id)
    let formData = new FormData();
    for (const key in dataToSend) {
      formData.append(key, JSON.stringify(dataToSend[key]));
    }
    images.forEach((image, index) => {
      formData.append(`attachment${index + 1}`, image.file);
    });
    try{
      await createinvestigation(labdata.id, formData,()=>{
        setFormData2({
          susceptible_ab: [],
          resistant_ab: [],
          intermediate_ab: [],
          pathogen_type: '',
          spp: '',
          lab_request: 0,
          technician: 0
        })
        setImages([])
        toast.success("Laboratory investigation created success");
      },()=>{
        setShowError(true);
      })
    }catch(error){

    } 
  }
  useEffect(()=>{
    fetchuser()
    fetchsinglelabortory(profile.organisation, id)
  },[profile.organisation])
  useEffect(()=>{
    fetchantibiotics()
  },[])
  useEffect(()=>{
    if(labdata){
      singlefetchpatient(labdata.customer)
    }
  },[labdata.customer]) 

  useEffect(()=>{
    if(labdata){
      const filteredAttachments = Object.entries(labdata)
          .filter(([key, value]) => key.includes('attachment') && value) // Filter for attachment keys that are not null
          .map(([key, value]) => value); // Map to get just the URLs
      setAttachment(filteredAttachments)
    }
  },[labdata]) 
  return (
    <Layout>
       {labloading||loading||customerloading || antiloading ? (
          <div className="preloader">
           <LottieAnimation data={loading2}/>
         </div>
        ) : (
          <>
            {
              // modal
              isOpen && (
                <MedicineDosageModal
                  isOpen={isOpen}
                  closeModal={() => {
                    setIsOpen(false);
                  }}
                />
              )
            }
            <div className="flex items-center gap-4">
              <Link
                to={`/laboratory`}
                className="bg-white border border-subMain border-dashed rounded-lg py-3 px-4 text-md"
              >
                <IoArrowBackOutline />
              </Link>
              <h1 className="text-xl font-semibold">Lab Investigation</h1>
            </div>
            <div className=" grid grid-cols-12 gap-6 my-8 items-start">
              <div    
                data-aos="fade-right"
                data-aos-duration="1000"
                data-aos-delay="100"
                data-aos-offset="200"
                className="col-span-12 flex-colo gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] border-border p-6 lg:sticky top-28"
              >
                <h4 className="px-2 text-xl font-bold text-navy-700">Information</h4>
                <div className="grid grid-cols-2 gap-4 px-2 w-full">
                  <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-3xl dark:bg-navy-700 dark:shadow-none">
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="text-xs font-medium text-navy-700">{singlepatient.first_name} {singlepatient.last_name}</p>
                  </div>
                  <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-3xl dark:bg-navy-700 dark:shadow-none">
                    <p className="text-sm text-gray-600">Phone Number</p>
                    <p className="text-xs font-medium text-navy-700">
                    {singlepatient.phone}
                    </p>
                  </div>
                  <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-3xl dark:bg-navy-700 dark:shadow-none">
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-xs font-medium text-navy-700">
                    {singlepatient.email}
                    </p>
                  </div>
                  <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-3xl dark:bg-navy-700 dark:shadow-none">
                    <p className="text-sm text-gray-600">Gender</p>
                    <p className="text-xs font-medium text-navy-700">{singlepatient.gender === "M"? "Male":"Female"}</p>
                  </div>
                  <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-3xl dark:bg-navy-700 dark:shadow-none">
                    <p className="text-sm text-gray-600">Age (weeks) </p>
                    <p className="text-xs font-medium text-navy-700">{labdata.age}</p>
                  </div>
                  <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-3xl dark:bg-navy-700 dark:shadow-none">
                    <p className="text-sm text-gray-600">Address </p>
                    <p className="text-xs font-medium text-navy-700">
                      {singlepatient.address}
                    </p>
                  </div>
                  <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-3xl dark:bg-navy-700 dark:shadow-none">
                    <p className="text-sm text-gray-600">Animal Type</p>
                    <p className="text-xs font-medium text-navy-700">{labdata.animal_type}</p>
                  </div>
                  <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-3xl dark:bg-navy-700 dark:shadow-none">
                    <p className="text-sm text-gray-600"> Breed </p>
                    <p className="text-xs font-medium text-navy-700">
                      German Shepherd
                    </p>
                  </div>
                  <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-3xl dark:bg-navy-700 dark:shadow-none">
                    <p className="text-sm text-gray-600">Sex</p>
                    <p className="text-xs font-medium text-navy-700">{labdata.gender === "M"? "Male":"Female"}</p>
                  </div>
                  <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-3xl dark:bg-navy-700 dark:shadow-none">
                    <p className="text-sm text-gray-600"> Weight </p>
                    <p className="text-xs font-medium text-navy-700">{labdata.weight}</p>
                  </div>
                  <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-3xl dark:bg-navy-700 dark:shadow-none">
                    <p className="text-sm text-gray-600"> Types of Feed</p>
                    <p className="text-xs font-medium text-navy-700">{labdata.food_type}</p>
                  </div>
                  <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-3xl dark:bg-navy-700 dark:shadow-none">
                    <p className="text-sm text-gray-600"> Sample details </p>
                    <p className="text-xs font-medium text-navy-700">{labdata.sample_type}</p>
                  </div>
                  <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-3xl dark:bg-navy-700 dark:shadow-none">
                    <p className="text-sm text-gray-600"> Reasons for Examination</p>
                    <p className="text-xs font-medium text-navy-700">Follow up</p>
                  </div>
                  <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-3xl dark:bg-navy-700 dark:shadow-none">
                    <p className="text-sm text-gray-600"> Examination Request</p>
                    <p className="text-xs font-medium text-navy-700">
                      {labdata.request_type === "W"?"Wide":"Narrow"}
                    </p>
                  </div>
                </div>
                <div className="w-full px-4">
                  <p className="text-sm text-gray-600"> Medical History</p>
                  <p className="text-xs font-medium text-navy-700">
                   {labdata.medical_history}
                  </p>
                </div>
                <div className="w-full px-4">
                  <p className="text-sm text-gray-600">Attachment Images</p>
                  <div className="overflow-auto max-h-[150px]">
                    {attachment.map((attachment, index) => (
                      <img
                        key={index}
                        src={`https://res.cloudinary.com/dxvycrrts/${attachment}`}
                        alt={`Attachment ${index + 1}`}
                        className="w-[150px] h-[150px] object-cover"
                      />
                    ))}
                  </div>
                </div>
                {/* <p className="text-xs text-subMain bg-text font-medium py-1 px-4 rounded-full border-[0.5px] border-subMain">
                    45 yrs{" "}
                  </p> */}
              </div>
              <form
                data-aos="fade-left"
                data-aos-duration="1000"
                data-aos-delay="100"
                data-aos-offset="200"
                className="col-span-12 lg:col-span-8 bg-white rounded-xl border-[1px] border-border p-6"
              >
                {showerror && (
                  <div className="error-message">
                    <p>{investigationError}</p>
                  </div>
                )}
                <div className="flex w-full flex-col gap-5">
                  <Textarea
                    label="Pathogen Type"
                    name="pathogen_type"
                    onChange={handleInputChange}
                    color={true}
                    rows={3}
                    placeholder={"Bacteria,fungi, ...."}
                  />
                  {/* Diagnosis */}
                  <Textarea
                    label="Spp"
                    name="spp"
                    onChange={handleInputChange}
                    color={true}
                    rows={3}
                    placeholder={"Gingivitis, Periodontitis, ...."}
                  />
                  {/* Vital Signs */}
                  <div className="flex w-full flex-col gap-3">
                    <p className="text-black text-sm">Susceptible AB</p>
                    <AsyncSelect 
                      name="susceptible_ab"
                      value={formData2.susceptible_ab}
                      defaultOptions
                      loadOptions={loadOptions} 
                      onChange={handleChange} 
                      isMulti
                    />
                  </div>
                  {/* <Textarea
                    label="Susceptible AB"
                    color={true}
                    rows={3}
                    placeholder={"Blood pressure, Pulse, ...."}
                  /> */}
                  {/* Treatment */}
                  <div className="flex w-full flex-col gap-3">
                    <p className="text-black text-sm">Resistance AB</p>
                    <AsyncSelect 
                      name="resistant_ab"
                      value={formData2.resistant_ab}
                      defaultOptions
                      loadOptions={loadOptions} 
                      onChange={handleChange}  
                      isMulti
                    />
                  </div>
                  <div className="flex w-full flex-col gap-3">
                    <p className="text-black text-sm">Intermediate AB</p>
                    <AsyncSelect 
                      name="intermediate_ab"
                      value={formData2.intermediate_ab}
                      defaultOptions
                      loadOptions={loadOptions} 
                      onChange={handleChange} 
                      isMulti 
                    />
                  </div>
                  {/* <div className="flex w-full flex-col gap-4">
                    <p className="text-black text-sm">Ressistant AB</p>
                    <div className="grid xs:grid-cols-2 md:grid-cols-3 gap-6 pb-6">
                      {servicesData?.slice(1, 100).map((item) => (
                        <Checkbox
                          label={item.name}
                          checked={
                            treatmeants.find((i) => i.name === item.name).checked
                          }
                          onChange={onChangeTreatmeants}
                          name={item.name}
                          key={item.id}
                        />
                      ))}
                    </div>
                  </div> */}
                  {/* medicine */}
                  {/* <div className="flex w-full flex-col gap-4 mb-6">
                    <p className="text-black text-sm">Medicine</p>
                    <div className="w-full overflow-x-scroll">
                      <MedicineDosageTable
                        data={laboratoryData?.slice(0, 3)}
                        functions={{
                          delete: (id) => {
                            toast.error("This feature is not available yet");
                          },
                        }}
                        button={true}
                      />
                    </div>
                    <button
                      onClick={() => {
                        setIsOpen(true);
                      }}
                      className=" text-subMain flex-rows gap-2 rounded-lg border border-subMain border-dashed py-4 w-full text-sm"
                    >
                      <BiPlus /> Add Medicine
                    </button>
                  </div> */}
                  <Textarea
                    label="Doctor's Notes"
                    color={true}
                    rows={3}
                    placeholder={"Gingivitis, Periodontitis, ...."}
                  />
                  <div className="flex w-full flex-col gap-4">
                    <p className="text-black text-sm font-medium">
                      Attach Sample Images
                    </p>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                      {images.map((image, i) => (
                        <div key={i} className="relative w-full">
                          <img
                            src={image.preview}
                            alt={`attachment${i + 1}`}
                            className="w-full md:h-40 rounded-lg object-cover"
                          />
                          <button
                            className="bg-white rounded-full w-8 h-8 flex-colo absolute -top-1 -right-1"
                            onClick={() => removeImage(i)}
                          >
                            <FaTimes className="text-red-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <Uploader setImages={setImages} />
                    {/* <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">
                      Submit
                    </button> */}
                  </div>
                  {/* submit */}
                  <div className="flex items-center space-x-4">
                    {" "}
                    {/* Container to hold the buttons */}
                    {/* <Button
                      label={"Save"}
                      Icon={HiOutlineCheckCircle}
                      onClick={() => {
                        toast.error("This feature is not available yet");
                      }}
                    /> */}
                    <Button
                      label={"Submit"}
                      Icon={HiOutlineCheckCircle}
                      loading={investigationLoading}
                      onClick={(e) => {
                        handleSubmit(e )
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
    </Layout>
  );
}
const mapStoreToProps = (state) => {
  console.log(state)
  return {    
    loading: state?.profile?.loading, 
    profile: state?.profile?.data,
    labloading: state?.singlelabrequest.loading,
    labdata:state?.singlelabrequest?.data,
    singlepatient: state?.singlepatient?.data,
    customerloading: state?.singlepatient?.loading,
    antiloading: state?.antibiotics?.loading,
    antibiotics: state?.antibiotics?.data,
    investigationLoading: state?.createinv?.loading,
    investigationError: state?.createinv?.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchuser: () => dispatch(fetchuser()),
    fetchantibiotics: () => dispatch(fetchantibiotics()),
    fetchsinglelabortory: (orgid, id) => dispatch(fetchsinglelabortory(orgid, id)),
    singlefetchpatient: (id) => dispatch(singlefetchpatient(id)),
    createinvestigation: (id, postdata, history, errors) => dispatch(createinvestigation(id, postdata, history, errors)),
    createAntibiotics: (postdata, history, errors) => dispatch(createantibiotics(postdata, history, errors))
  };
};
export default connect(mapStoreToProps, mapDispatchToProps)(NewMedicalRecode);
