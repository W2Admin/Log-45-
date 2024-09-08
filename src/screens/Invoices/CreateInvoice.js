import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import {
  Button,
  FromToDate,
  Input,
  Select,
  Textarea,
} from "../../components/Form";
import { BiChevronDown, BiPlus } from "react-icons/bi";
import PatientMedicineServiceModal from "../../components/Modals/PatientMedicineServiceModal";
import AddItemModal from "../../components/Modals/AddItemInvoiceModal";
import { invoicesData, sortsDatas } from "../../components/Datas";
import { toast } from "react-hot-toast";
import { BsSend } from "react-icons/bs";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { InvoiceProductsTable } from "../../components/Tables";
import SenderReceverComp from "../../components/SenderReceverComp";
import { fetchpatient } from "../../Redux/Patients/PatientAction";
import { connect } from "react-redux";
import { Createinvoice } from "../../Redux/Invoice/InvoiceAction";

function CreateInvoice({
  fetchpatient,
  loading, 
  patient,
  createInvoice,
  createloading,
  profile,
  InvoiceServiceData
}) {
  const [dateRange, setDateRange] = useState([
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 7)),
  ]);
  const [selectedTo, setSelectedTo] = useState([])
  const [selectedItem, setSelectedItem] = useState([])
  const [selectedService, setSelectedService] = useState(InvoiceServiceData)
  const [postState, setPostState] = useState([])
  const [startDate, endDate] = dateRange;
  const [isOpen, setIsOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);
  const [currency, setCurrency] = useState(sortsDatas.currency[0]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [vat, setVat] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  // date picker
  const onChangeDates = (update) => {
    setDateRange(update);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "discount") {
      setDiscount(parseFloat(value));
      setPostState({
        ...postState,
        [name]: parseInt(value),
      });
    }else if (name === "vat") {
      setVat(parseFloat(value));
      console.log("vat", value)
      setPostState({
        ...postState,
        [name]: parseInt(value),
      });
    }else{
      setPostState({
        ...postState,
        [name]: value,
      });
    }
  };
  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      await createInvoice(postState, ()=>{
        toast.success("Invoice created successfully")
      },()=>{
        
      })
    }catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{
    fetchpatient()
  },[])
  useEffect(()=>{
    setPostState({...postState, ...{currency: currency.name, organisation:profile.organisation}})
    if (selectedTo.length > 0) {
      setPostState((prev) => ({ ...prev, customer: selectedTo[0]?.id }));
    }

    if (selectedService.length > 0) {
      const filteredServices = selectedService.slice(1); // Exclude the first item
      setPostState((prev) => ({
        ...prev,
        invoice_services: filteredServices.map((item) => item.id),
      }));
  
      console.log(filteredServices);  
      const newSubtotal = filteredServices.reduce((acc, item) => acc + item.total_amount, 0);
      setSubtotal(parseFloat(newSubtotal));
      console.log("subtotal", newSubtotal)
    }
  },[selectedTo, profile, currency, selectedItem])
  useEffect(() => {
    const discountedTotal = subtotal - discount;
    const calculatedVat = (discountedTotal * vat) / 100;
    setGrandTotal(discountedTotal + calculatedVat);
    console.log("grand", discountedTotal + calculatedVat)
    setPostState({...postState, ...{total_amount:grandTotal, due_date:"2024-08-30"}})
  }, [subtotal, discount, vat]);
  return (
    <Layout>
      {isOpen && (
        <PatientMedicineServiceModal
          closeModal={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
          patient={true}
          setSelectedTo={setSelectedTo}
          selectedTo={selectedTo}
        />
      )}
      {itemOpen && (
        <AddItemModal
          closeModal={() => setItemOpen(!itemOpen)}
          isOpen={itemOpen}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />
      )}
      <div className="flex items-center gap-4">
        <Link
          to="/invoices"
          className="bg-white border border-subMain border-dashed rounded-lg py-3 px-4 text-md"
        >
          <IoArrowBackOutline />
        </Link>
        <h1 className="text-xl font-semibold"> Invoice</h1>
      </div>
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="100"
        data-aos-offset="200"
        className="bg-white my-8 rounded-xl border-[1px] border-border p-5"
      >
        {/* header */}
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2 items-center">
          <div className="lg:col-span-3">
            <img
              src="/images/logo.png"
              alt="logo"
              className=" w-32 object-contain"
            />
          </div>

          <div className="flex flex-col gap-4">
            <FromToDate
              startDate={startDate}
              endDate={endDate}
              label="Dates"
              onChange={onChangeDates}
            />
          </div>
        </div>
        {/* sender and recever */}
        <SenderReceverComp
          item={selectedTo[0]}
          functions={{
            openModal: () => {
              setIsOpen(!isOpen);
            },
          }}
          button={true}
        />
        {/* products */}
        <div className="grid grid-cols-6 gap-6 mt-8">
          <div className="col-span-6 lg:col-span-4 p-6 border border-border rounded-xl overflow-hidden">
            <InvoiceProductsTable
              data={selectedItem}
              functions={{
                deleteItem: (id) => {
                  toast.error("This feature is not available yet");
                },
              }}
              button={true}
            />

            {/* add */}
            <button
              onClick={() => setItemOpen(!itemOpen)}
              className=" text-subMain flex-rows gap-2 rounded-lg border border-subMain border-dashed py-4 w-full text-sm mt-4"
            >
              <BiPlus /> Add Item
            </button>
          </div>
          <div className="lg:col-span-2 col-span-6 flex flex-col gap-6">
            <Select
              selectedPerson={currency}
              setSelectedPerson={setCurrency}
              datas={sortsDatas?.currency}
            >
              <div className="h-14 w-full text-xs text-main rounded-md border border-border px-4 flex items-center justify-between">
                <p>{currency?.name}</p>
                <BiChevronDown className="text-xl" />
              </div>
            </Select>
            <div className="grid sm:grid-cols-2 gap-6">
              <Input
                label="Discount"
                color={true}
                type="number"
                name="discount"
                onChange={handleInputChange}
                placeholder={"3000"}
              />
              <Input
                label="VAT(%)"
                color={true}
                type="number"
                name="vat"
                onChange={handleInputChange}
                placeholder={"3"}
              />
            </div>
            <div className="flex-btn gap-4">
              <p className="text-sm font-extralight">Sub Total:</p>
              <h6 className="text-sm font-medium">#{subtotal.toFixed(2)}</h6>
            </div>
            <div className="flex-btn gap-4">
              <p className="text-sm font-extralight">Discount:</p>
              <h6 className="text-sm font-medium">#{discount.toFixed(2)}</h6>
            </div>
            <div className="flex-btn gap-4">
              <p className="text-sm font-extralight">VAT:</p>
              <h6 className="text-sm font-medium">#{((subtotal - discount) * (vat / 100)).toFixed(2)}</h6>
            </div>
            <div className="flex-btn gap-4">
              <p className="text-sm font-extralight">Grand Total:</p>
              <h6 className="text-sm font-medium text-green-600">#{grandTotal.toFixed(2)}</h6>
            </div>
            {/* notes */}
            <Textarea
              label="Notes"
              placeholder="Thank you for your business. We hope to work with you again soon!"
              color={true}
              name="note"
              rows={3}
              onChange={handleInputChange}
            />
            {/* button */}
            <Button
              label="Save & Send"
              onClick={handleSubmit}
              Icon={BsSend}
            />
          </div>
        </div>
      </div>
    </Layout> 
  );
}
const mapStoreToProps = (state) => {
  return {
    loading: state.patient.loading,
    patient: state.patient.data,
    profile:state.profile.data,
    invoiceloading: state.createinvoice.loading,
    InvoiceServiceData:state.invoiceService.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchpatient: () => dispatch(fetchpatient()),
    createInvoice: (postData, history, error)=>dispatch(Createinvoice(postData, history, error))
  };
};
export default connect(mapStoreToProps, mapDispatchToProps)(CreateInvoice);
