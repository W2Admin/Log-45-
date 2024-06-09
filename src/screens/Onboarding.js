import React, { useEffect } from "react";
import { MdOutlineCloudDownload } from "react-icons/md";
import { toast } from "react-hot-toast";
import { BiPlus } from "react-icons/bi";
import Layout from "../Layout";
import { Button } from "../components/Form";
import { DoctorsTable } from "../components/Tables";
import AddDoctorModal from "../components/Modals/AddDoctorModal";
import { onboardingData } from "../components/Datas";
import { connect } from "react-redux";
import { allfetchuser } from "../Redux/User/UserAction";
import LottieAnimation from "../Lotties";
import Loading2 from "../images/loading2.json"
function Onboarding({fetchuser,loading,users}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [data, setData] = React.useState({});

  const onCloseModal = () => {
    setIsOpen(false);
    setData({});
  };

  const preview = (data) => {
    setIsOpen(true);
    setData(data);
  };
  useEffect(()=>{
    fetchuser()
  },[])
  return (
    <Layout>
      { loading ? (
          <div className="preloader">
            <LottieAnimation data={Loading2}/>
          </div>
        ) : (
          <>
            {
              // add doctor modal
              isOpen && (
                <AddDoctorModal
                  closeModal={onCloseModal}
                  isOpen={isOpen}
                  doctor={false}
                  datas={data}
                />
              )
            }
            {/* add button */}
            <button
              onClick={() => setIsOpen(true)}
              className="w-16 animate-bounce h-16 border border-border z-50 bg-subMain text-white rounded-full flex-colo fixed bottom-8 right-12 button-fb"
            >
              <BiPlus className="text-2xl" />
            </button>
            {/*  */}
            <h1 className="text-xl font-semibold">Onboarding</h1>
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="100"
              data-aos-offset="200"
              className="bg-white my-8 rounded-xl border-[1px] border-border p-5"
            >
              {/* datas */}

              <div className="grid md:grid-cols-6 sm:grid-cols-2 grid-cols-1 gap-2">
                <div className="md:col-span-5 grid lg:grid-cols-4 items-center gap-6">
                  <input
                    type="text"
                    placeholder='Search "Amina Mwakio"'
                    className="h-14 w-full text-sm text-main rounded-md bg-dry border border-border px-4"
                  />
                </div>

                {/* export */}
                <Button
                  label="Export"
                  Icon={MdOutlineCloudDownload}
                  onClick={() => {
                    toast.error("Exporting is not available yet");
                  }}
                />
              </div>
              <div className="mt-8 w-full overflow-x-scroll">
                <DoctorsTable
                  doctor={false}
                  data={users}
                  functions={{
                    preview: preview,
                  }}
                />
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
    loading: state?.onboardedusers?.loading, 
    users: state?.onboardedusers?.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchuser: () => dispatch(allfetchuser()),
  };
};
export default connect(mapStoreToProps, mapDispatchToProps)(Onboarding);
