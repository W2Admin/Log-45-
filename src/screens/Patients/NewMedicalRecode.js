import React, { useState } from "react";
import Layout from "../../Layout";
import { Link } from "react-router-dom";
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

const doctorsData = memberData.map((item) => {
  return {
    id: item.id,
    name: item.title,
  };
});

function NewMedicalRecord() {
  const [doctors, setDoctors] = useState(doctorsData[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [treatments, setTreatments] = useState(
    servicesData.map((item) => {
      return {
        name: item.name,
        checked: false,
        price: item.price,
      };
    })
  );
  const [formData, setFormData] = useState({
    investigationRequestType: "",
    animalType: "",
    species: "",
    sex: "",
    weight: "",
    typeOfFeed: "",
    lastFeed: "",
    sampleType: "",
    investigationRequest: "",
    symptomsDescription: "",
    additionalInfo: "",
    doctorscomment: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic here
    toast.error("This feature is not available yet");
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
          <p className="text-black font-medium text-sm">Amani Ammesty</p>
          <p className="text-[#8f9cb6]font-medium text-sm">
            amaniammesty21@gmail.com
          </p>
          <p className="text-black font-medium text-sm">+234808766511</p>
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
                  name="investigationRequestType"
                  value={formData.investigationRequestType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none"
                >
                  <option value=""></option>
                  <option value="Wide">Wide</option>
                  <option value="Narrow">Narrow</option>
                </select>
              </div>
              <div className="w-full sm:w-1/2 px-3">
                <p className="text-black text-sm font-medium">Sample Type</p>
                <select
                  name="sampleType"
                  value={formData.sampleType}
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
              <div className="w-full sm:w-1/2 px-3 mt-3">
                <label
                  htmlFor="animalType"
                  className="mb-3 block text-sm font-medium text-[#07074D]"
                >
                  Animal Type
                </label>
                <input
                  type="text"
                  name="animalType"
                  id="animalType"
                  value={formData.animalType}
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
                  type="text"
                  name="species"
                  id="species"
                  value={formData.species}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:shadow-md"
                />
              </div>
              <div className="w-full sm:w-1/2 px-3 mt-3">
                <p className="mb-3 block text-sm font-medium text-[#07074D]">
                  Sex
                </p>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none"
                >
                  <option value=""></option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
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
                  type="text"
                  name="weight"
                  id="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:shadow-md"
                />
              </div>
              <div className="w-full sm:w-1/2 px-3 mt-3">
                <label
                  htmlFor="typeOfFeed"
                  className="mb-3 block text-sm font-medium text-[#07074D]"
                >
                  Type of Feed/Food
                </label>
                <input
                  type="text"
                  name="typeOfFeed"
                  id="typeOfFeed"
                  value={formData.typeOfFeed}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:shadow-md"
                />
              </div>
              <div className="w-full sm:w-1/2 px-3 mt-3">
                <label
                  htmlFor="lastFeed"
                  className="mb-3 block text-sm font-medium text-[#07074D]"
                >
                  Last Feed
                </label>
                <input
                  type="text"
                  name="lastFeed"
                  id="lastFeed"
                  value={formData.lastFeed}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:shadow-md"
                />
              </div>
            </div>
            <div className="flex flex-wrap mt-3">
              <div className="w-full px-3">
                <label
                  htmlFor="symptomsDescription"
                  className="mb-3 block text-sm font-medium text-[#07074D]"
                >
                  Symptoms Description
                </label>
                <input
                  type="text"
                  name="symptomsDescription"
                  id="symptomsDescription"
                  value={formData.symptomsDescription}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:shadow-md"
                />
              </div>
              <div className="w-full mt-3 px-3">
                <label
                  htmlFor="additionalInfo"
                  className="mb-3 block text-sm font-medium text-[#07074D]"
                >
                  Additional Information (History of Treatment)
                </label>
                <input
                  type="text"
                  name="additionalInfo"
                  id="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:shadow-md"
                />
              </div>
              <div className="w-full mt-3 px-3">
                <label
                  htmlFor="additionalInfo"
                  className="mb-3 block text-sm font-medium text-[#07074D]"
                >
                  Doctor's Comment
                </label>
                <input
                  type="text"
                  name="doctorscomment"
                  id="doctorscomment"
                  value={formData.doctorscomment}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-medium text-[#6B7280] outline-none focus:shadow-md"
                />
              </div>
            </div>
            <div className="flex w-full flex-col gap-4">
              <p className="text-black text-sm font-medium">
                Attach Sample Image
              </p>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="relative w-full">
                    <img
                      src={`https://placehold.it/300x300?text=${i}`}
                      alt="patient"
                      className="w-full md:h-40 rounded-lg object-cover"
                    />
                    <button
                      onClick={() =>
                        toast.error("This feature is not available yet.")
                      }
                      className="bg-white rounded-full w-8 h-8 flex-colo absolute -top-1 -right-1"
                    >
                      <FaTimes className="text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
              <Uploader setImage={{}} />
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

export default NewMedicalRecord;
