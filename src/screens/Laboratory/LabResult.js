import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdOutlineCloudDownload } from "react-icons/md";
import { AiOutlinePrinter } from "react-icons/ai";
import { RiShareBoxLine } from "react-icons/ri";
import PaymentModal from "../../components/Modals/PaymentModal";
import ShareModal from "../../components/Modals/ShareModal";

function LabResult() {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const buttonClass =
    "bg-[#216c5a] text-white flex items-center gap-3 rounded-lg px-4 py-2 text-sm";

  // Mock data - replace with API call
  const labResult = {
    patientName: "Anami Ammasty",
    animalType: "Dog",
    species: "Rottweiler",
    examinationRequest: "Blood Test",
    investigationType: "Wide",
    testDate: "2023-05-27",
    results: [
      {
        test: "Pathogen Type",
        result: "Bacteria",
        unit: "",
        reference: "4.5-11.0",
      },
      {
        test: "SPP",
        result: "Gingivitis",
        unit: "mg/dL",
        reference: "70-110",
      },
      {
        test: "Susceptible AB",
        result: "Pulse",
        unit: "mg/dL",
        reference: "7-20",
      },
      {
        test: "Resistant AB",
        result: "1.0",
        unit: "mg/dL",
        reference: "0.5-1.2",
      },
      {
        test: "Alkaline Phosphatase",
        result: "45",
        unit: "U/L",
        reference: "20-120",
      },
    ],
    doctorNotes:
      "No significant abnormalities detected. The dog is in good health.",
  };

  return (
    <div className=" ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-sm font-medium sm:block hidden">
          Investigation Result
        </h1>
        {/* <Link to="/lab-results" className="text-subMain flex items-center">
          <IoArrowBackOutline className="mr-2" /> Go Back
        </Link> */}
      </div>

      <div className="flex justify-between items-center mb-4">
        <img
          src="/images/logo.png"
          alt="logo"
          className="w-32 object-contain mb-4"
        />
        <div className="flex gap-4">
          <button
            onClick={() => toast.error("This feature is not available yet")}
            className={buttonClass}
          >
            Download <MdOutlineCloudDownload />
          </button>
          <button
            onClick={() => toast.error("This feature is not available yet")}
            className={buttonClass}
          >
            Print <AiOutlinePrinter />
          </button>
          <button onClick={() => setIsShareOpen(true)} className={buttonClass}>
            Share <RiShareBoxLine />
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h2 className="text-sm font-medium mb-4">Patient Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm">Name</p>
                  <p className="text-xs text-gray-700">
                    {labResult.patientName}
                  </p>
                </div>
                <div>
                  <p className="text-sm">Animal Type</p>
                  <p className="text-xs text-gray-700">
                    {labResult.animalType}
                  </p>
                </div>
                <div>
                  <p className="text-sm">Species</p>
                  <p className="text-sm text-gray-700">{labResult.species}</p>
                </div>
                <div>
                  <p className="text-sm">Examination Request</p>
                  <p className="text-xs text-gray-700">
                    {labResult.examinationRequest}
                  </p>
                </div>
                <div>
                  <p className="text-sm">Investiagation Type</p>
                  <p className="text-xs text-gray-700">
                    {labResult.investigationType}
                  </p>
                </div>
                <div>
                  <p className="text-sm">Test Date</p>
                  <p className="text-xs font-light text-gray-700">
                    {labResult.testDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h2 className="text-sm font-medium mb-4">Results</h2>
              <table className="w-full text-xs text-left text-gray-700">
                <thead className="text-xs font-light text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th scope="col" className="px-4 py-2">
                      Test
                    </th>
                    <th scope="col" className="px-4 py-2">
                      Result
                    </th>
                    <th scope="col" className="px-4 py-2">
                      Unit
                    </th>
                    <th scope="col" className="px-4 py-2">
                      Reference Range
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {labResult.results.map((result, index) => (
                    <tr key={index} className="bg-white border-b">
                      <td className="px-4 py-2">{result.test}</td>
                      <td className="px-4 py-2">{result.result}</td>
                      <td className="px-4 py-2">{result.unit}</td>
                      <td className="px-4 py-2">{result.reference}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h2 className="text-sm font-medium mb-4">Doctor's Notes</h2>
          <p className="text-sm font-light text-gray-700">
            {labResult.doctorNotes}
          </p>
        </div>
      </div>

      {isOpen && (
        <PaymentModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      )}
      {isShareOpen && (
        <ShareModal
          isOpen={isShareOpen}
          closeModal={() => setIsShareOpen(false)}
        />
      )}
    </div>
  );
}

export default LabResult;
