import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Search, ChevronDown } from 'lucide-react';

import AdvertisingBox from "../../components/HomePage/AdvertisingBox";
import { ArticlesSection } from "../../components/HomePage/ArticlesSection";
import BrandCarousel from "../../components/HomePage/BrandCarousel";
import CategoriesSection from "../../components/HomePage/CategoriesSection";
import DeliverySection from "../../components/HomePage/DeliverySection";
import EventsSection from "../../components/HomePage/EventsSection";
import RecommendedProducts from "../../components/Product/RecommendedProducts";

const HomePage = () => {
    const navigate = useNavigate();

    const [keyword, setKeyword] = useState('');
    const [searchType, setSearchType] = useState('product');
    const handleSearch = () => {
        if (keyword.trim()) {
        navigate(`/${searchType}s?search=${encodeURIComponent(keyword.trim())}`);
        }
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSearch();
    };

    const getSearchPlaceholder = () => {
        return searchType === 'product' ? 'Tìm kiếm sản phẩm' : 'Tìm kiếm công ty';
    };

    const images = ['/home/i1.jfif', '/home/i2.jfif', '/home/i3.jfif', '/home/i4.jfif', '/home/i5.jfif', '/home/i6.jfif', '/home/i7.jfif', '/home/i8.jfif'];
    const [bgIndex, setBgIndex] = useState(0);

    useEffect(() => {
    const interval = setInterval(() => {
        setBgIndex((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
            {/* Hero + Search */}
            <div className="relative pt-16 pb-20">
                {/* Background */}
                <div className="absolute inset-0 w-full h-full z-0">
                <img
                    src={images[bgIndex]}
                    alt="Hero Background"
                    className="w-full h-full object-cover opacity-80 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-black opacity-40" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-white">
                    <div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-6">
                        Kết nối doanh nghiệp <br/> Mở rộng cơ hội hợp tác
                    </h1>
                    <p className="text-xl md:text-xl text-gray-200 mb-12 leading-relaxed">
                        Nền tảng B2B hỗ trợ doanh nghiệp dễ dàng tìm kiếm đối tác, mở rộng thị trường,
                        quảng bá sản phẩm và thúc đẩy giao thương hiệu quả.
                    </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:gap-6">
                    <div className="flex flex-col gap-2">
                    <h3 className="text-base font-semibold">Dành cho người mua</h3>
                    <button className="px-6 py-3 bg-white text-black rounded-full font-medium shadow">
                        Tìm sản phẩm phù hợp
                    </button>
                    </div>
                    <div className="flex flex-col gap-2">
                    <h3 className="text-base font-semibold">Dành cho doanh nghiệp</h3>
                    <div className="flex flex-col sm:flex-row sm:gap-4">
                        <button className="px-6 py-3 border text-white rounded-full font-medium">
                        Tìm đối tác kinh doanh
                        </button>
                        <button className="px-6 py-3 border text-white rounded-full font-medium">
                        Quảng bá sản phẩm
                        </button>
                    </div>
                    </div>
                </div>

                {/* Search Section */}
                <div className="mt-8 bg-white rounded-2xl shadow-2xl px-4 py-3 text-gray-900">
                    <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative w-full md:w-auto">
                    <select
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                        className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 pr-8"
                    >
                        <option value="product">Sản phẩm</option>
                        <option value="company">Công ty</option>
                    </select>

                    {/* ChevronDown icon */}
                    <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <ChevronDown className="w-4 h-4" />
                    </div>
                    </div>
                    <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                        type="text"
                        placeholder={getSearchPlaceholder()}
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium"
                    >
                        Tìm kiếm
                    </button>
                    </div>
                </div>
                </div>
            </div>

            <CategoriesSection />
            <BrandCarousel />
            <AdvertisingBox title="-20%" description="on power tools" buttonText="Check offer" />
            <RecommendedProducts />
            <ArticlesSection />
            <DeliverySection />
            <EventsSection />
        </div>
    );
};

export default HomePage;
