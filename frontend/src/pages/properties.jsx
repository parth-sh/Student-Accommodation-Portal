import React from 'react';
import '@/styles/globals.css';

export default function Properties() {
    const mainImage = "https://a0.muscache.com/im/pictures/prohost-api/Hosting-859181655926714279/original/37f1f7b4-d9a7-46c1-bdb6-1cd9b244c1b7.jpeg?im_w=1200";
    const otherImages = [
        "https://a0.muscache.com/im/pictures/prohost-api/Hosting-859181655926714279/original/b0e55bb0-ad7b-417f-b679-b79582077cba.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/prohost-api/Hosting-859181655926714279/original/2ca502fa-3d20-4203-9be2-e2251e9c5c89.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/prohost-api/Hosting-859181655926714279/original/18001df3-4020-47f6-b006-8abe48049324.jpeg?im_w=1200",
        "https://a0.muscache.com/im/pictures/prohost-api/Hosting-859181655926714279/original/b7bd4290-c0c1-43ca-bf2c-13a587e655f4.jpeg?im_w=720"
    ];

    return (
        <div className="max-w-6xl mx-auto p-5">
            <div className="mb-4 pt-4 pb-4">
                <h1 className="text-2xl font-bold">Eternia 3 Bedroom Villa near Reis Magos</h1>
            </div>

            <div className="flex flex-row flex-wrap mb-4">
                <div className="w-full md:w-1/2 md:pr-1">
                    <img src={mainImage} alt="Main" className="w-full object-cover rounded-md" style={{ height: '26.3rem' }} />
                </div>
                <div className="w-full md:w-1/2 grid grid-cols-2 gap-1 mt-1 md:mt-0">
                    {otherImages.map((url, index) => (
                        <img key={index} src={url} alt={`Interior ${index}`} className="w-full object-cover rounded-md" style={{ height: '13rem' }} />
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                    <div className="text-xl font-bold mb-2">Entire villa in Reis Magos, India</div>
                    <div className="mb-2">6 guests · 3 bedrooms · 3 beds · 3 bathrooms</div>
                    <div className="mb-4">⭐ No reviews yet</div>

                    <hr class="my-4 border-gray-300" />

                    <div className="flex items-center mb-4">
                        <div className="flex-shrink-0 mr-3">
                            <img className="w-10 h-10 rounded-full" src="path-to-host-image.jpg" alt="Host" />
                        </div>
                        <div>
                            <div className="font-semibold">Hosted by Jassin</div>
                            <div className="text-sm">10 years hosting</div>
                        </div>
                    </div>

                    <hr class="my-4 border-gray-300" />

                    <div className="mb-4">
                        <div className="font-semibold mb-1">Dive right in</div>
                        <div>This is one of the few places in the area with a pool.</div>
                    </div>

                    <div className="mb-4">
                        <div className="font-semibold mb-1">Experienced host</div>
                        <div>Jassin has 78 reviews for other places.</div>
                    </div>

                    <hr class="my-4 border-gray-300" />

                    <p>
                        Welcome to Eternia, a beautiful 3-bedroom villa in Reis Magos with a private pool.
                        Our villa features modern amenities such as a fully equipped kitchen, satellite TV, air conditioning, and free Wi-Fi.
                        Enjoy the outdoor pool and garden or relax in the living room. Pets are welcome upon request,
                        and staff follows all safety protocols for a worry-free stay. Nearby attractions include the Reis Magos Fort, Coco Beach,
                        and Aguada Fort. Leisure activities include water sports, casinos, and shopping...
                    </p>

                </div>
                <div className="bg-white p-4 shadow rounded-lg col-span-1 aspect-square">
                    <div className="text-lg font-semibold">₹46,292/night</div>
                    <div className="mt-2">
                        <label htmlFor="check-in" className="text-sm">Check-in</label>
                        <input type="date" id="check-in" className="w-full mt-1 p-2 border rounded" />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="check-out" className="text-sm">Check-out</label>
                        <input type="date" id="check-out" className="w-full mt-1 p-2 border rounded" />
                    </div>
                    <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-4 hover:bg-blue-600">Reserve</button>
                </div>
            </div>
        </div>
    );
}
