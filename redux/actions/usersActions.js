import axios from "axios" 
import AsyncStorage from '@react-native-async-storage/async-storage'

const usersActions = {
    signUp: (newUser) => {
        return async (dispatch, getState) => {
            let response = await axios.post("https://gillone-mytinerary.herokuapp.com/api/user/signUp", {...newUser})
            if (response.data.success){
                await AsyncStorage.setItem('token', response.data.response.token)
                await AsyncStorage.setItem('firstName', response.data.response.firstName)
                await AsyncStorage.setItem('src', response.data.response.src)
                await AsyncStorage.setItem('_id', response.data.response._id)
                dispatch({type: "LOGGED", payload: response.data.response})
            }
           return response 
        }
    },
    
    logUser: (logUser) => {
        return async (dispatch, getState) => {
            let response = await axios.post("https://gillone-mytinerary.herokuapp.com/api/user/logIn", {...logUser})
            if (response.data.success){
                await AsyncStorage.setItem('token', response.data.response.token)
                await AsyncStorage.setItem('firstName', response.data.response.firstName)
                await AsyncStorage.setItem('src', response.data.response.src)
                await AsyncStorage.setItem('_id', response.data.response._id)
                dispatch({type: "LOGGED", payload: response.data.response})   
            }
            return response
        }
    },

    logOut: () => {
        return async (dispatch, getState) => {
            await AsyncStorage.clear()
            dispatch({type: "LOG_OUT"})
        }
    },

    logInAsyncStorage: (token) => {
        return async (dispatch, getState) => {
            try {
                let response = await axios.get("https://gillone-mytinerary.herokuapp.com/api/tokenVerification", {
                headers: {
                    Authorization: "Bearer "+token
                }
                
                 })
                dispatch({type: "LOGGED", payload: {token, firstName: response.data.firstName, src: response.data.src, _id: response.data._id}})
            } catch (error) {
                return dispatch ({type: "LOG_OUT"})
            } 
        }
    },
           
}

export default usersActions