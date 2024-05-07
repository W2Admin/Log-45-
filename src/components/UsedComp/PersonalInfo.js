import React from "react";
import Uploder from "../Uploader";
import { sortsDatas } from "../Datas";
import { Button, DatePickerComp, Input, Select } from "../Form";
import { BiChevronDown } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { RiDeleteBin5Line } from "react-icons/ri";

function PersonalInfo({ titles }) {
  const [title, setTitle] = React.useState(sortsDatas.title[0]);
  const [date, setDate] = React.useState(new Date());
  const [gender, setGender] = React.useState(sortsDatas.genderFilter[0]);
  return (
    <div className="flex-colo gap-4">
      {/* uploader */}
      {/* <div className="flex gap-3 flex-col w-full col-span-6">
        <p className="text-sm">Profile Image</p>
        <Uploder />
      </div> */}
      {/* select  */}
      {titles && (
        <div className="flex w-full flex-col gap-3">
          <p className="text-black text-sm">Title</p>
          <Select
            selectedPerson={title}
            setSelectedPerson={setTitle}
            datas={sortsDatas.title}
          >
            <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
              {title?.name} <BiChevronDown className="text-xl" />
            </div>
          </Select>
        </div>
      )}

      {/* fullName */}
      <Input label="Full Name" color={true} type="text" />
      {/* phone */}
      <Input label="Phone Number" color={true} type="number" />
      {/* email */}
      <Input label="Email" color={true} type="email" />

      {!titles && (
        <>
          {/* gender */}
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Gender</p>
            <Select
              selectedPerson={gender}
              setSelectedPerson={setGender}
              datas={sortsDatas.genderFilter}
            >
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {gender?.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
          {/* date */}
          <DatePickerComp
            label="Age(Weeks)"
            startDate={date}
            onChange={(date) => setDate(date)}
          />
          <Input label="Animal Type" color={true} type="text" />
          {/* address */}
          <Input label="Breed" color={true} type="text" />
          <Input label="Species" color={true} type="text" />
          <Input label="Sex" color={true} type="text" />
          <Input label="Weight" color={true} type="text" />
          <Input label="Type of Feed/Food" color={true} type="text" />
          <div className="flex w-full flex-col gap-3">
            {" "}
            <p className="text-black text-sm">Sample details</p>{" "}
            <select className="w-full px-3 py-2 border  border-gray-200 rounded-md focus:outline-none ">
              <option value=""></option>
              <option value="Fish Farming">Normal</option>
              <option value="Pig Farming"> Urgent</option>
              <option value="Crop Framing">Fasting</option>
              <option value="Animal Husbandry">Blood</option>
              <option value="Laboratory Specialist">Swab</option>
              <option value="HealthCare">Tissue</option>
            </select>
          </div>
          <div className="flex w-full flex-col gap-3">
            {" "}
            <p className="text-black text-sm">Reason for examination</p>{" "}
            <select className="w-full px-3 py-2 border  border-gray-200 rounded-md focus:outline-none ">
              <option value=""></option>
              <option value="Fish Farming">Diagnosis</option>
              <option value="Pig Farming">Follow up</option>
              <option value="Crop Framing">Fasting</option>
            </select>
          </div>
          <div className="flex w-full flex-col gap-3">
            {" "}
            <p className="text-black text-sm">Examination Request</p>{" "}
            <select className="w-full px-3 py-2 border  border-gray-200 rounded-md focus:outline-none ">
              <option value=""></option>
              <option value="Fish Farming">Histology</option>
              <option value="Pig Farming">Culture/Sensitivity</option>
              <option value="Crop Framing">Parasites</option>
              <option value="Crop Framing">Smear & Culture</option>
              <option value="Crop Framing">Smear only</option>
            </select>
          </div>
          <Input
            label="Previous Medical History/Treatment"
            color={true}
            type="text"
          />
        </>
      )}
      {/* submit */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <Button
          label={"Delete Account"}
          Icon={RiDeleteBin5Line}
          onClick={() => {
            toast.error("This feature is not available yet");
          }}
        />
        <Button label={"Next"} Icon={HiOutlineCheckCircle} onClick={() => {}} />
      </div>
    </div>
  );
}

export default PersonalInfo;
