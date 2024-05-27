import "./App.css";
import React, { useState } from "react";
import store from "./Redux/Store";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import Aos from "aos";
import LandingPagePG from "./screens/InfoLandingPg";
import RegistrationForm from "./screens/RegistrationForm";
import OrgRegistrationForm from "./screens/OrgRegistrationForm";
import Dashboard from "./screens/Dashboard";
import Toast from "./components/Notifications/Toast";
import Payments from "./screens/Payments/Payments";
import Appointments from "./screens/Appointments";
import Customer from "./screens/Patients/Patients";
import Campaings from "./screens/Campaings";
import Services from "./screens/Services";
import Invoices from "./screens/Invoices/Invoices";
import Settings from "./screens/Settings";
import CreateInvoice from "./screens/Invoices/CreateInvoice";
import EditInvoice from "./screens/Invoices/EditInvoice";
import PreviewInvoice from "./screens/Invoices/PreviewInvoice";
import EditPayment from "./screens/Payments/EditPayment";
import PreviewPayment from "./screens/Payments/PreviewPayment";
import Medicine from "./screens/Medicine";
import PatientProfile from "./screens/Patients/PatientProfile";
import CreatePatient from "./screens/Patients/CreatePatient";
import Doctors from "./screens/Doctors/Doctors";
import DoctorProfile from "./screens/Doctors/DoctorProfile";
import Onboarding from "./screens/Onboarding";
import NewMedicalRecode from "./screens/Patients/NewMedicalRecode";
import NotFound from "./screens/NotFound";
import Login from "./screens/Login";
import Organisation from "./screens/Organisation";
import Laboratory from "./screens/Laboratory/Lab";
import LabTech from "./screens/Laboratory/LabTech";
import LabResult from "./screens/Laboratory/LabResult";
import { Provider } from "react-redux";
import AddEditOrgainisationModal from "./components/Modals/AddEditOrganisationModal";

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

            <Route path="/dashboard" element={<Dashboard />} />
            {/* invoce */}
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/invoices/create" element={<CreateInvoice />} />
            <Route path="/invoices/edit/:id" element={<EditInvoice />} />
            <Route path="/invoices/preview/:id" element={<PreviewInvoice />} />
            {/* payments */}
            <Route path="/payments" element={<Payments />} />
            <Route path="/payments/edit/:id" element={<EditPayment />} />
            <Route path="/payments/preview/:id" element={<PreviewPayment />} />
            {/* patient */}
            <Route path="/customers" element={<Customer />} />
            <Route path="/organisation" element={<Organisation />} />
            <Route path="/laboratory" element={<Laboratory />} />
            <Route path="/labtech" element={<LabTech />} />
            <Route path="/labresult" element={<LabResult />} />
            <Route path="/patients/preview/:id" element={<PatientProfile />} />
            <Route path="/patients/create" element={<CreatePatient />} />
            <Route
              path="/patients/visiting/:id"
              element={<NewMedicalRecode />}
            />
            {/* doctors */}
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/preview/:id" element={<DoctorProfile />} />
            {/* reception */}
            <Route path="/onboarding" element={<Onboarding />} />
            {/* others */}
            <Route path="/login" element={<Login />} />
            <Route path="/registrationForm" element={<RegistrationForm />} />
            <Route
              path="/orgRegistrationForm"
              element={<OrgRegistrationForm />}
            />
            <Route
              path="/addorganisation"
              element={<AddEditOrgainisationModal />}
            />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/campaigns" element={<Campaings />} />
            <Route path="/medicine" element={<Medicine />} />
            <Route path="/services" element={<Services />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
