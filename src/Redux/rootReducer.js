import {combineReducers} from 'redux';
import {registerReducer, userReducer} from './Registration/RegisterReducer';
import authReducer from './Login/LoginReducer';
import { createpatientReducer, patientReducer, singlepatientReducer } from './Patients/PatientReducer';
import { antibioticsReducer, createantibioticsReducer, createlaboratoryReducer, laboratoryReducer, singlelaboratoryReducer } from './Laboratory/LaboratoryReducer';
import { Profiler } from 'react';
import { createusersReducer, profileReducer, usersReducer } from './User/UserReducer';
import { createserviceReducer, serviceReducer, singleserviceReducer } from './Service/ServiceReducer';


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
    onboardedusers: usersReducer,
    services: serviceReducer,
    createservice: createserviceReducer,
    singleservice: singleserviceReducer,
    createuser: createusersReducer,
    singlelabrequest: singlelaboratoryReducer,
    antibiotics: antibioticsReducer,
    createantibiotics: createantibioticsReducer
})

export default rootReducer;