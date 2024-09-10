import React, { useState } from 'react';
import Modal from './Modal';
import { BiPlus } from 'react-icons/bi';
import PatientMedicineServiceModal from './PatientMedicineServiceModal';
import { Button, Input } from '../Form';
import Modal2 from './Modal2';

function AddItemModal({ closeModal, isOpen, selectedItem, setSelectedItem, selectedService, setSelectedService }) {
  const [open, setOpen] = useState(false);
  console.log(selectedItem)
  return (
    <>
      {open && (
        <PatientMedicineServiceModal
          closeModal={() => setOpen(!open)}
          isOpen={open}
          patient={false }
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />
      )}
      <Modal2
        closeModal={closeModal}
        isOpen={isOpen}
        title="Add Item"
        width={'max-w-xl'}
      > 
        <div className="flex-colo gap-6">
          {/* title */}
          <div className="flex flex-col gap-4 w-full">
            <p className="text-black text-sm">Service</p>
            <button
              onClick={() => setOpen(!open)}
              className=" text-subMain flex-rows gap-2 rounded-lg border border-subMain border-dashed py-4 w-full text-sm"
            >
              <BiPlus /> Add Item
            </button>
          </div>
          {/* quantity */}
          <Input label="Quantity" color={true} type={'number'} />
          {/* summery */}
          <div className="flex flex-col gap-4 w-full">
            <p className="text-black text-sm">Summary</p>
            <div className="flex flex-col gap-4">
              {selectedItem.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between items-center"
                >
                  <p className="text-xs text-textGray">{item.name}</p>
                  <p
                    className={
                      item.color
                        ? 'text-xs text-subMain bg-subMain bg-opacity-10 font-semibold py-1 px-4 rounded-full'
                        : 'text-sm font-medium text-textGray'
                    }
                  >
                    {item.price}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* button */}
          <Button onClick={closeModal} label="Add" Icon={BiPlus} />
        </div>
      </Modal2>
    </>
  );
}

export default AddItemModal;
