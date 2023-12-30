"use client"
import React, { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';

const Properties = ({ properties }) => {
    const [coords, setCoords] = useState(null);

    function getUserLocation() {
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

    useEffect(() => {
        getUserLocation();
    }, [])

    return (
        <div className="container mx-auto">
            <div className="flex flex-wrap">
                {properties.map((property, index) => (
                    <div key={index} className="w-full sm:w-1/2 md:w-1/4 p-4">
                        <PropertyCard property={property} coords={coords}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Properties;
