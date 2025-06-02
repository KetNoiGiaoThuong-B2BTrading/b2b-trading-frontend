'use client';

import { useEffect, useState } from 'react';
import api from '../../lib/axios';
import { API_ENDPOINTS } from '../../lib/apiConfig';

interface Brand {
    name: string;
    logo: string;
}

// Fallback data
const fallbackBrands: Brand[] = [
    { name: 'Sharp', logo: '/brands/sharp.png' },
    { name: 'Panasonic', logo: '/brands/panasonic.png' },
    { name: 'Huawei', logo: '/brands/huawei.png' },
    { name: 'Legrand', logo: '/brands/legrand.png' },
    { name: 'Sony', logo: '/brands/sony.png' },
    { name: 'Samsung', logo: '/brands/samsung.png' },
];
const BrandCarousel = () => {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const itemsPerSlide = 3;

    const totalSlides = Math.ceil(brands.length / itemsPerSlide);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const res = await api.get(API_ENDPOINTS.getAllBrands);
                console.log("Fetched brands raw response:", res.data);
                if (Array.isArray(res.data)) {
                setBrands(res.data);
                } else if (Array.isArray(res.data)) {
                    setBrands(res.data);
                } else {
                    console.warn("API không trả về mảng hợp lệ, dùng fallback");
                    setBrands(fallbackBrands);
                }
            } catch (error) {
                console.error('Error fetching brands:', error);
                setBrands(fallbackBrands); // fallback
            }
        };

        fetchBrands();
    }, []);

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
    };

    const getSlideItems = () => {
        const start = currentSlide * itemsPerSlide;
        return brands.slice(start, start + itemsPerSlide);
    };

    if (!brands.length) return null;

    return (
        <section className="py-6 px-20 bg-white">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold leading-tight text-neutral-950">Thương hiệu</h2>
                {/* <button className="flex gap-1 items-center my-auto text-base font-medium text-blue-600 transform transition-transform hover:translate-x-1 hover:underline">
                    <span>Xem tất cả</span>
                    <img src="arrowright.png" alt="Arrow right" className="w-4" />
                </button> */}
            </div>

            <div className="relative w-full max-w-5xl mx-auto">
                <button
                    onClick={handlePrev}
                    className="absolute -left-5 top-14 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 z-10 hover:bg-gray-100 transition"
                >
                    <svg className="w-5 h-5 text-gray-500 hover:text-gray-700 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <div className="flex justify-between items-center space-x-8 py-4 px-8">
                    {getSlideItems().map((brand, index) => (
                        <div key={index} className="flex-1 flex justify-center items-center group py-3 border border-gray-100 rounded-xl shadow-sm bg-gray-50 hover:bg-gray-100 transition-colors duration-300 rounded-lg">
                            <img src={brand.logo} alt={brand.name} className="h-14 transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:drop-shadow-md"/>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleNext}
                    className="absolute -right-5 top-14 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 z-10 hover:bg-gray-100 transition"
                >
                <svg className="w-5 h-5 text-gray-500 hover:text-gray-700 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                <div className="flex justify-center mt-4 space-x-2">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 w-2 rounded-full ${index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'}`}
                        ></div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandCarousel;
