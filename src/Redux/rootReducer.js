import {combineReducers} from 'redux';
import {registerReducer, userReducer} from './Registration/RegisterReducer';
import authReducer from './Login/LoginReducer';
import { createpatientReducer, patientReducer, singlepatientReducer } from './Patients/PatientReducer';
import { antibioticsReducer, createantibioticsReducer, createinvestigationReducer, createlaboratoryReducer, laboratoryReducer, singlelaboratoryReducer } from './Laboratory/LaboratoryReducer';
import { Profiler } from 'react';
import { createusersReducer, profileReducer, usersReducer } from './User/UserReducer';
import { createserviceReducer, serviceReducer, singleserviceReducer } from './Service/ServiceReducer';
import { statisticsReducer } from './Statistics/StatisticsReducer';
import { createinvoiceReducer, invoiceserviceReducer } from './Invoice/invoiceReducer';


const rootReducer = combineReducers({
    register: registerReducer,
    user: userReducer,
    login: authReducer,
    patient: patientReducer,
    createpatient: createpatientReducer,
    singlepatient: singlepatientReducer,
    laboratory: laboratoryReducer,
    profile: profileReducer,
    createlab: createlaboratoryReducer,
    createinv: createinvestigationReducer, 
    onboardedusers: usersReducer,
    services: serviceReducer,
    createservice: createserviceReducer,
    singleservice: singleserviceReducer,
    createuser: createusersReducer,
    singlelabrequest: singlelaboratoryReducer,
    antibiotics: antibioticsReducer,
    createantibiotics: createantibioticsReducer,
    statistics: statisticsReducer,
    createinvoice: createinvoiceReducer,
    invoiceService: invoiceserviceReducer
})

export default rootReducer;