import styles from './LogInForm.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { Email, Lock } from '@mui/icons-material';
import { useAuth } from '../../context/authContext';
import ClipLoader from "react-spinners/ClipLoader";
import GoogleLogin from 'react-google-login';
import { style } from '@mui/system';


const LoginForm = ({ setForm }) => {


    const { logIn, fetchLoading, logInGoogle } = useAuth()

    const newClientSchema = Yup.object().shape({
        email: Yup.string()
            .email('Must be a valid email')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required.')
    })

    //HANDLER GOOGLE
    const handleLogin = async googleData => logInGoogle({ token: googleData.tokenId })

    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            onSubmit={async (values, { resetForm }) => {
                await logIn(values)
                resetForm()
            }}
            validationSchema={newClientSchema}
        >
            {({ errors, touched, isSubmitting, isValid, dirty }) => {
                return (
                    <div className={styles.formContainer}>
                        <h1>Login</h1>
                        <Form className={styles.form}>
                            <div className={styles.containerInput}>
                                <Email />
                                <Field
                                    placeholder="Email*"
                                    type="email"
                                    name="email"
                                    className={errors.email && touched.email ? styles.inputError : ''}
                                />
                            </div>
                            <ErrorMessage name="email" component="div" className={styles.error} />

                            <div className={styles.containerInput}>
                                <Lock />
                                <Field
                                    placeholder="Password*"
                                    type="password"
                                    name="password"
                                    className={errors.password && touched.password ? styles.inputError : ''}
                                />
                            </div>
                            <ErrorMessage name="password" component="div" className={styles.error} />
                            <span onClick={() => setForm('forgot')}>Forgot password?</span>

                            <button type="submit" disabled={isSubmitting || !(isValid && dirty)}>
                                {fetchLoading ?
                                    <ClipLoader loading={fetchLoading} size={30} />
                                    : 'Login'}
                            </button>
                        </Form>
                        <span>Or sing up using</span>

                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_ID}
                            render={renderProps => (
                                <button onClick={renderProps.onClick} className={styles.google}>G</button>
                            )}
                            onSuccess={handleLogin}
                            onFailure={handleLogin}
                            cookiePolicy={'single_host_origin'}
                        />

                        <span onClick={() => setForm('register')}>Don't have an account already? Register!</span>
                    </div>

                )
            }}
        </Formik>
    )
}

export default LoginForm