import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import { memberData, sortsDatas } from "../../components/Datas";
import { Link, useNavigate } from "react-router-dom";
import { BiChevronDown, BiPlus, BiTime } from "react-icons/bi";
import { BsCalendarMonth } from "react-icons/bs";
import { MdFilterList, MdOutlineCalendarMonth } from "react-icons/md";
import { toast } from "react-hot-toast";
import { Button, FromToDate, Select } from "../../components/Form";
import { PatientTable } from "../../components/Tables";
import { fetchpatient } from "../../Redux/Patients/PatientAction";
import { connect } from "react-redux";
import Loading2 from "../../images/loading2.json";
import empty from "../../images/Empty.json";
import LottieAnimation from "../../Lotties";
import { fetchstatistics } from "../../Redux/Statistics/StatisticsAction";

function Patients({ 
  patient, 
  fetchpatient, 
  loading,
  stat,
  statLoading
}) {
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
      title: "Today Customers",
      value: "10",
      color: ["bg-subMain", "text-subMain"],
      icon: BiTime,
    },
    {
      id: 2,
      title: "Monthly Customers",
      value: "230",
      color: ["bg-orange-500", "text-orange-500"],
      icon: BsCalendarMonth,
    },
    {
      id: 3,
      title: "Yearly Customers",
      value: "1,500",
      color: ["bg-green-500", "text-green-500"],
      icon: MdOutlineCalendarMonth,
    },
  ];
  useEffect(() => {
    fetchpatient();
  }, []);
  // preview
  const previewPayment = (id) => {
    navigate(`/patients/preview/${id}`);
  };

  return (
    <>
      <Layout>
        {/* add button */}
        {loading||statLoading ? (
          <div className="preloader">
            <LottieAnimation data={Loading2} />
          </div>
        ) : (
          <>
            <Link
              to="/patients/create"
              className="w-16 animate-bounce h-16 border border-border z-50 bg-subMain text-white rounded-full flex-colo fixed bottom-8 right-12 button-fb"
            >
              <BiPlus className="text-2xl" />
            </Link>
            <h1 className="text-xl font-semibold">Customers</h1>
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
                      Total Patients{" "}
                      <span className={box.color[1]}>{box.value}</span>{" "}
                      {box.title === "Today Customers"
                        ? "today"
                        : box.title === "Monthly Customers"
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
                  placeholder='Search "Customers"'
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
              <div className="mt-8 w-full overflow-x-auto">
                {/* {(patient?.length === 0)?(
                      <div className="empty-animate">
                            <LottieAnimation data={empty}/>
                            <p>No Data Found</p>
                      </div>
                  ):( */}
                <PatientTable
                  data={patient}
                  functions={{
                    preview: previewPayment,
                  }}
                  used={false}
                />
                {/* )} */}
              </div>
            </div>
          </>
        )}
      </Layout>
    </>
  );
}
const mapStoreToProps = (state) => {
  return {
    loading: state.patient.loading,
    patient: state.patient.data,
    stat: state?.statistics?.data,
    statLoading: state?.statistics?.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchpatient: () => dispatch(fetchpatient()),
    fetchstatistics: () => dispatch(fetchstatistics()),
  };
};
export default connect(mapStoreToProps, mapDispatchToProps)(Patients);
