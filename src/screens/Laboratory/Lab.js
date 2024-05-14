import React, { useState } from "react";
import Layout from "../../Layout";
import { onboardingData, sortsDatas } from "../../components/Datas";
import { Link, useNavigate } from "react-router-dom";
import {
  BiChevronDown,
  BiPlus,
  BiTime,
  BiDotsHorizontalRounded,
} from "react-icons/bi";
import { BsCalendarMonth } from "react-icons/bs";
import { MdFilterList, MdOutlineCalendarMonth } from "react-icons/md";
import { toast } from "react-hot-toast";
import { FiEdit, FiEye } from "react-icons/fi";
import { Button, FromToDate, Select, MenuSelect } from "../../components/Form";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LaboratoryTable } from "../../components/Tables";

const thclass = "text-start text-sm font-medium py-3 px-2 whitespace-nowrap";
const tdclass = "text-start text-sm py-4 px-2 whitespace-nowrap";

function Patients() {
  const [status, setStatus] = useState(sortsDatas.filterPatient[0]);
  const [gender, setGender] = useState(sortsDatas.genderFilter[0]);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const navigate = useNavigate();

  const sorts = [
    {
      id: 2,
      selected: status,
      setSelected: setStatus,
      datas: sortsDatas.filterPatient,
    },
    {
      id: 3,
      selected: gender,
      setSelected: setGender,
      datas: sortsDatas.genderFilter,
    },
  ];
  // boxes
  const boxes = [
    {
      id: 1,
      title: "Today Lab Request",
      value: "3",
      color: ["bg-subMain", "text-subMain"],
      icon: BiTime,
    },
    {
      id: 2,
      title: "Monthly Lab Request",
      value: "60",
      color: ["bg-orange-500", "text-orange-500"],
      icon: BsCalendarMonth,
    },
    {
      id: 3,
      title: "Yearly Lab Request",
      value: "500",
      color: ["bg-green-500", "text-green-500"],
      icon: MdOutlineCalendarMonth,
    },
  ];
  const DropDown1 = [
    {
      title: "View",
      icon: FiEdit,
      onClick: (item) => {
        onEdit(item);
      },
    },
    // {
    //   title: "Complete",
    //   icon: RiDeleteBin6Line,
    //   onClick: () => {
    //     toast.error("This feature is not available yet");
    //   },
    // },
  ];
  // preview
  // const previewPayment = (id) => {
  //   navigate(`/patients/preview/${id}`);
  // };
  const onEdit = (item) => {
    navigate(`/labtech`);
  };
  return (
    <Layout>
      {/* add button */}
      <Link
        to="/labtech"
        className="w-16 animate-bounce h-16 border border-border z-50 bg-subMain text-white rounded-full flex-colo fixed bottom-8 right-12 button-fb"
      >
        <BiPlus className="text-2xl" />
      </Link>
      <h1 className="text-xl font-semibold">Laboratory Data</h1>
      {/* boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {boxes.map((box) => (
          <div
            key={box.id}
            className="bg-white flex-btn gap-4 rounded-xl border-[1px] border-border p-5"
          >
            <div className="w-3/4">
              <h2 className="text-sm font-medium">{box.title}</h2>
              <h2 className="text-xl my-6 font-medium">{box.value}</h2>
              <p className="text-xs text-textGray">
                Total Patients <span className={box.color[1]}>{box.value}</span>{" "}
                {box.title === "Today Patients"
                  ? "today"
                  : box.title === "Monthly Patients"
                  ? "this month"
                  : "this year"}
              </p>
            </div>
            <div
              className={`w-10 h-10 flex-colo rounded-md text-white text-md ${box.color[0]}`}
            >
              <box.icon />
            </div>
          </div>
        ))}
      </div>
      {/* datas */}
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="10"
        data-aos-offset="200"
        className="bg-white my-8 rounded-xl border-[1px] border-border p-5"
      >
        <div className="grid lg:grid-cols-5 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2">
          <input
            type="text"
            placeholder='Search "Patients"'
            className="h-14 text-sm text-main rounded-md bg-dry border border-border px-4"
          />
          {/* sort  */}
          {sorts.map((item) => (
            <Select
              key={item.id}
              selectedPerson={item.selected}
              setSelectedPerson={item.setSelected}
              datas={item.datas}
            >
              <div className="h-14 w-full text-xs text-main rounded-md bg-dry border border-border px-4 flex items-center justify-between">
                <p>{item.selected.name}</p>
                <BiChevronDown className="text-xl" />
              </div>
            </Select>
          ))}
          {/* date */}
          <FromToDate
            startDate={startDate}
            endDate={endDate}
            bg="bg-dry"
            onChange={(update) => setDateRange(update)}
          />
          {/* export */}
          <Button
            label="Filter"
            Icon={MdFilterList}
            onClick={() => {
              toast.error("Filter data is not available yet");
            }}
          />
        </div>
        {/* <div className="mt-8 w-full overflow-x-scroll">
          <LaboratoryTable
            data={memberData}
            functions={{
              preview: previewPayment,
            }}
            used={false}
          />
        </div> */}

        <div className="mt-8 w-full overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">Name </th>
                <th className="px-4 py-2">Animal Type</th>
                <th className="px-4 py-2">Species</th>
                <th className="px-4 py-2">Examination request</th>
                <th className="px-4 py-2">Progress</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">
                  <div className="flex text-xs items-center">
                    {" "}
                    Abraham Adesanya
                  </div>
                </td>
                <td className="border text-xs px-4 py-2">German Shepherd</td>
                <td className="border text-xs px-4 py-2"> White fowl</td>
                <td className="border text-xs px-4 py-2">
                  <div className="flex"> Culture</div>
                </td>
                <td className="border px-4 py-2">
                  <div className="flex items-center">
                    <span className="mr-2">60%</span>
                    <div className="w-full">
                      <div className="bg-gray-200 h-2 rounded-full">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: "60%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className={tdclass}>
                  <MenuSelect datas={DropDown1}>
                    <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
                      <BiDotsHorizontalRounded />
                    </div>
                  </MenuSelect>
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">
                  <div className="flex text-xs items-center">
                    {" "}
                    Abraham Adesanya
                  </div>
                </td>
                <td className="border text-xs px-4 py-2">German Shepherd</td>
                <td className="border text-xs px-4 py-2"> White fowl</td>
                <td className="border text-xs px-4 py-2">
                  <div className="flex"> Culture</div>
                </td>
                <td className="border px-4 py-2">
                  <div className="flex items-center">
                    <span className="mr-2">30%</span>
                    <div className="w-full">
                      <div className="bg-gray-200 h-2 rounded-full">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: "30%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className={tdclass}>
                  <MenuSelect datas={DropDown1}>
                    <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
                      <BiDotsHorizontalRounded />
                    </div>
                  </MenuSelect>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default Patients;
