import styles from './ForgotForm.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { Email } from '@mui/icons-material';
import useFetch from 'use-http';
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify"



const ForgotForm = ({ setForm }) => {

    //FETCH CONFIGURATION
    const { post, response, loading } = useFetch(`${process.env.REACT_APP_URL}`)

    const newClientSchema = Yup.object().shape({
        email: Yup.string()
            .email('Must be a valid email')
            .required('Email is required')
    })

    return (
        <Formik
            initialValues={{
                email: '',
            }}
            onSubmit={async (values, { resetForm }) => {
                await post('auth/password-reset', values)
                if (response.ok) {
                    toast.success('Check your email to continue')
                } else {
                    toast.error(response.data.message)
                }
                resetForm()
            }}
            validationSchema={newClientSchema}
        >
            {({ errors, touched, isSubmitting, isValid, dirty }) => {
                return (
                    <div className={styles.formContainer}>
                        <h1>Forgot Email</h1>
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

                            <button type="submit" disabled={isSubmitting || !(isValid && dirty)}>
                                {loading ?
                                    <ClipLoader loading={loading} size={30} />
                                    : 'Sent Email'}
                            </button>
                        </Form>
                        <button onClick={() => setForm('login')}>Back</button>
                    </div>
                )
            }}
        </Formik>
    )
}

export default ForgotForm