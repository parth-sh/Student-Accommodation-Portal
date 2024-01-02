import { convertDistance, getDistance } from "geolib";
import FavoriteIcon from "./FavoriteIcon";
import { useState } from "react";

const PropertyCard = ({ property, coords }) => {

    const [isFavorite, setIsFavorite] = useState(false);

    function measureDistance() {
        if (coords === null) return <span className="loading loading-dots loading-xs"></span>
        let distance = getDistance(coords, { latitude: property.latitude, longitude: property.longitude });
        distance = Math.round(convertDistance(distance, 'km'));
        distance += " kilometers away";
        return (distance);
    }

    return (
        <div className="cursor-pointer relative">
            <img
                className="w-full rounded-lg aspect-square object-cover"
                src={"data:image/jpeg;base64," + property.default_image}
                alt={property.title}
            />
            <button className="absolute top-2 right-2" onClick={() => setIsFavorite(!isFavorite)} >
                <FavoriteIcon liked={isFavorite}/>
            </button>
            <div className="pt-1">
                <p className="text-gray-900 text-sm"> {property.city} {property.state}, {property.country}</p>
                <p className="text-sm font-bold"><i className="fas fa-star"></i> {parseFloat(property.average_rating).toFixed(1)}</p>
                <p className="text-gray-400 text-sm">{measureDistance()}</p>
                <p className="text-gray-400 text-sm">8-13 Mar</p>
                <p className="text-gray-700 text-sm"><span className="font-bold">{property.formatted_price}</span> night</p>
            </div>
        </div>
    );
};

export default PropertyCard;