const citiesReducer = (state={allCities:[], filteredCities:[], oneCity:[],}, action) => {
    switch(action.type){
        case "GET_ALL_CITIES":
            return {
                ...state,
                allCities: action.payload,
                filteredCities: action.payload
                
            }
        case "FILTER_CITIES": 
            return {
                ...state, 
                filteredCities: state.allCities.filter((city) => (city.city.toLowerCase().startsWith(action.payload.toLowerCase().trim()))),
            }

        case "GET_ONE_CITY":
            return {
                ...state, 
                oneCity: state.allCities.find((city) => city._id === action.payload)
            }
        default: 
            return (
                state
            )
    }

}

export default citiesReducer