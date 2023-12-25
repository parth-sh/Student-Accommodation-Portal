"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import '@/styles/globals.css'
import api from '@/api';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const UpdatePasswordSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Current Password is required'),
    newPassword: Yup.string().min(6, 'New Password is too short').required('New Password is required'),
    confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm New Password is required'),
});

const UpdatePasswordPage = () => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const data = await api.put('/auth/password', {
                user: {
                    password_challenge: values.currentPassword,
                    password: values.newPassword,
                    password_confirmation: values.confirmNewPassword
                }
            });
            alert(data.message);
            router.replace('/')
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
                            Update Password
                        </div>
                        <div className="text-center m-6">
                            <h1 className="text-2xl font-semibold">Secure Your Account</h1>
                        </div>
                        <Formik
                            initialValues={{ currentPassword: '', newPassword: '', confirmNewPassword: '' }}
                            validationSchema={UpdatePasswordSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className="mb-4">
                                        <Field name="currentPassword" type="password" placeholder="Current Password" className="form-input block w-full mt-1 rounded-md border-2 p-2" />
                                        <ErrorMessage name="currentPassword" component="div" className="text-red-500 mt-1 text-xs" />
                                    </div>
                                    <div className="mb-4">
                                        <Field name="newPassword" type="password" placeholder="New Password" className="form-input block w-full mt-1 rounded-md border-2 p-2" />
                                        <ErrorMessage name="newPassword" component="div" className="text-red-500 mt-1 text-xs" />
                                    </div>
                                    <div className="mb-4">
                                        <Field name="confirmNewPassword" type="password" placeholder="Confirm New Password" className="form-input block w-full mt-1 rounded-md border-2 p-2" />
                                        <ErrorMessage name="confirmNewPassword" component="div" className="text-red-500 mt-1 text-xs" />
                                    </div>
                                    <button type="submit" disabled={isSubmitting} className="btn w-full py-2 rounded-md airbnb-pink-gradient text-white font-bold">
                                        {isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : "Update Password"}
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

export default UpdatePasswordPage;
