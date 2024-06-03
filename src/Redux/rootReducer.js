import {combineReducers} from 'redux';
import {registerReducer, userReducer} from './Registration/RegisterReducer';
import authReducer from './Login/LoginReducer';
import { createpatientReducer, patientReducer, singlepatientReducer } from './Patients/PatientReducer';
import { createlaboratoryReducer, laboratoryReducer } from './Laboratory/LaboratoryReducer';
import { Profiler } from 'react';
import { profileReducer } from './User/UserReducer';
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
    onboardedusers: userReducer,
    services: serviceReducer,
    createservice: createserviceReducer,
    singleservice: singleserviceReducer
})

export default rootReducer;