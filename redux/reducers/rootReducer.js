import {combineReducers} from "redux"
import citiesReducer from "./citiesReducers"
import itinerariesReducers from "./itinerariesReducers"
import usersReducers from "./usersReducers"

const rootReducer = combineReducers ({
    cities: citiesReducer,
    users: usersReducers,
    itineraries: itinerariesReducers
})

export default rootReducer