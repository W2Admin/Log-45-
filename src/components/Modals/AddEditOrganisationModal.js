import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { Button, Input, Switchi, Textarea } from "../Form";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { toast } from "react-hot-toast";

function AddEditOrgainisationModal({ closeModal, isOpen, datas }) {
  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (datas?.name) {
      setCheck(datas?.status);
    }
  }, [datas]);

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={datas?.name ? "Edit Organisation" : "New Organisation"}
      width={"max-w-3xl"}
    >
      <div className="flex-colo gap-6">
        <Input
          label="Organisation Name"
          color={true}
          placeholder={datas?.name && datas.name}
        />

        <Input
          label="Email Address"
          color={true}
          placeholder={datas?.email && datas.email}
        />
        <Input
          label="Phone Number"
          color={true}
          placeholder={datas?.phonenumber && datas.phonenumber}
        />
        <select
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none"
          label="Industry"
          color={true}
          placeholder={datas?.industry && datas.industry}
        >
          {" "}
          <option value="">Select Industry Type</option>
          <option value="Fish Farming">Fish Farming</option>
          <option value="Pig Farming">Pig Farming</option>
          <option value="Crop Framing">Crop Framing</option>
          <option value="Animal Husbandry">Animal Husbandry</option>
          <option value="Laboratory Specialist">Laboratory Specialist</option>
          <option value="HealthCare">HealthCare</option>
        </select>

        <Input
          label="Address"
          color={true}
          placeholder={datas?.address && datas.address}
        />

        {/* des */}
        {/* <Textarea
          label="Description"
          placeholder="Write description here..."
          color={true}
          rows={5}
        /> */}
        {/* switch */}
        <div className="flex items-center gap-2 w-full">
          <Switchi
            label="Status"
            checked={check}
            onChange={() => setCheck(!check)}
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
            onClick={() => {
              toast.error("This feature is not available yet");
            }}
          />
        </div>
      </div>
    </Modal>
  );
}

export default AddEditOrgainisationModal;
