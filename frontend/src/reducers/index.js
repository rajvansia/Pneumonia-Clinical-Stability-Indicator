import {combineReducers} from 'redux'
import patient from './patientReducer'

const rootRedeucer = combineReducers({
  patient,
})

export default rootRedeucer
