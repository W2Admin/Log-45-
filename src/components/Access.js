import React, { useEffect, useState } from "react";
import { Checkbox } from "./Form";

function Access({ formData, setFormData }) {
  const thclass = "text-start text-xs font-medium py-3 px-2 whitespace-nowrap";
  const tdclass = "text-start text-sm py-4 px-2 whitespace-nowrap";

  const [accessPermissions, setAccessPermissions] = useState(formData.access_permissions);

  // Handlers for each section
  const handleChange = (e, section) => {
    const { name, checked } = e.target;
    setAccessPermissions(prevState => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [name]: checked
      }
    }));
  };

  const datas = [
    { id: 1, name: "Customer", access: accessPermissions.customer, section: "customer" },
    { id: 2, name: "Laboratory", access: accessPermissions.laboratory, section: "laboratory" },
    { id: 3, name: "Invoice", access: accessPermissions.invoice, section: "invoice" },
    { id: 4, name: "Payment", access: accessPermissions.payment, section: "payment" },
  ];

  // const [customerAccess, setCustomerAccess] = useState(formData?.access_permissions?.customer);
  // const [laboratoryAccess, setLaboratoryAccess] = useState(formData?.access_permissions?.laboratory);
  // const [invoicesAccess, setInvoicesAccess] = useState(formData?.access_permissions?.invoice);
  // const [paymentsAccess, setPaymentsAccess] = useState(formData?.access_permissions?.payment);

  // // on change patient
  // const onChangeCustomer = (e) => {
  //   setCustomerAccess((prevAccess) => ({
  //     ...prevAccess,
  //     [e.target.name]: e.target.checked
  //   }));
  // };
  // // on change laboratory
  // const onChangeLaboratory = (e) => {
  //   setLaboratoryAccess({ ...laboratoryAccess, [e.target.name]: e.target.checked });
  // };

  // // on change invoices
  // const onChangeInvoices = (e) => {
  //   setInvoicesAccess({ ...invoicesAccess, [e.target.name]: e.target.checked });
  // };

  // // on change payments
  // const onChangePayments = (e) => {
  //   setPaymentsAccess({ ...paymentsAccess, [e.target.name]: e.target.checked });
  // };

  // const datas = [
  //   {
  //     id: 1,
  //     name: "Customer",
  //     access: customerAccess,
  //     onChange: onChangeCustomer,
  //   },
  //   {
  //     id: 2,
  //     name: "Laboratory",
  //     access: laboratoryAccess,
  //     onChange: onChangeLaboratory,
  //   },
  //   {
  //     id: 3,
  //     name: "Invoices",
  //     access: invoicesAccess,
  //     onChange: onChangeInvoices,
  //   },
  //   {
  //     id: 4,
  //     name: "Payments",
  //     access: paymentsAccess,
  //     onChange: onChangePayments,
  //   },
  // ];

  // send access to parent component
  // useEffect(() => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     access_permissions: {
  //       patient: customerAccess,
  //       laboratory: laboratoryAccess,
  //       invoice: invoicesAccess,
  //       payment: paymentsAccess,
  //     },
  //   }));
  // }, [customerAccess, laboratoryAccess, invoicesAccess, paymentsAccess, setFormData]);
  useEffect(() => {
    setFormData(prevState => ({
      ...prevState,
      access_permissions: accessPermissions
    }));
  }, [accessPermissions, setFormData]); 

  return (
    <div className="w-full">
      <h1 className="text-black text-sm mb-3">Access</h1>
      <div className="w-full overflow-x-scroll">
        <table className="table-auto w-full">
          <thead className="bg-dry rounded-md overflow-hidden">
            <tr>
              <th className={thclass}></th>
              <th className={thclass}>Read</th>
              <th className={thclass}>Edit</th>
              <th className={thclass}>Create</th>
              <th className={thclass}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((item) => (
              <tr
                key={item.id}
                className="border-b border-border hover:bg-greyed transitions"
              >
                <td className={`font-light text-xs ${tdclass}`}>{item.name}</td>
                <td className={tdclass}>
                  <Checkbox
                    name="can_read"
                    checked={item?.access?.can_read}
                    onChange={(e) => handleChange(e, item.section)}
                  />
                </td>
                <td className={tdclass}>
                  <Checkbox
                    name="can_edit"
                    checked={item?.access?.can_edit}
                    onChange={(e) => handleChange(e, item.section)}
                  />
                </td>
                <td className={tdclass}>
                  <Checkbox
                    name="can_create"
                    checked={item?.access?.can_create}
                    onChange={(e) => handleChange(e, item.section)}
                  />
                </td>
                <td className={tdclass}>
                  <Checkbox
                    name="can_delete"
                    checked={item?.access?.can_delete}
                    onChange={(e) => handleChange(e, item.section)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Access;
