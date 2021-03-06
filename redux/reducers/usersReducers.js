const usersReducers = (state= {token: null, firstName: null, src: null, _id: null}, action) => {
    switch(action.type){
        case "LOGGED":
            return {
                token: action.payload.token, 
                firstName: action.payload.firstName,
                src: action.payload.src,
                _id: action.payload._id
            }
        case "LOG_OUT": 
        return {
            token: null,
            firstName: null, 
            src: null,
            _id: null,
        }
    default: 
    return (
        state
    )
    }
}

export default usersReducers