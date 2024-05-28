import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import Layout from "../../Layout";
import PersonalInfo from "../../components/UsedComp/PersonalInfo";
import { fetchuser } from "../../Redux/User/UserAction";
import { connect } from "react-redux";

function CreatePatient({fetchuser, loading, profile}) {
  useEffect(()=>{
    fetchuser()
  },[])
  return (
    <Layout>
      <div className="flex items-center gap-4">
        <Link
          to="/customers"
          className="bg-white border border-subMain border-dashed rounded-lg py-3 px-4 text-md"
        >
          <IoArrowBackOutline />
        </Link>
        <h1 className="text-xl font-semibold">Create Customer</h1>
      </div>
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="100"
        data-aos-offset="200"
        className="bg-white my-8 rounded-xl border-[1px] border-border p-6"
      >
        <PersonalInfo titles={false} data={profile.organisation} />
      </div>
    </Layout>
  );
}
const mapStoreToProps = (state) => {
  console.log(state)
  return {    
    loading: state?.profile?.loading, 
    profile: state?.profile?.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchuser: () => dispatch(fetchuser()),
  };
};
export default connect(mapStoreToProps, mapDispatchToProps)(CreatePatient);
