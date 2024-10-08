import React, { useState, useEffect } from "react";
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
import { FiEdit } from "react-icons/fi";
import { Button, FromToDate, Select, MenuSelect } from "../../components/Form";
import { LaboratoryTable } from "../../components/Tables";
import { connect } from "react-redux";
import { fetchuser } from "../../Redux/User/UserAction";
import { fetchlabortory } from "../../Redux/Laboratory/LaboratoryAction";
import LottieAnimation from "../../Lotties";
import loading2 from '../../images/loading2.json'
import empty from "../../images/Empty.json"
import { fetchstatistics } from "../../Redux/Statistics/StatisticsAction";

const Box = ({ title, value, color, icon: Icon }) => (
  <div className="bg-white flex-btn gap-4 rounded-xl border-[1px] border-border p-5">
    <div className="w-3/4">
      <h2 className="text-sm font-medium">{title}</h2>
      <h2 className="text-xl my-6 font-medium">{value}</h2>
      <p className="text-xs text-textGray">
        Total Patients <span className={color[1]}>{value}</span>{" "}
        {title === "Today Lab Request"
          ? "today"
          : title === "Monthly Lab Request"
          ? "this month"
          : "this year"}
      </p>
    </div>
    <div
      className={`w-10 h-10 flex-colo rounded-md text-white text-md ${color[0]}`}
    >
      <Icon />
    </div>
  </div>
);

const statuses = ["Pending", "Ready to Test", "Awaiting Doctor's Comment"];

const PatientRow = ({ patient, onEdit, updateStatus }) => {
  const {
    id,
    name,
    animal_type,
    species,
    request_type,
    sample_type,
    status,
  } = patient;

  useEffect(() => {
    if (status !== "Pending") {
      const interval = setInterval(() => {
        updateStatus(id);
      }, 1000); // Adjust time as needed
      return () => clearInterval(interval);
    }
  }, [status, updateStatus, id]);

  return (
    <tr className="border-b bg-dry rounded-md overflow-hidden">
      {/* <td className="px-4 py-2 mt-8 text-xs">
        <span
          className={`py-1 px-4 ${
            status === "Ready to Test"
              ? "bg-subMain text-subMain"
              : status === "Awaiting Doctor's Comment"
              ? "bg-orange-500 text-orange-500"
              : status === "Pending" && "bg-red-600 text-red-600"
          } bg-opacity-10 text-xs rounded-xl`}
        >
          {status}
        </span>
      </td> */}
      <td className="border text-xs px-4 py-2">{animal_type}</td>
      <td className="border text-xs px-4 py-2">{species}</td>
      <td className="border text-xs px-4 py-2">
        <div className="flex">{(request_type === 'W'? "Wide" :"Narrow")}</div>
      </td>
      <td className="border text-xs px-4 py-2">
        <div className="flex">{sample_type}</div>
      </td>
      <td className="border px-4 py-2">
        <div className="flex items-center">{status}</div>
      </td>
      <td>
        <MenuSelect
          datas={[
            { title: "View", icon: FiEdit, onClick: () => onEdit(id) },
          ]}
        >
          <div className="bg-dry border text-main text-xl py-2 px-4 rounded-lg">
            <BiDotsHorizontalRounded />
          </div>
        </MenuSelect>
      </td>
    </tr>
  );
};

function Patients({
  fetchlabortory, 
  fetchuser, 
  profile, 
  labloading, 
  labdata,
  statLoading,
  fetchstatistics,
  stat
}) {
  const [status, setStatus] = useState(sortsDatas.filterPatient[0]);
  const [gender, setGender] = useState(sortsDatas.genderFilter[0]);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "Abraham Adesanya",
      animalType: "German Shepherd",
      species: "White fowl",
      examinationRequest: "Blood Test",
      investigationType: "Narrow",
      status: "Ready to Test",
    },
    {
      id: 2,
      name: "Abraham Adesanya",
      animalType: "German Shepherd",
      species: "White fowl",
      examinationRequest: "Urine Test",
      investigationType: "Narrow",
      status: "Awaiting Doctor's Comment",
    },
    {
      id: 3,
      name: "Nath Fredick",
      animalType: "German Shepherd",
      species: "White fowl",
      examinationRequest: "X-ray",
      investigationType: "Wide",
      status: "Pending",
    },
    {
      id: 4,
      name: "Theo Drey",
      animalType: "German Shepherd",
      species: "White fowl",
      examinationRequest: "MRI",
      investigationType: "Wide",
      status: "Pending",
    },
    {
      id: 5,
      name: "Joe Sanyaolu",
      animalType: "German Shepherd",
      species: "White fowl",
      examinationRequest: "CT Scan",
      investigationType: "Wide",
      status: "Pending",
    },
    {
      id: 6,
      name: "Olu Jacob Adesanya",
      animalType: "German Shepherd",
      species: "White fowl",
      examinationRequest: "Blood Test",
      investigationType: "Narrow",
      status: "Ready to Test",
    },
  ]);
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

  const boxes = [
    {
      id: 1,
      title: "Today Lab Request",
      value: "6",
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

  const onEdit = (patient) => {
    navigate(`/labtech/${patient}`);
  };

  const updateStatus = (id) => {
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === id
          ? {
              ...patient,
              status:
                statuses[
                  (statuses.indexOf(patient.status) + 1) % statuses.length
                ],
            }
          : patient
      )
    );
  };
  useEffect(()=>{
    fetchuser()
    fetchlabortory(profile.organisation)
    fetchstatistics()
  },[profile.organisation])

  return (
    <Layout>
      {labloading ? (
          <div className="preloader">
           <LottieAnimation data={loading2}/>
         </div>
      ) : (
        <>
          <h1 className="text-xl font-semibold">Laboratory Data</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <div className="bg-white flex-btn gap-4 rounded-xl border-[1px] border-border p-5">
              <div className="w-3/4">
                <h2 className="text-sm font-medium">Today Lab Request</h2>
                <h2 className="text-xl my-6 font-medium">{stat.total_requests_today}</h2>
              </div>
              <div
                className={`w-10 h-10 flex-colo rounded-md text-white text-md bg-subMain`}
              >
                <BiTime/>
              </div>
            </div>
            <div className="bg-white flex-btn gap-4 rounded-xl border-[1px] border-border p-5">
              <div className="w-3/4">
                <h2 className="text-sm font-medium">Monthly Lab Request</h2>
                <h2 className="text-xl my-6 font-medium">{stat.total_requests_monthly}</h2>
              </div>
              <div
                className={`w-10 h-10 flex-colo rounded-md text-white text-md bg-orange-500`}
              >
                <BsCalendarMonth/>
              </div>
            </div>
            <div className="bg-white flex-btn gap-4 rounded-xl border-[1px] border-border p-5">
              <div className="w-3/4">
                <h2 className="text-sm font-medium">Yearly Lab Request</h2>
                <h2 className="text-xl my-6 font-medium">{stat.total_requests_yearly}</h2>
              </div>
              <div
                className={`w-10 h-10 flex-colo rounded-md text-white text-md bg-green-500`}
              >
                <BsCalendarMonth/>
              </div>
            </div>
          </div>
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
              <FromToDate
                startDate={dateRange[0]}
                endDate={dateRange[1]}
                bg="bg-dry"
                onChange={(update) => setDateRange(update)}
              />
              <Button
                label="Filter"
                Icon={MdFilterList}
                onClick={() => toast.error("Filter data is not available yet")}
              />
            </div>
            <div className="mt-8 w-full overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2">Species</th>
                    <th className="px-4 py-2">Animal Type</th>
                    <th className="px-4 py-2">Examination Request</th>
                    <th className="px-4 py-2">Sample Type</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                {(labdata?.length === 0) ? (
                    <tr>
                      <td colSpan="5">
                        <div className="empty-animate">
                              <LottieAnimation data={empty}/>
                              <p>No Data Found</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {labdata.map((patient) => (
                        <PatientRow
                          key={patient.id}
                          patient={patient}
                          onEdit={onEdit}
                          updateStatus={updateStatus}
                        />
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
      </>
      )}
    </Layout>
  );
}
const mapStoreToProps = (state) => {
  console.log(state)
  return {    
    loading: state?.profile?.loading, 
    profile: state?.profile?.data,
    stat: state?.statistics?.data,
    statLoading: state?.statistics?.loading,
    labloading: state?.laboratory?.loading,
    labdata:state?.laboratory?.data
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchuser: () => dispatch(fetchuser()),
    fetchstatistics: () => dispatch(fetchstatistics()),
    fetchlabortory: (id) => dispatch(fetchlabortory(id)),
  };
};
export default connect(mapStoreToProps, mapDispatchToProps)(Patients);
