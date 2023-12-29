import React from 'react';

const Properties = ({ properties }) => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Properties</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {properties?.map((property, index) => (
                    <div key={index} className="border rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold">{property.name}</h2>
                        <p>{property.headline}</p>
                        <p>{property.description}</p>
                        <p>{property.city}</p>
                        <p>{property.state}</p>
                        <p>{property.country}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Properties;
