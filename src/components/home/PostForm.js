import styles from './PostForm.module.css'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import useFetch from 'use-http';
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify"
import Upload from './Upload';
import { useState } from 'react';



const PostForm = ({ userImage }) => {

    const [images, setImages] = useState([]);


    //FETCH CONFIGURATION
    const options = { headers: { 'Authorization': localStorage.getItem('token') } }
    const { post, response, loading } = useFetch(`${process.env.REACT_APP_URL}`, options)


    const newClientSchema = Yup.object().shape({
        text: Yup.string()
            .required('Text is required')
    })

    return (
        <Formik
            initialValues={{
                text: '',
            }}
            onSubmit={async (values, { resetForm }) => {
                values = { ...values, images }
                await post('post', values)
                if (response.ok) {
                    toast.success('Your post has been created succesfully')
                } else {
                    toast.error(response.data.message)
                }
                resetForm()
            }}
            validationSchema={newClientSchema}
        >
            {({ isSubmitting }) => {
                return (
                    <Form className={styles.inputContainer}>
                        <div className={styles.imageInput}>
                            <img src={userImage} />
                            <Field
                                placeholder="What are you thinking right now?*"
                                type="text"
                                name="text"
                            />
                        </div>
                        <div className={styles.postOptions}>
                            <Upload setImages={setImages} images={images} />
                            <button type="submit" disabled={isSubmitting}>
                                {loading ?
                                    <ClipLoader color='white' loading={loading} size={25} />
                                    : 'Post'}
                            </button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default PostForm