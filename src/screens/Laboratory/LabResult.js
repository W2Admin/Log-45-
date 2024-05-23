import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { invoicesData } from "../../components/Datas";
import { toast } from "react-hot-toast";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdOutlineCloudDownload } from "react-icons/md";
import { AiOutlinePrinter } from "react-icons/ai";
import { RiShareBoxLine } from "react-icons/ri";
import PaymentModal from "../../components/Modals/PaymentModal";
import ShareModal from "../../components/Modals/ShareModal";
import SenderReceverComp from "../../components/SenderReceverComp";
import { ResultsTable } from "../../components/Tables";

function LabResult() {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const buttonClass =
    "bg-blue-500 text-white flex items-center gap-3 rounded-lg px-4 py-2 text-sm";

  const results = invoicesData.find((invoice) => invoice.id.toString() === id);

  return (
    <div className="container mx-auto my-8 p-8 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Lab Result Details</h1>
        <Link to="/lab-results" className="text-blue-500 flex items-center">
          <IoArrowBackOutline className="mr-2" /> Go Back
        </Link>
      </div>

      <div className="flex justify-between items-center mb-4">
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
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-500 text-white rounded-lg px-6 py-3 text-sm"
        >
          Generate Payment
        </button>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <img
              src="/images/logo.png"
              alt="logo"
              className="w-32 object-contain mb-4"
            />
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold mb-4">
                Patient Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.to && (
                  <>
                    <div>
                      <p className="text-sm font-medium">Name</p>
                      <p className="text-sm text-gray-700">{results.to.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Animal Type</p>
                      <p className="text-sm text-gray-700">
                        {results.to.animalType}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Species</p>
                      <p className="text-sm text-gray-700">
                        {results.to.species}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Examination Request</p>
                      <p className="text-sm text-gray-700">
                        {results.to.examinationRequest}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold mb-4">Results</h2>
              <ResultsTable data={results.items} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Notes</h2>
            <p className="text-sm text-gray-700">
              Thank you for your business. We hope to work with you again soon.
              You can pay your invoice online at www.example.com/payments.
            </p>
          </div>
        </div>
        <div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Summary</h2>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-700">Sub Total:</p>
              <p className="text-sm font-medium">${results.subTotal}</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-700">Discount:</p>
              <p className="text-sm font-medium">${results.discount}</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-700">Tax:</p>
              <p className="text-sm font-medium">${results.tax}</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-700">Grand Total:</p>
              <p className="text-sm font-medium text-green-600">
                ${results.total}
              </p>
            </div>
          </div>
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
