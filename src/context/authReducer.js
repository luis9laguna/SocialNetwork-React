export default (state, action) => {
    switch (action.type) {

        case 'FORM_AUTH':
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                userName: action.payload.user.name,
                userImage: action.payload.user.image,
                isLoggedIn: true
            }

        case 'USER_AUTH':
            return {
                ...state,
                userName: action.payload.name,
                userImage: action.payload.image,
                isLoggedIn: true,
                isLoading: false

            }
        case 'NO_TOKEN':
            return {
                ...state,
                isLoading: false
            }
        case 'UPDATE_USER':
            return {
                ...state,
                userImage: action.payload.user.image,
                userName: action.payload.user.name
            }

        case 'LOG_OUT':
            localStorage.removeItem('token')
            return {
                ...state,
                userImage: null,
                userName: null,
                isLoggedIn: false
            }


        default:
            return { ...state };
    }
}