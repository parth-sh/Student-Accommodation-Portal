import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '@/api';

const UserCheck = () => {

    const router = useRouter();
    const [loginMethod, setLoginMethod] = useState("email");
    const [errorMessage, setErrorMessage] = useState('');

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phoneRegex = /^\d{10}$/;

    const validationSchema = Yup.object().shape({
        email: loginMethod === "email" ? Yup.string()
            .matches(emailRegex, 'Invalid email format')
            .required('Email is required') : Yup.string(),
        phone: loginMethod === "phone" ? Yup.string()
            .matches(phoneRegex, "Invalid phone number")
            .min(10, "Phone number must be at least 10 digits")
            .required("Phone number is required") : Yup.string(),
        country: loginMethod === "phone" ? Yup.string()
            .required("Country code is required") : Yup.string()
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        if (loginMethod === "email") {
            try {
                const data = await api.get('/api/users/find_by_email', { email: values.email });
                router.push('/login?email=' + values.email);
            } catch (error) {
                if (error.response && error.response.status === 500) {
                    setErrorMessage('An error occurred while processing your request.');
                } else if (error.response && error.response.status) {
                    setErrorMessage(error.response.data.errors.join(', '))
                    router.push('/signup?email=' + values.email);
                } else {
                    console.error(error)
                }
            } finally {
                setSubmitting(false);
            }
        } else if (loginMethod === "phone") {
            console.log(values)
            setSubmitting(false);
            setErrorMessage('An error occurred while processing your request.');
        }
    }

    useEffect(() => {
        let timer;
        if (errorMessage) {
            timer = setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
        return () => clearTimeout(timer); // Clear timeout on component unmount or when errorMessage changes
    }, [errorMessage]);

    return (
        <div className="rounded-lg shadow-md w-full">

            <div className="text-md font-semibold text-center py-3 border-b text-gray-400">
                Log in or sign up
            </div>

            <div className="text-center m-6">
                <h1 className="text-2xl font-semibold">Welcome to Uninest</h1>
            </div>

            <div className="p-8 pt-0">
                <Formik
                    initialValues={{ email: '', phone: '', country: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            {loginMethod === "phone" && (
                                <>
                                    <div className="mb-4">
                                        <Field as="select" name="country" className="form-select block w-full mt-1 rounded-md border-2 p-1">
                                            <option value="" defaultValue disabled>Country/Region</option>
                                            <option value="91">India (+91)</option>
                                        </Field>
                                        <ErrorMessage name="country" component="div" className="text-red-500 mt-1 text-xs" />
                                    </div>
                                    <div className="mb-4">
                                        <Field type="number" name="phone" placeholder="Phone number" className="form-input block w-full mt-1 rounded-md border-2 p-2" />
                                        <ErrorMessage name="phone" component="div" className="text-red-500 mt-1 text-xs" />
                                        <p className="text-xs text-gray-600 mt-2">
                                            We'll call or text you to confirm your number. Standard message and data rates apply. <a href="/privacy-policy" className="text-red-500">Privacy Policy</a>
                                        </p>
                                    </div>
                                </>
                            )}
                            {loginMethod === "email" && (
                                <div className="mb-4">
                                    <Field type="text" name="email" placeholder="Email" className="form-input block w-full mt-1 rounded-md border-2 p-2" />
                                    <ErrorMessage name="email" component="div" className="text-red-500 mt-1 text-xs" />
                                </div>
                            )}
                            <div className="mb-4">
                                <button type="submit" disabled={isSubmitting} className="btn w-full py-2 rounded-md airbnb-pink-gradient text-white font-bold">
                                    {isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : "Continue"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>

                <div className="flex items-center justify-between mb-4">
                    <hr className="w-full" /> <span className="p-2 text-gray-400">or</span>
                    <hr className="w-full" />
                </div>

                {
                    loginMethod !== "email" && (
                        <button
                            className="btn w-full py-2 rounded-md border-2 border-black flex items-center justify-center gap-2 mb-4"
                            onClick={() => { setLoginMethod("email"); setErrorMessage('') }}
                            aria-label="Continue with Email"
                        >
                            <i className="fas fa-envelope"></i> Continue with Email
                        </button>
                    )
                }
                {
                    loginMethod !== "phone" && (
                        <button
                            className="btn w-full py-2 rounded-md border-2 border-black flex items-center justify-center gap-2 mb-4"
                            onClick={() => { setLoginMethod("phone"); setErrorMessage('') }}
                            aria-label="Continue with Phone"
                        >
                            <i className="fas fa-phone"></i> Continue with Phone
                        </button>
                    )
                }

                {
                    <button
                        className="btn w-full py-2 rounded-md border-2 border-black flex items-center justify-center gap-2"
                        onClick={() => { setLoginMethod("google"); setErrorMessage('') }}
                        aria-label="Continue with Google"
                    >
                        <i className="fa-brands fa-google"></i> Continue with Google
                    </button>
                }
            </div>

            {errorMessage && <div role="alert" className="alert rounded-none alert-error flex justify-center mt-2" onClick={() => setErrorMessage('')} >
                <span className="text-sm">{errorMessage}</span>
            </div>}
        </div>
    );
}

export default UserCheck;