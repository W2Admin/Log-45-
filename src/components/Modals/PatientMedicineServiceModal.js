import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { BiSearch, BiPlus } from 'react-icons/bi';
import { memberData, servicesData, medicineData } from '../Datas';
import { RadioGroup } from '@headlessui/react';
import { Button, Input } from '../Form';
import { connect } from 'react-redux';
import { fetchpatient } from '../../Redux/Patients/PatientAction';
import { fetchservice } from '../../Redux/Service/ServiceAction';
import { InvoiceService } from '../../Redux/Invoice/InvoiceAction';
import { toast } from "react-hot-toast";
function PatientMedicineServiceModal({ 
  closeModal, 
  isOpen, 
  patient, 
  fetchpatient, 
  loading, 
  profile,
  service,
  fetchservices,
  customerData,
  setSelectedItem,
  selectedItem,
  setSelectedService,
  selectedService,
  setSelectedTo,
  invoiceServices,
  InvoiceServiceLoading, 
  InvoiceServiceData
}) { 
  const [selected, setSelected] = useState(customerData[0]);
  const [selected1, setSelected1] = useState(service[0]);
  const [postState, setPostState] = useState([])
  const datas = patient
    ? customerData
    : // combine medicine and services data and sort by name
      service
  const handleAddClick = () => {
    // Add the selected item to the selectedTo state
    setSelectedTo([selected]);
    closeModal();
  };
  const handleAddClick2 = async(e) => {
    e.preventDefault();  
    // Add the selected item to the selectedTo state
    try{
      await invoiceServices(postState, ()=>{
        setSelectedItem([...selectedItem,selected1]);
        closeModal(); 
        toast.success("Invoice created successfully")
      },()=>{
        
      })
    }catch(e){
      console.log(e)
    } 
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostState({
      ...postState,
      [name]: value,
    });
  };
  useEffect(()=>{
    if(!patient){
      setSelectedService([...selectedService, InvoiceServiceData])
    }
  },[InvoiceServiceData])
  useEffect(()=>{
    setPostState({...postState, ...{service: selected1?.id, total_amount: selected1?.price}})
  },[selected1])
  useEffect(()=>{
    fetchpatient();
  },[])
  useEffect(()=>{
    fetchservices(profile.organisation);
  },[profile.organisation])
  return (
    <Modal 
      closeModal={closeModal}
      isOpen={isOpen}
      title={patient ? 'Patients' : 'Medicine & Services'}
      width={'max-w-xl'}
    >
      <div className="flex-colo gap-6">
        {/* search */} 
        <div className="flex items-center gap-4 w-full border border-border rounded-lg p-3">
          <input type="text" placeholder="Search" className="w-full" />
          <BiSearch className=" text-xl" />
        </div>
        {/* data */}
        <div className="w-full h-[500px] overflow-y-scroll">
          <RadioGroup value={patient ? selected: selected1} onChange={patient ? setSelected : setSelected1}>
            <div className="space-y-2">
              {datas.map((user) => (
                <RadioGroup.Option
                  key={user.id}
                  value={user}
                  className={({ active, checked }) =>
                    `
                    ${active ? 'border-subMain bg-subMain text-white' : ''}
                    rounded-xl border-[1px] border-border p-4 group hover:bg-subMain hover:text-white`
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <h6 className="text-sm">
                        {patient ? `${user.first_name} ${user.last_name}` : user.name}
                      </h6>
                      {patient && (
                        <p
                          className={`${
                            active && 'text-white'
                          } text-xs group-hover:text-white text-textGray mt-1`}
                        >
                          {user.email}
                        </p>
                      )} 
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
        {/* button */}
        {!patient?(
            <Input
              label="Quantity" 
              color={true} 
              type={'number'}
              name="quantity"
              onChange={handleInputChange}
            />
        ):(<></>)}
        <Button onClick={(e)=>{patient? handleAddClick() : handleAddClick2(e)}} label="Add" Icon={BiPlus} loading={InvoiceServiceLoading}/>
      </div>
    </Modal>
  );
}


const mapStoreToProps = (state) => {
  return {
    profile: state?.profile?.data,
    loading: state.patient.loading,
    customerData: state.patient.data,
    service: state.services.data,
    InvoiceServiceLoading: state.invoiceService.loading,
    InvoiceServiceData:state.invoiceService.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchpatient: () => dispatch(fetchpatient()),
    fetchservices: (id) => dispatch(fetchservice(id)),
    invoiceServices: (postdata, history, errors) => dispatch(InvoiceService(postdata, history, errors))
  };
};
export default connect(mapStoreToProps, mapDispatchToProps)(PatientMedicineServiceModal);
