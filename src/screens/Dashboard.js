import React, { useEffect } from "react";
import Layout from "../Layout";
import {
  BsArrowDownLeft,
  BsArrowDownRight,
  BsArrowUpRight,
  BsCheckCircleFill,
  BsClockFill,
  BsXCircleFill,
} from "react-icons/bs";
import {
  TbCalendar,
  TbChartHistogram,
  TbFile,
  TbFileInvoice,
  TbLockAccess,
  TbUsers,
} from "react-icons/tb";
import { DashboardBigChart, DashboardSmallChart } from "../components/Charts";
import {
  appointmentsData,
  dashboardCards,
  memberData,
  transactionData,
} from "../components/Datas";
import { Transactiontable } from "../components/Tables";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchuser } from "../Redux/User/UserAction";
import Loading2 from "../images/loading2.json";
import LottieAnimation from "../Lotties";
import { fetchstatistics } from "../Redux/Statistics/StatisticsAction";
import { fetchpatient, singlefetchpatient } from "../Redux/Patients/PatientAction";

function Dashboard({ fetchuser, fetchstatistics,loading, profile, stat, statLoading, customerloading, customer, fetchpatient }) {
  useEffect(() => {
    fetchuser();
    fetchstatistics()
    fetchpatient()
  }, []);
  return (
    <>
      <Layout>
        {loading|| statLoading || customerloading ? (
          <div className="preloader">
            <LottieAnimation data={Loading2} />
          </div>
        ) : (
          <>
            {/* boxes */}
            <div className="w-full grid xl:grid-cols-4 gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
               <div
                  className="bg-white rounded-xl border-[1px] border-border p-5"
                >
                  <div className="flex gap-4 items-center">
                    <div
                      className={`w-10 h-10 flex-colo bg-opacity-10 rounded-md text-subMain bg-subMain`}
                    >
                      <TbUsers/>
                    </div>
                    <h2 className="text-sm font-medium">Total Customers</h2>
                  </div>
                    <div className="flex flex-col gap-4 col-span-3 mt-3">
                      <h4 className="text-md font-medium">
                        {stat?.total_customers}
                      </h4>
                      {/* <p className={`text-sm flex gap-2 ${card.color[1]}`}>
                        {card.percent > 50 && <BsArrowUpRight />}
                        {card.percent > 30 && card.percent < 50 && (
                          <BsArrowDownRight />
                        )}
                        {card.percent < 30 && <BsArrowDownLeft />}
                        {card.percent}%
                      </p> */}
                    </div>
                </div>
                <div
                  className=" bg-white rounded-xl border-[1px] border-border p-5"
                >
                  <div className="flex gap-4 items-center">
                    <div
                      className={`w-10 h-10 flex-colo bg-opacity-10 rounded-md text-subMain bg-subMain`}
                    >
                      <TbUsers/>
                    </div>
                    <h2 className="text-sm font-medium">Total Staffs</h2>
                  </div>
                    <div className="flex flex-col gap-4 col-span-3 mt-3">
                      <h4 className="text-md font-medium">
                        {stat?.total_receptionists}
                      </h4>
                      {/* <p className={`text-sm flex gap-2 ${card.color[1]}`}>
                        {card.percent > 50 && <BsArrowUpRight />}
                        {card.percent > 30 && card.percent < 50 && (
                          <BsArrowDownRight />
                        )}
                        {card.percent < 30 && <BsArrowDownLeft />}
                        {card.percent}%
                      </p> */}
                    </div>
                </div>
            </div>
            <div className="w-full my-6 grid xl:grid-cols-8 grid-cols-1 gap-6">
              <div className="xl:col-span-6  w-full">
                <div className="bg-white rounded-xl border-[1px] border-border p-5">
                  <div className="flex-btn gap-2">
                    <h2 className="text-sm font-medium">
                      Amount Paid - Amount Invoiced
                    </h2>
                    <p className="flex gap-4 text-sm items-center">
                      5.44%{" "}
                      <span className="py-1 px-2 bg-subMain text-white text-xs rounded-xl">
                        +2.4%
                      </span>
                    </p>
                  </div>
                  {/* Earning Reports */}
                  <div className="mt-4">
                    <DashboardBigChart />
                  </div>
                </div>
                {/* transaction */}
                <div className="mt-6 bg-white rounded-xl border-[1px] border-border p-5">
                  <div className="flex-btn gap-2">
                    <h2 className="text-sm font-medium">Recent Transaction</h2>
                    <p className="flex gap-4 text-sm items-center">
                      Today{" "}
                      <span className="py-1 px-2 bg-subMain text-white text-xs rounded-xl">
                        27000$
                      </span>
                    </p>
                  </div>
                  {/* table */}
                  <div className="mt-4 overflow-x-scroll">
                    <Transactiontable
                      data={transactionData.slice(0, 5)}
                      action={false}
                    />
                  </div>
                </div>
              </div>
              {/* side 2 */}
              <div
                data-aos="fade-left"
                data-aos-duration="1000"
                data-aos-delay="10"
                data-aos-offset="200"
                className="xl:col-span-2 xl:block grid sm:grid-cols-2 gap-6"
              >
                {/* recent patients */}
                <div className="bg-white rounded-xl border-[1px] border-border p-5">
                  <h2 className="text-sm font-medium">Recent Customers</h2>
                  {customer.slice(0, 8).map((data, index) => (
                    <div
                     
                      key={index}
                      className="flex-btn gap-4 mt-6 border-b pb-4 border-border"
                    >
                      <div className="flex gap-4 items-center">
                        <img
                          src={data.image}
                          alt="member"
                          className="w-10 h-10 rounded-md object-cover"
                        />
                        <div className="flex flex-col gap-1">
                          <h3 className="text-xs font-medium">
                            {data.first_name} {data.last_name}
                          </h3>
                          <p className="text-xs text-gray-400">
                            {data.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* today apointments */}
              </div>
            </div>
          </>
        )}
      </Layout>
    </>
  );
}
const mapStoreToProps = (state) => {
  console.log(state);
  return {
    loading: state?.profile?.loading,
    profile: state?.profile?.data,
    stat: state?.statistics?.data,
    statLoading: state?.statistics?.loading,
    customerloading: state.patient.loading,
    customer: state.patient.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchuser: () => dispatch(fetchuser()),
    fetchstatistics: () => dispatch(fetchstatistics()),
    fetchpatient: () => dispatch(fetchpatient()),
  };
};
export default connect(mapStoreToProps, mapDispatchToProps)(Dashboard);
