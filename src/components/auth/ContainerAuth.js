import styles from './ContainerAuth.module.css'
import ForgotForm from './ForgotForm'
import LogInForm from './LogInForm'
import { Navigate } from 'react-router-dom'
import RegisterForm from './RegisterForm'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import BounceLoader from "react-spinners/BounceLoader";
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../../context/authContext'

const ContainerAuth = () => {

  const [form, setForm] = useState('login')

  const { isLoggedIn, isLoadingFirst } = useAuth()

  if (isLoadingFirst) return
  <div className={styles.containerLoading}>
    <BounceLoader loading={isLoadingFirst} size={250} />
  </div>

  return (
    <>
      {!isLoggedIn ?

        <div className={styles.containerAuth}>
          {form === 'register' && <RegisterForm setForm={setForm} />}
          {form === 'login' && <LogInForm setForm={setForm} />}
          {form === 'forgot' && <ForgotForm setForm={setForm} />}
          <ToastContainer />
        </div>
        :
        <Navigate to='/' />}
    </>
  )
}

export default ContainerAuth