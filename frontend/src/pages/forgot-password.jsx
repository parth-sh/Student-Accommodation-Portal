"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import '@/styles/globals.css'
import api from '@/api';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string().min(6, 'Password is too short').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
});

const ForgotPasswordPage = () => {
    const router = useRouter();
    const { email, token } = router.query;  // Get the token from the query parameters
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            if (token) {
                // This is the reset password flow
                const response = await api.put('/auth/password_reset', {
                    password: values.password,
                    password_confirmation: values.confirmPassword,
                    token,
                });
                alert(response.message)
                router.push('/login');
            } else {
                // This is the forgot password flow
                const response = await api.post('/auth/password_reset', {
                    email: values.email,
                });
                alert(response.message)
                router.push("/")
            }
        } catch (error) {
            if (error.response && error.response.status === 500) {
                setErrorMessage('An error occurred while processing your request.');
            } else if (error.response && error.response.status) {
                setErrorMessage(error.response.data.errors.join(', '))
            } else {
                console.error(error)
            }
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        let timer;
        if (errorMessage) {
            timer = setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [errorMessage]);

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="max-w-sm w-full border rounded-lg shadow-md mb-0">
                    <div className='p-6'>
                        <div className="text-md font-semibold text-center py-3 border-b text-gray-400">
                            {token ? "Reset Password" : "Forgot Password"}
                        </div>
                        <div className="text-center m-6">
                            <h1 className="text-2xl font-semibold">{token ? "Set Your New Password" : "Reset Your Password"}</h1>
                        </div>
                        <Formik
                            initialValues={{ email: email || '', password: '', confirmPassword: '' }}
                            enableReinitialize={true}
                            validationSchema={token ? ResetPasswordSchema : ForgotPasswordSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    {!token && (
                                        <div className="mb-4">
                                            <Field name="email" type="email" placeholder="Enter your email" className="form-input block w-full mt-1 rounded-md border-2 p-2" />
                                            <ErrorMessage name="email" component="div" className="text-red-500 mt-1 text-xs" />
                                        </div>
                                    )}
                                    {token && (
                                        <>
                                            <div className="mb-4">
                                                <Field name="password" type="password" placeholder="New Password" className="form-input block w-full mt-1 rounded-md border-2 p-2" />
                                                <ErrorMessage name="password" component="div" className="text-red-500 mt-1 text-xs" />
                                            </div>
                                            <div className="mb-4">
                                                <Field name="confirmPassword" type="password" placeholder="Confirm New Password" className="form-input block w-full mt-1 rounded-md border-2 p-2" />
                                                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 mt-1 text-xs" />
                                            </div>
                                        </>
                                    )}
                                    <button type="submit" disabled={isSubmitting} className="btn w-full py-2 rounded-md airbnb-pink-gradient text-white font-bold">
                                        {isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : (token ? "Reset Password" : "Send Reset Link")}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    {errorMessage && <div role="alert" className="alert rounded-lg rounded-t-none alert-error flex justify-center mt-2" onClick={() => setErrorMessage('')} >
                        <span className="text-sm">{errorMessage}</span>
                    </div>}
                </div>
            </div>
        </>
    );
};

export default ForgotPasswordPage;
