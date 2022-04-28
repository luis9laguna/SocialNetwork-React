import styles from './RegisterForm.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { Email, ErrorSharp, Lock, LockClock, People, Person } from '@mui/icons-material';
import { useAuth } from '../../context/authContext';
import ClipLoader from "react-spinners/ClipLoader";


const RegisterForm = ({ setForm }) => {


  const { userRegister, fetchLoading } = useAuth()


  const newClientSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Name is too short.')
      .max(30, 'Name is too long.')
      .required('Name is required.'),
    lastname: Yup.string()
      .min(3, 'LastName is too short.')
      .max(30, 'Name is too long.')
      .required('LastName is required.'),
    email: Yup.string()
      .email('Must be a valid email')
      .max(30, 'Email is too long')
      .required('Email is required'),
    password: Yup.string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "The password must have 8 characters, 1 upper, 1 lower and 1 numerical.")
      .required('Password is required.'),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required.'),
    acceptTerms: Yup.bool()
      .oneOf([true], 'Accept Terms & Conditions is required')

  })

  return (
    <Formik
      initialValues={{
        name: '',
        lastname: '',
        email: '',
        password: '',
        confirmpassword: '',
        acceptTerms: false
      }}
      onSubmit={async (values, { resetForm }) => {
        await userRegister(values)
        resetForm()
      }}
      validationSchema={newClientSchema}
    >
      {({ errors, touched, isSubmitting, isValid, dirty }) => {
        return (
          <div className={styles.formContainer}>
            <h1>Register</h1>
            <Form className={styles.form}>
              <div>
                <div className={styles.containerInput}>
                  <Person />
                  <Field
                    placeholder="Name*"
                    type="text"
                    name="name"
                    className={errors.name && touched.name ? styles.inputError : ''}
                  />
                </div>
                <ErrorMessage name="name" component="div" className={styles.error} />
              </div>
              <div>
                <div className={styles.containerInput}>
                  <People />
                  <Field
                    placeholder="LastName*"
                    type="text"
                    name="lastname"
                    className={errors.lastname && touched.lastname ? styles.inputError : ''}
                  />
                </div>
                <ErrorMessage name="lastname" component="div" className={styles.error} />
              </div>
              <div>
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

              </div>
              <div>
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
              </div>
              <div>
                <div className={styles.containerInput}>
                  <LockClock />
                  <Field
                    placeholder="Confirm Password*"
                    type="password"
                    name="confirmpassword"
                    className={errors.confirmpassword && touched.confirmpassword ? styles.inputError : ''}
                  />
                </div>
                <ErrorMessage name="confirmpassword" component="div" className={styles.error} />
              </div>

              <div>
                <div className={styles.acceptTerms}>
                  <label htmlFor="acceptTerms" className="form-check-label">Accept Terms & Conditions
                    <Field type="checkbox" id="acceptTerms" name="acceptTerms" />
                  </label>
                </div>
                <ErrorMessage name="acceptTerms" component="div" className={styles.error} />
              </div>

              <button type="submit" disabled={isSubmitting || !(isValid && dirty)}>
                {fetchLoading ?
                  <ClipLoader loading={fetchLoading} size={30} />
                  : 'Register'}
              </button>
            </Form>
            <span onClick={() => setForm('login')}>Do you have an account? LogIn!</span>
          </div>
        )
      }}
    </Formik>
  )
}

export default RegisterForm