import axios from "axios" 

const itinerariesActions = {
    getItineraryByCity: (cityId) => {
        return async (dispatch, getState) => {
            try {
                let response = await axios.get(`https://gillone-mytinerary.herokuapp.com/api/itineraries/${cityId}`)
                let data = response.data.response
                dispatch({type: "GET_ITINERARY_BY_CITYID", payload: data})
                return {success: true}
            } catch (error){
                return {
                    success: false, response: error
                }
            }
        }
    },

    addComment: (itineraryId, comment, token) => {
        return async () => {
            try {
                let response = await axios.put(`https://gillone-mytinerary.herokuapp.com/api/comments/${itineraryId}`, {comment, type: "addComment"},
                {headers: {
                    Authorization: "Bearer "+token
                    }
                })
                if (response.data.success) {
                    return {
                        success: true, response: response.data.response
                    }
                } else {
                    throw new Error()
                }     
            } catch (error) {
                return {
                    success: false, response: error
                }
            }
        }
    },

    deleteComment: (itineraryId, commentId, token) => {
        return async (dispatch) => {
            try {
                let response = await axios.put(`https://gillone-mytinerary.herokuapp.com/api/comments/${itineraryId}`, {commentId, type: "deleteComment"},
                {headers: {
                    Authorization: "Bearer "+token
                    }
                })
                if (response.data.success) {
                    return {
                        success: true
                    }
                } else {
                    throw new Error()
                }
            } catch (error) {
                return {
                    success: false, response: error
                }
            }
        }
    }, 

    editComment: (commentId, comment, token) => {
        return async () => {
            try {
                let response = await axios.put(`https://gillone-mytinerary.herokuapp.com/api/comments/${commentId}`, { comment, type: "editComment"},
                {headers: {
                    Authorization: "Bearer "+token
                    }
                })
                if (response.data.success) {
                    return {
                        success: true, response: response.data.response
                    }
                } else {
                    throw new Error()
                }
            } catch (error) {
                return {
                    success: false,response: error
                }
            }
        }    
    }, 

    likeDislike: (itineraryId, token) => {
        return async () => {
            try {
                let response = await axios.put(`https://gillone-mytinerary.herokuapp.com/api/itinerary/like/${itineraryId}`, {},
                {headers: {
                    Authorization: "Bearer "+token
                    }
                })
                return response
                
            }catch (error) {
                console.log(error)
            }
        }
    }
} 

export default itinerariesActions