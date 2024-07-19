import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Aos from "aos";
import AddEditOrgainisationModal from "./components/Modals/AddEditOrganisationModal";
import Toast from "./components/Notifications/Toast";
import Appointments from "./screens/Appointments";
import Campaings from "./screens/Campaings";
import CreateInvoice from "./screens/Invoices/CreateInvoice";
import CreatePatient from "./screens/Patients/CreatePatient";
import Customer from "./screens/Patients/Patients";
import Dashboard from "./screens/Dashboard";
import DoctorProfile from "./screens/Doctors/DoctorProfile";
import Doctors from "./screens/Doctors/Doctors";
import EditInvoice from "./screens/Invoices/EditInvoice";
import EditPayment from "./screens/Payments/EditPayment";
import Invoices from "./screens/Invoices/Invoices";
import LabResult from "./screens/Laboratory/LabResult";
import Laboratory from "./screens/Laboratory/Lab";
import LabTech from "./screens/Laboratory/LabTech";
import LandingPagePG from "./screens/InfoLandingPg";
import Login from "./screens/Login";
import Medicine from "./screens/Medicine";
import NewMedicalRecode from "./screens/Patients/NewMedicalRecode";
import NotFound from "./screens/NotFound";
import Onboarding from "./screens/Onboarding";
import Organisation from "./screens/Organisation";
import OrgRegistrationForm from "./screens/OrgRegistrationForm";
import PatientProfile from "./screens/Patients/PatientProfile";
import Payments from "./screens/Payments/Payments";
import PreviewInvoice from "./screens/Invoices/PreviewInvoice";
import PreviewPayment from "./screens/Payments/PreviewPayment";
import RegistrationForm from "./screens/RegistrationForm";
import Services from "./screens/Services";
import Profile from "./screens/Profile";
import SignUp from "./screens/SignUp";
import store from "./Redux/Store";

const App = () => {
  Aos.init();

  return (
    <>
      {/* Toaster */}
      <Toast />
      {/* Routes */}

      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<LandingPagePG />} />
            {/* <Route path="/" element={<Dashboard />} /> */}
            <Route
              path="/addorganisation"
              element={<AddEditOrgainisationModal />}
            />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/campaigns" element={<Campaings />} />
            <Route path="/customers" element={<Customer />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/preview/:id" element={<DoctorProfile />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/invoices/create" element={<CreateInvoice />} />
            <Route path="/invoices/edit/:id" element={<EditInvoice />} />
            <Route path="/invoices/preview/:id" element={<PreviewInvoice />} />
            <Route path="/laboratory" element={<Laboratory />} />
            <Route path="/labresult" element={<LabResult />} />
            <Route path="/labtech/:id" element={<LabTech />} />
            <Route path="/login" element={<Login />} />
            <Route path="/medicine" element={<Medicine />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/organisation" element={<Organisation />} />
            <Route
              path="/orgRegistrationForm"
              element={<OrgRegistrationForm />}
            />
            <Route path="/patients/create" element={<CreatePatient />} />
            <Route path="/patients/preview/:id" element={<PatientProfile />} />
            <Route
              path="/patients/visiting/:id"
              element={<NewMedicalRecode />}
            />
            <Route path="/payments" element={<Payments />} />
            <Route path="/payments/edit/:id" element={<EditPayment />} />
            <Route path="/payments/preview/:id" element={<PreviewPayment />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/registrationForm" element={<RegistrationForm />} />
            <Route path="/services" element={<Services />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </> 
  );
};

export default App;
