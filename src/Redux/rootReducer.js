import {combineReducers} from 'redux';
import {registerReducer, userReducer} from './Registration/RegisterReducer';
import authReducer from './Login/LoginReducer';
import { createpatientReducer, patientReducer, singlepatientReducer } from './Patients/PatientReducer';
import { createlaboratoryReducer, laboratoryReducer } from './Laboratory/LaboratoryReducer';
import { Profiler } from 'react';
import { profileReducer } from './User/UserReducer';


const rootReducer = combineReducers({
    register: registerReducer,
    user: userReducer,
    login: authReducer,
    patient: patientReducer,
    createpatient: createpatientReducer,
    singlepatient: singlepatientReducer,
    laboratory: laboratoryReducer,
    profile: profileReducer,
    createlab: createlaboratoryReducer
})

export default rootReducer;