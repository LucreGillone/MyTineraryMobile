const itinerariesReducers = (state={cityItineraries:[]}, action) => {
    switch(action.type){
        case "GET_ITINERARY_BY_CITYID": 
            return {
                ...state,
                cityItineraries: action.payload
            }
        default: 
            return (
                state
            )    
    }
}

export default itinerariesReducers