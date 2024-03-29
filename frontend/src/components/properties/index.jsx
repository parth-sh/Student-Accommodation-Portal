"use client"
import React, { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';
import api from '@/api';
import { is_logged_in, set_user_profile } from '@/components/authUtils';

const Properties = ({ properties }) => {
    const [coords, setCoords] = useState(null);
    const [favourite_properties, setFavouriteProperties] = useState([]);

    async function getUserLocation() {
        try {
            const profile = await api.get('/api/profile');
            set_user_profile(profile);
            if (profile.latitude && profile.longitude) {
                setCoords({ latitude: profile.latitude, longitude: profile.longitude });
            } else {
                throw new Error();
            }
        } catch (error) {
            // https://stackoverflow.com/a/28331217/9229695
            var successHandler = function (position) {
                setCoords({ latitude: position.coords.latitude, longitude: position.coords.longitude });
            };
            var errorHandler = function (errorObj) {
                setCoords(null);
                alert(errorObj.code + ": " + errorObj.message);
            };
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    successHandler, errorHandler,
                    { enableHighAccuracy: true, maximumAge: 10000 });
            } else {
                alert("Geolocation is not supported by this browser.")
            }
        }
    }

    const getUserFavouriteProperties = async () => {
        try {
            const data = await api.get('/api/users/favourite_properties');
            setFavouriteProperties(data);
        } catch (error) {
            setFavouriteProperties([]);
        }
    }

    useEffect(() => {
        if (is_logged_in()) {
            getUserLocation();
            getUserFavouriteProperties();
        }
    }, [])

    return (
        <div className="container mx-auto mt-2">
            <div className="flex flex-wrap">
                {properties.map((property, index) => (
                    <div key={index} className="w-full sm:w-1/2 md:w-1/4 p-4">
                        <PropertyCard property={property}
                            coords={coords}
                            fv={favourite_properties.includes(property.id)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Properties;
