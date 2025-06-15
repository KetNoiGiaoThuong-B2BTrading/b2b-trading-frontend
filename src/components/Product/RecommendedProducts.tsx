'use client';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ProductCard from './ProductCard';
import api from '../../lib/axios';
import { API_ENDPOINTS } from '../../lib/apiConfig';

interface Product {
    productID: number;
    image: string;
    productName: string;
    description: string;
    unitPrice: number;
    stockQuantity: number;
    status: string;
    createdDate: string;
    companyID: number;
}

const fallbackProducts: Product[] = [
    {
        productID: 1,
        image: 'https://placehold.co/150x150',
        productName: 'Điện thoại ABC Model X',
        description: '...',
        unitPrice: 7500000,
        stockQuantity: 100,
        status: 'Available',
        createdDate: '2021-01-01',
        companyID: 1,
    },
    {
        productID: 2,
        image: 'https://placehold.co/150x150',
        productName: 'Điện thoại ABC Model X',
        description: '...',
        unitPrice: 7500000,
        stockQuantity: 100,
        status: 'Available',
        createdDate: '2021-01-01',
        companyID: 2,
    },
    {
        productID: 3,
        image: 'https://placehold.co/150x150',
        productName: 'Điện thoại ABC Model X',
        description: '...',
        unitPrice: 7500000,
        stockQuantity: 100,
        status: 'Available',
        createdDate: '2021-01-01',
        companyID: 3,
    },
    {
        productID: 4,
        image: 'https://placehold.co/150x150',
        productName: 'Điện thoại ABC Model X',
        description: '...',
        unitPrice: 7500000,
        stockQuantity: 100,
        status: 'Available',
        createdDate: '2021-01-01',
        companyID: 1,
    },
    {
        productID: 5,
        image: 'https://placehold.co/150x150',
        productName: 'Điện thoại ABC Model X',
        description: '...',
        unitPrice: 7500000,
        stockQuantity: 100,
        status: 'Available',
        createdDate: '2021-01-01',
        companyID: 2,
    },
];
const RecommendedProducts: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>(fallbackProducts);
    const [loading, setLoading] = useState(false);
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await api.get(API_ENDPOINTS.getAllProductsForBusiness);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts(fallbackProducts);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return <div className="text-center mt-10 text-gray-600">Loading ...</div>;
    }

    return (
        <section className="py-6 px-15 bg-white">
            <div className="flex justify-between w-full mb-8">
                <h2 className="text-3xl font-bold leading-tight text-neutral-950">Sản phẩm</h2>
                <button
                    onClick={() => navigate('/products')}
                    className="flex gap-1 items-center text-base font-medium text-blue-600 transform transition-transform hover:translate-x-1 hover:underline"
                >
                    <span>Xem tất cả sản phẩm</span>
                    <img src="arrowright.png" alt="Arrow right" className="w-4" />
                </button>
            </div>

            <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.isArray(products) &&
                        products.map((product, index) => <ProductCard key={index} product={product} />)}
                </div>
            </div>
        </section>
    );
};
export default RecommendedProducts;
