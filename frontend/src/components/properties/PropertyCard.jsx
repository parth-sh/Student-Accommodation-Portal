const PropertyCard = ({ property }) => {
    return (
        <div className="cursor-pointer">
            <img
                className="w-full rounded-lg aspect-square"
                src={property.imageUrl}
                alt={property.title}
            />
            <div className="">
                <p className="text-gray-900 text-sm"> {property.city} {property.state}, {property.country}</p>
                <p className="text-gray-400 text-sm">7,992 kilometres away</p>
                <p className="text-gray-400 text-sm">8-13 Mar{property.dateRange}</p>
                <p className="text-gray-700 text-sm">$100 night</p>
                {/* <h2 className="text-xl font-semibold">{property.name}</h2>
                <p>{property.headline}</p>
                <p>{property.description}</p>
                <p>{property.city}</p>
                <p>{property.state}</p>
                <p>{property.country}</p> */}
            </div>
            {/* <div className="px-6 pt-4 pb-2">
                {property.isFavourite && <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Guest favourite</span>}
                {property.rating && <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">★ {property.rating}</span>}
            </div> */}
        </div>
    );
};

export default PropertyCard;