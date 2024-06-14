import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import { Link, useParams } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { Button, Checkbox, Select, Textarea } from "../../components/Form";
import { BiChevronDown, BiPlus } from "react-icons/bi";
import { medicineData, memberData, servicesData } from "../../components/Datas";
import { MedicineDosageTable } from "../../components/Tables";
import { toast } from "react-hot-toast";
import MedicineDosageModal from "../../components/Modals/MedicineDosage";
import { FaTimes } from "react-icons/fa";
import Uploader from "../../components/Uploader";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { createlabortory } from "../../Redux/Laboratory/LaboratoryAction";
import { connect } from "react-redux";
import { singlefetchpatient } from "../../Redux/Patients/PatientAction";

const doctorsData = memberData.map((item) => {
  return {
    id: item.id,
    name: item.title,
  };
});

function NewMedicalRecord({errors, loading, createlabortory,idorg, singlepatient, singlefetchpatient}) {
  const [doctors, setDoctors] = useState(doctorsData[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  const {id} = useParams()
  useEffect(()=>{
    singlefetchpatient(id)
  },[id]) 
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };
  const [treatments, setTreatments] = useState(
    servicesData.map((item) => {
      return {
        name: item.name,
        checked: false,
        price: item.price,
      };
    })
  );
  useEffect(()=>{
  console.log(images)
  },[images])
  const [formData2, setFormData2] = useState({
    request_type: "",
    animal_type: "",
    species: "",
    gender: "",
    weight: "",
    typeOfFeed: "",
    food_type: "",
    last_feed: "",
    age: "",
    breed: "",
    sample_type: "",
    // sample_quanity: "",
    mortality_rate:"",
    flock_size: "",
    chief_complaint:"",
    investigationRequest: "",
    symptoms: "",
    medical_history: "",
    doctor_comment: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData2({ ...formData2, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    
    // Append form data
    for (const key in formData2) {
      formData.append(key, formData2[key]);
    }
    formData.append("organisation", singlepatient.organisation);
    formData.append("is_active", singlepatient.is_active);
    formData.append("customer", id);
    images.forEach((image, index) => {
      formData.append(`attachment${index + 1}`, image.file);
    });
    try{
        await createlabortory(idorg, formData,()=>{
          setFormData2({
            request_type: "",
            animal_type: "",
            species: "",
            gender: "",
            weight: "",
            age: "",
            breed: "",
            typeOfFeed: "",
            food_type: "",
            sample_type: "",
            mortality_rate:"",
            flock_size: "",
            chief_complaint:"",
            investigationRequest: "",
            symptoms: "",
            medical_history: "",
            doctor_comment: "",
          });
          setImages([])
          toast.success("Lab request created success");
        }, ()=>{
          // setShowError(true)
        })
  }catch(error){

  } 
  };

  // on change treatments
  const onChangeTreatments = (e) => {
    const { name, checked } = e.target;
    const newTreatments = treatments.map((item) => {
      if (item.name === name) {
        return {
          ...item,
          checked: checked,
        };
      }
      return item;
    });
    setTreatments(newTreatments);
  };

  return (
    <Layout>
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
          to={"/customers"}
          className="bg-white border border-subMain border-dashed rounded-lg py-3 px-4 text-md"
        >
          <IoArrowBackOutline />
        </Link>
        <h1 className="text-xl font-semibold">Lab Investigation</h1>
      </div>
      <div className="grid grid-cols-12 gap-6 my-8 items-start">
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="100"
          data-aos-offset="200"
          className="col-span-12 flex-colo gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] border-border p-6 lg:sticky top-28"
        >
          <p className="text-black font-medium text-sm">{singlepatient?.first_name} {singlepatient?.last_name}</p>
          <p className="text-[#8f9cb6]font-medium text-sm">
            {singlepatient?.email}
          </p>
          <p className="text-black font-medium text-sm">{singlepatient?.phone}</p>
        </div>

        <div
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="100"
          data-aos-offset="200"
          className="col-span-12 lg:col-span-8 bg-white rounded-xl border-[1px] border-border p-6"
        >
          <form
            onSubmit={handleFormSubmit}
            className="flex w-full flex-col gap-5"
          >
            <div className="flex flex-wrap">
              <div className="w-full sm:w-1/2 px-3">
                <p className="text-black text-sm font-medium">
                  Investigation Request Type
                </p>
                <select
                  required
                  name="request_type"
                  value={formData2.request_type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none"
                >
                  <option value=""></option>
                  <option value="W">Wide</option>
                  <option value="N">Narrow</option>
                </select>
              </div>
              <div className="w-full sm:w-1/2 px-3">
                <p className="text-black text-sm font-medium">Sample Type</p>
                <select
                  required
                  name="sample_type"
                  value={formData2.sample_type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none"
                >
                  <option value=""></option>
                  <option value="Normal">Normal</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Fasting">Fasting</option>
                  <option value="Blood">Blood</option>
                  <option value="Swab">Swab</option>
                  <option value="Tissue">Tissue</option>
                </select>
              </div>
              <div className="w-full sm:w-1/2 px-3">
                <label
                  htmlFor="sample_quantity"
                  className="mb-3 block text-sm font-medium text-[#07074D]"
                >
                  Sample Quantity
                </label>
                <input
                required
                  type="text"
                  name="sample_quantity"
                  id="sample_quantity"
                  value={formData2.weight}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:shadow-md"
                />
              </div>
              <div className="w-full sm:w-1/2 px-3 mt-3">
                <label
                  htmlFor="animal_type"
                  className="mb-3 block text-sm font-medium text-[#07074D]"
                >
                  Animal Type
                </label>
                <input
                  required
                  type="text"
                  name="animal_type"
                  id="animal_type"
                  value={formData2.animal_type}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:shadow-md"
                />
              </div>
              <div className="w-full sm:w-1/2 px-3 mt-3">
                <label
                  htmlFor="species"
                  className="mb-3 block text-sm font-medium text-[#07074D]"
                >
                  Species
                </label>
                <input
                required
                  type="text"
                  name="species"
                  id="species"
                  value={formData2.species}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:shadow-md"
                />
              </div>
              <div className="w-full sm:w-1/2 px-3 mt-3">
                <p className="mb-3 block text-sm font-medium text-[#07074D]">
                  Sex
                </p>
                <select
                required
                  name="gender"
                  value={formData2.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none"
                >
                  <option value=""></option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
              <div className="w-full sm:w-1/2 px-3">
                <label
                  htmlFor="weight"
                  className="mb-3 block text-sm font-medium text-[#07074D]"
                >
                  Weight
                </label>
                <input
                required
                  type="text"
                  name="weight"
                  id="weight"
                  value={formData2.weight}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:shadow-md"
                />
              </div>
              <div className="w-full sm:w-1/2 px-3">
                <label
                  htmlFor="age"
                  className="mb-3 block text-sm font-medium text-[#07074D]"
                >
                  Age(Weeks)
                </label>
                <input
                required
                  type="text"
                  name="age"
                  id="age"
                  value={formData2.age}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:shadow-md"
                />
              </div>
              <div className="w-full sm:w-1/2 px-3">
                <label
                  htmlFor="breed"
                  className="mb-3 block text-sm font-medium text-[#07074D]"
                >
                  Breed
                </label>
                <input
                required
                  type="text"
                  name="breed"
                  id="breed"
                  value={formData2.breed}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:shadow-md"
                />
              </div>
              <div className="w-full sm:w-1/2 px-3">
                <label
                  htmlFor="mortality_rate"
                  className="mb-3 block text-sm font-medium text-[#07074D]"
                >
                  Mortality Rate
                </label>
                <input
                required
                  type="text"
                  name="mortality_rate"
                  id="mortality_rate"
                  value={formData2.mortality_rate}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:shadow-md"
                />
              </div>
              <div className="w-full sm:w-1/2 px-3">
                <label
                  htmlFor="flock_size"
                  className="mb-3 block text-sm font-medium text-[#07074D]"
                >
                  Flock Size/Litter Size
                </label>
                <input
                required
                  type="text"
                  name="flock_size"
                  id="flock_size"
                  value={formData2.flock_size}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:shadow-md"
                />
              </div>
              <div className="w-full sm:w-1/2 px-3 mt-3">
                <label
                  htmlFor="food_type"
                  className="mb-3 block text-sm font-medium text-[#07074D]"
                >
                  Type of Feed/Food
                </label>
                <input
                required
                  type="text"
                  name="food_type"
                  id="food_type"
                  value={formData2.food_type}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:shadow-md"
                />
              </div>
              <div className="w-full sm:w-1/2 px-3 mt-3">
                <label
                  htmlFor="last_feed"
                  className="mb-3 block text-sm font-medium text-[#07074D]"
                >
                  Last Feed
                </label>
                <input
                required
                  type="text"
                  name="last_feed"
                  id="last_feed"
                  value={formData2.last_feed}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:shadow-md"
                />
              </div>
            </div>
            <div className="flex flex-wrap mt-3">
              <div className="w-full px-3">
                <label
                  htmlFor="symptoms"
                  className="mb-3 block text-sm font-medium text-[#07074D]"
                >
                  Symptoms Description
                </label>
                <input
                required
                  type="text"
                  name="symptoms"
                  id="symptoms"
                  value={formData2.symptoms}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:shadow-md"
                />
              </div>
              <div className="w-full mt-3 px-3">
                <label
                  htmlFor="chief_complaint"
                  className="mb-3 block text-sm font-medium text-[#07074D]"
                >
                  Chief Complaint
                </label>
                <input
                required
                  type="text"
                  name="chief_complaint"
                  id="chief_complaint"
                  value={formData2.chief_complaint}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:shadow-md"
                />
              </div>
              <div className="w-full mt-3 px-3">
                <label
                  htmlFor="medical_history"
                  className="mb-3 block text-sm font-medium text-[#07074D]"
                >
                  Additional Information (History of Treatment)
                </label>
                <input
                required
                  type="text"
                  name="medical_history"
                  id="medical_history"
                  value={formData2.medical_history}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:shadow-md"
                />
              </div>
              <div className="w-full mt-3 px-3">
                <label
                  htmlFor="doctor_comment"
                  className="mb-3 block text-sm font-medium text-[#07074D]"
                >
                  Doctor's Comment
                </label>
                <input
                required
                  type="text"
                  name="doctor_comment"
                  id="doctor_comment"
                  value={formData2.doctor_comment}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:shadow-md"
                />
              </div>
            </div>
            {/* <div className="flex w-full flex-col gap-4">
              <p className="text-black text-sm font-medium">
                Attach Sample Image
              </p>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                {[1, 2, 3, 4].map((_, i) => (
                     <div key={i} className="relative w-full">
                     <Uploader
                       setImage={setImage}
                       image={images[`attachment${i}`]}
                       index={i}
                     />
                   </div>
                ))}
              </div>

            </div> */}
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
            <Button
              label={"Submit"}
              Icon={HiOutlineCheckCircle}
              type="submit"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
}

const mapStateToProps = state => {
  return{
      errors:state?.createlab?.error,
      loading: state?.createlab?.loading,
      idorg: state?.profile?.data.organisation,
      singlepatient: state?.singlepatient?.data,
  }
}
const mapDispatchToProps = dispatch => {
  return{
      createlabortory: (id,loginState, history, setErrorHandler) => {
          dispatch(createlabortory(id, loginState, history, setErrorHandler));
      },
      singlefetchpatient: (id) => dispatch(singlefetchpatient(id)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewMedicalRecord);
