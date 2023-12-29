import React from 'react';
import PropertyCard from './PropertyCard';

const Properties = ({ properties }) => {
    return (
        <div className="container mx-auto">
            <div className="flex flex-wrap">
                {properties.map((property, index) => (
                    <div key={index} className="w-full sm:w-1/2 md:w-1/4 p-4">
                        <PropertyCard property={property} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Properties;
