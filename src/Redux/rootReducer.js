import {combineReducers} from 'redux';
import {registerReducer, userReducer} from './Registration/RegisterReducer';
import authReducer from './Login/LoginReducer';
import { createpatientReducer, patientReducer, singlepatientReducer } from './Patients/PatientReducer';


const rootReducer = combineReducers({
    register: registerReducer,
    user: userReducer,
    login: authReducer,
    patient: patientReducer,
    createpatient: createpatientReducer,
    singlepatient: singlepatientReducer,
})

export default rootReducer;