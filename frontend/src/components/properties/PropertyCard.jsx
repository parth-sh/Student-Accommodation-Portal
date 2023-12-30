import { convertDistance, getDistance } from "geolib";

const PropertyCard = ({ property, coords }) => {

    function measureDistance() {
        if (coords === null) return <span className="loading loading-dots loading-xs"></span>
        let distance = getDistance(coords, { latitude: property.latitude, longitude: property.longitude });
        distance = Math.round(convertDistance(distance, 'km'));
        distance += " kilometers away";
        return (distance);
    }

    return (
        <div className="cursor-pointer">
            <img
                className="w-full rounded-lg aspect-square"
                src={"data:image/jpeg;base64," + property.default_image}
                alt={property.title}
            />
            <div className="">
                <p className="text-gray-900 text-sm"> {property.city} {property.state}, {property.country}</p>
                <p className="text-gray-400 text-sm">{measureDistance()}</p>
                <p className="text-gray-400 text-sm">8-13 Mar</p>
                <p className="text-gray-700 text-sm"><span className="font-bold">{property.formatted_price}</span> night</p>
            </div>
        </div>
    );
};

export default PropertyCard;