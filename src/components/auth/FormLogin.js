import { useFetch } from 'use-http';
import styles from './FormLogin.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { Email, Lock, LockClock, People, Person } from '@mui/icons-material';


const FormLogin = () => {

  // const { post, response, loading, error } = useFetch(`${process.env.URL}`)


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

  const handleSubmit = async (values) => {

    console.log(values)
    // await post()
    // navigate('/')
  }
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
        await handleSubmit(values)

        // resetForm()
      }}
      validationSchema={newClientSchema}
    >
      {({ errors, touched, isSubmitting, isValid, dirty }) => {
        return (
          <Form className={styles.formContainer}>
            <h1>Register</h1>
            <div>
              <div className={styles.containerInput}>
                <Person />
                <Field
                  placeholder="Name*"
                  type="text"
                  name="name"
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
                />
              </div>
              <ErrorMessage name="confirmpassword" component="div" className={styles.error} />
            </div>

            <div>
              <div className={styles.acceptTerms}>
                <label htmlFor="acceptTerms" className="form-check-label">Accept Terms & Conditions</label>
                <Field type="checkbox" name="acceptTerms" />
              </div>
              <ErrorMessage name="acceptTerms" component="div" className={styles.error} />
            </div>

            <div>
              <span>Do you have an account?</span>
              <br />
              <span>Log In</span>
            </div>

            <div>
              <button type="submit" disabled={isSubmitting || !(isValid && dirty)}>
                Register
              </button>
            </div>

            <div>

            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default FormLogin