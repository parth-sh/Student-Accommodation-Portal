// pages/profile.js
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '@/styles/globals.css';
import { useRouter } from 'next/router';
import api from '@/api';

const ProfileSchema = Yup.object().shape({
    address_1: Yup.string().required('Address Line 1 is required'),
    // address_2: Yup.string(),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zip_code: Yup.string().required('Zip code is required'),
    country: Yup.string().required('Country is required'),
});

const ProfilePage = () => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const [initialValues, setInitialValues] = useState({
        address_1: '',
        address_2: '',
        city: '',
        state: '',
        zip_code: '',
        country: '',
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await api.get('/api/profile');
                setInitialValues(profile);
            } catch (error) {
                alert('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await api.put('/api/profile', {
                profile: { ...values }
            });
            router.push('/');
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

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="max-w-sm w-full border rounded-lg shadow-md mb-0">
                <div className='p-6'>
                    <div className="text-md font-semibold text-center py-3 border-b text-gray-400">
                        Update Profile
                    </div>
                    <div className="text-center m-6">
                        <h1 className="text-2xl font-semibold">Your Details</h1>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize
                        validationSchema={ProfileSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="mb-4">
                                    <Field name="address_1" type="text" placeholder="Address Line 1" className="form-input block w-full mt-1 rounded-md border-2 p-2" />
                                    <ErrorMessage name="address_1" component="div" className="text-red-500 mt-1 text-xs" />
                                </div>
                                <div className="mb-4">
                                    <Field name="address_2" type="text" placeholder="Address Line 2" className="form-input block w-full mt-1 rounded-md border-2 p-2" />
                                    <ErrorMessage name="address_2" component="div" className="text-red-500 mt-1 text-xs" />
                                </div>
                                <div className="mb-4">
                                    <Field name="city" type="text" placeholder="City" className="form-input block w-full mt-1 rounded-md border-2 p-2" />
                                    <ErrorMessage name="city" component="div" className="text-red-500 mt-1 text-xs" />
                                </div>
                                <div className="mb-4">
                                    <Field name="state" type="text" placeholder="State" className="form-input block w-full mt-1 rounded-md border-2 p-2" />
                                    <ErrorMessage name="state" component="div" className="text-red-500 mt-1 text-xs" />
                                </div>
                                <div className="mb-4">
                                    <Field name="zip_code" type="text" placeholder="Zip Code" className="form-input block w-full mt-1 rounded-md border-2 p-2" />
                                    <ErrorMessage name="zip_code" component="div" className="text-red-500 mt-1 text-xs" />
                                </div>
                                <div className="mb-4">
                                    <Field name="country" type="text" placeholder="Country" className="form-input block w-full mt-1 rounded-md border-2 p-2" />
                                    <ErrorMessage name="country" component="div" className="text-red-500 mt-1 text-xs" />
                                </div>
                                <button type="submit" disabled={isSubmitting} className="btn w-full py-2 rounded-md airbnb-pink-gradient text-white font-bold">
                                    {isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : 'Update Profile'}
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
    );
};

export default ProfilePage;
