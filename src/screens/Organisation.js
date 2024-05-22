import React, { useState, useEffect } from "react";
import { MdOutlineCloudDownload } from "react-icons/md";
import { toast } from "react-hot-toast";
import { BiChevronDown, BiPlus } from "react-icons/bi";
import Layout from "../Layout";
import { Button, Select } from "../components/Form";
import { OrganisationTable } from "../components/Tables";
import AddEditOrgainisationModal from "../components/Modals/AddEditOrganisationModal";

function Organisation() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([
    {
      id: 1,
      name: "Ridlabs",
      email: "ridlab@gmail.com",
      phonenumber: "+2345768976554",
      industry: "Pig Farming",
      address: "65, opebi, Lagos",
      status: "Active",
      action: "",
    },
    {
      id: 2,
      name: "Ridlabs",
      email: "ridlab@gmail.com",
      phonenumber: "+2345768976554",
      industry: "Pig Farming",
      address: "65, opebi, Lagos",
      status: "Active",
      action: "",
    },
    {
      id: 3,
      name: "Ridlabs",
      email: "ridlab@gmail.com",
      phonenumber: "+2345768976554",
      industry: "Pig Farming",
      address: "65, opebi, Lagos",
      status: "Active",
      action: "",
    },
    {
      id: 4,
      name: "Ridlabs",
      email: "ridlab@gmail.com",
      phonenumber: "+2345768976554",
      industry: "Pig Farming",
      address: "65, opebi, Lagos",
      status: "Active",
      action: "",
    },
    {
      id: 5,
      name: "Ridlabs",
      email: "ridlab@gmail.com",
      phonenumber: "+2345768976554",
      industry: "Pig Farming",
      address: "65, opebi, Lagos",
      status: "Active",
      action: "",
    },
  ]);
  const [status, setStatus] = useState("");

  const onCloseModal = () => {
    setIsOpen(false);
    setData({});
  };

  const onEdit = (datas) => {
    setIsOpen(true);
    setData(datas);
  };
  return (
    <Layout>
      {isOpen && (
        <AddEditOrgainisationModal
          datas={data}
          isOpen={isOpen}
          closeModal={onCloseModal}
        />
      )}
      {/* add button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-16 animate-bounce h-16 border border-border z-50 bg-subMain text-white rounded-full flex-colo fixed bottom-8 right-12 button-fb"
      >
        <BiPlus className="text-2xl" />
      </button>
      {/*  */}
      <h1 className="text-xl font-semibold">Organisations</h1>
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="100"
        data-aos-offset="200"
        className="bg-white my-8 rounded-xl border-[1px] border-border p-5"
      >
        {/* datas */}

        <div className="grid md:grid-cols-6 grid-cols-1 gap-2">
          <div className="md:col-span-5 grid lg:grid-cols-4 xs:grid-cols-2 items-center gap-2">
            <input
              type="text"
              placeholder='Search "Organisation Name"'
              className="h-14 w-full text-sm text-main rounded-md bg-dry border border-border px-4"
            />
            <Select
              selectedPerson={status}
              setSelectedPerson={setStatus}
              datas={data}
            >
              <div className="w-full flex-btn text-main text-sm p-4 border bg-dry border-border font-light rounded-lg focus:border focus:border-subMain">
                {status.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>

          {/* export */}
          <Button
            label="Export"
            Icon={MdOutlineCloudDownload}
            onClick={() => {
              toast.error("Exporting is not available yet");
            }}
          />
        </div>
        <div className="mt-8 w-full overflow-x-scroll">
          <OrganisationTable data={data} onEdit={onEdit} />
        </div>
      </div>
    </Layout>
  );
}

export default Organisation;
