import React, { useState } from "react";
import Layout from "../../Layout";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { Button, Checkbox, Select, Textarea } from "../../components/Form";
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

const TechnicianData = memberData.map((item) => {
  return {
    id: item.id,
    name: item.title,
  };
});

function NewMedicalRecode() {
  const [technicians, setTechnician] = useState(technicianData[0]);
  const [isOpen, setIsOpen] = useState(false);
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
          to={`/patients/preview/1`}
          className="bg-white border border-subMain border-dashed rounded-lg py-3 px-4 text-md"
        >
          <IoArrowBackOutline />
        </Link>
        <h1 className="text-xl font-semibold">New Lab Record</h1>
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
              <p className="text-base font-medium text-navy-700">
                Amani Mmassy
              </p>
            </div>
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-3xl dark:bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Phone Number</p>
              <p className="text-base font-medium text-navy-700">
                +254 712 345 678
              </p>
            </div>
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-3xl dark:bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-base font-medium text-navy-700">
                amanimmassy@gmail.com
              </p>
            </div>
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-3xl dark:bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Gender</p>
              <p className="text-base font-medium text-navy-700">Male</p>
            </div>
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-3xl dark:bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Age (weeks) </p>
              <p className="text-base font-medium text-navy-700">14</p>
            </div>
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-3xl dark:bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Address </p>
              <p className="text-base font-medium text-navy-700">
                20b Abraham Adesanya, Kolapo Close.
              </p>
            </div>
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-3xl dark:bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Animal Type</p>
              <p className="text-base font-medium text-navy-700">Dog</p>
            </div>
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-3xl dark:bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600"> Breed </p>
              <p className="text-base font-medium text-navy-700">
                German Shepherd
              </p>
            </div>
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-3xl dark:bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600">Sex</p>
              <p className="text-base font-medium text-navy-700"> Female</p>
            </div>
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-3xl dark:bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600"> Weight </p>
              <p className="text-base font-medium text-navy-700">5kg</p>
            </div>
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-3xl dark:bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600"> Types of Feed</p>
              <p className="text-base font-medium text-navy-700">Rice</p>
            </div>
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-3xl dark:bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600"> Sample details </p>
              <p className="text-base font-medium text-navy-700">Blood</p>
            </div>
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-3xl dark:bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600"> Reasons for Examination</p>
              <p className="text-base font-medium text-navy-700">Follow up</p>
            </div>
            <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-3xl dark:bg-navy-700 dark:shadow-none">
              <p className="text-sm text-gray-600"> Examination Request</p>
              <p className="text-base font-medium text-navy-700">
                Smear & culture
              </p>
            </div>
          </div>
          <div className="w-full px-4">
            <p className="text-sm text-gray-600"> Medical History</p>
            <p className="text-base font-medium text-navy-700">
              Previously undergone treatment for respiratory infections,
              considering the prevalence of illnesses such as bronchitis or
              pneumonia.History of skin conditions, as indicated by treatments
              for dermatological issues like eczema or fungal infections.
            </p>
          </div>
          {/* <p className="text-xs text-subMain bg-text font-medium py-1 px-4 rounded-full border-[0.5px] border-subMain">
              45 yrs{" "}
            </p> */}
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="100"
          data-aos-offset="200"
          className="col-span-12 lg:col-span-8 bg-white rounded-xl border-[1px] border-border p-6"
        >
          <div className="flex w-full flex-col gap-5">
            {/* doctor */}
            <div className="flex w-full flex-col gap-3">
              <p className="text-black text-sm">Technician</p>
              <Select
                selectedPerson={technicians}
                setSelectedPerson={setTechnician}
                datas={technicianData}
              >
                <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                  {technicians.name} <BiChevronDown className="text-xl" />
                </div>
              </Select>
            </div>
            {/* complains */}
            <Textarea
              label="Pathogen Type"
              color={true}
              rows={3}
              placeholder={"Bacteria,fungi, ...."}
            />
            {/* Diagnosis */}
            <Textarea
              label="Spp"
              color={true}
              rows={3}
              placeholder={"Gingivitis, Periodontitis, ...."}
            />
            {/* Vital Signs */}
            <Textarea
              label="Susceptible AB"
              color={true}
              rows={3}
              placeholder={"Blood pressure, Pulse, ...."}
            />
            {/* Treatment */}
            <div className="flex w-full flex-col gap-4">
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
            </div>
            {/* medicine */}
            <div className="flex w-full flex-col gap-4 mb-6">
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
            </div>
            {/* attachment */}
            <div className="flex w-full flex-col gap-4">
              <p className="text-black text-sm">Attachments</p>
              <div className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
                {[1, 2, 3, 4].map((_, i) => (
                  <div className="relative w-full">
                    <img
                      src={`https://placehold.it/300x300?text=${i}`}
                      alt="patient"
                      className="w-full  md:h-40 rounded-lg object-cover"
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
            {/* submit */}
            <Button
              label={"Save"}
              Icon={HiOutlineCheckCircle}
              onClick={() => {
                toast.error("This feature is not available yet");
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default NewMedicalRecode;
