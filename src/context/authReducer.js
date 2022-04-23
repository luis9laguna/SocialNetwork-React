export default (state, action) => {
    switch (action.type) {

        case 'FORM_AUTH':
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                userName: action.payload.user,
                isLoggedIn: true
            }

        case 'USER_AUTH':
            return {
                ...state,
                userName: action.payload.user,
                isLoggedIn: true

            }
        case 'UPDATE_USER':
            return {
                ...state,
                userName: action.payload
            }

        case 'LOG_OUT':
            localStorage.removeItem('token')
            return {
                ...state,
                userName: null,
                isLoggedIn: false
            }


        default:
            return { ...state };
    }
}