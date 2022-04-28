import authContext from "./authContext";
import authReducer from "./authReducer";
import { useEffect, useReducer } from "react";
import useFetch from 'use-http'
import { toast } from "react-toastify"



const AuthState = ({ children }) => {


    const initialState = {
        userName: null,
        userImage: null,
        isLoggedIn: false,
        isLoading: true
    }
    const [state, dispatch] = useReducer(authReducer, initialState)

    //FETCH CONFIGURATION
    const token = localStorage.getItem('token')
    const options = { cachePolicy: 'no-cache', headers: { 'Authorization': token } }
    const { get, post, response, loading } = useFetch(`${process.env.REACT_APP_URL}`, options)

    const userRegister = async data => {
        await post('user', data)
        if (response.ok) {
            dispatch({
                type: 'FORM_AUTH',
                payload: {
                    user: {
                        name: response.data.user.name,
                        image: response.data.user.image
                    },
                    token: response.data.token
                }
            })
            toast.success('User Register')
        } else {
            toast.error(response.data.message)
        }
    }

    const logIn = async data => {
        await post('auth/login', data)
        if (response.ok) {
            dispatch({
                type: 'FORM_AUTH',
                payload: {
                    user: {
                        name: response.data.user.name,
                        image: response.data.user.image
                    },
                    token: response.data.token
                }
            })
            toast.success('User Logged')
        } else {
            toast.error(response.data.message)
        }
    }

    const logInGoogle = async token => {
        await post('auth/google', token)
        if (response.ok) {
            dispatch({
                type: 'FORM_AUTH',
                payload: {
                    user: {
                        name: response.data.user.name,
                        image: response.data.user.image
                    },
                    token: response.data.token
                }
            })
            toast.success('User Logged')
        } else {
            toast.error(response.data.message)
        }
    }

    const userAuth = async () => {
        if (!token) {
            dispatch({ type: 'NO_TOKEN' })
            return
        }
        const resp = await get('/user')
        if (response.ok) {
            dispatch({
                type: 'USER_AUTH',
                payload: {
                    name: response.data.user.name,
                    image: response.data.user.image
                },
            })
        } else if (resp.message === 'Token Invalid') {
            localStorage.removeItem('token')
        }
    }

    const updateUser = (user) => {

    }

    const logOut = () => {
        dispatch({
            type: 'LOG_OUT'
        })
    }

    useEffect(() => { userAuth() }, [])
    return (
        <authContext.Provider
            value={{
                userName: state.userName,
                userImage: state.userImage,
                isLoggedIn: state.isLoggedIn,
                isLoading: state.isLoading,
                fetchLoading: loading,
                userRegister,
                logIn,
                logInGoogle,
                userAuth,
                updateUser,
                logOut
            }}>
            {children}
        </authContext.Provider>
    )
}

export default AuthState
