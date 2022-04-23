import authContext from "./authContext";
import authReducer from "./authReducer";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from 'use-http'



const AuthState = ({ children }) => {

    const [loadingUser, setLoadingUser] = useState(true)

    const initialState = {
        userName: null,
        isLoggedIn: false
    }
    const [state, dispatch] = useReducer(authReducer, initialState)

    //FETCH CONFIGURATION
    const options = { cachePolicy: 'no-cache', headers: { 'Authorization': localStorage.getItem('token') } }
    const { get, post, response, loading, error } = useFetch(`${process.env.url}`, options)

    const userRegister = async data => {

    }

    const logIn = async data => {

    }

    const logInGoogle = async token => {

    }

    const userAuth = async () => {
    }

    const updateUser = (user) => {

    }

    const logOut = () => {
    }

    return (
        <authContext.Provider
            value={{
                userName: state.userName,
                isLoggedIn: state.isLoggedIn,
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
