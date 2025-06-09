'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useCart } from '../../context/CardContext';
import api from '../../lib/axios';
import { API_ENDPOINTS } from '../../lib/apiConfig';

interface CompanyData {
    companyID: number;
    companyName: string;
    taxCode: string;
    businessSector: string;
    address: string;
    representative: string;
    email: string;
    phoneNumber: string;
    verificationStatus: string;
    imageCompany: string;
  }
  
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
interface CartItem {
    productID: number;
    productName: string;
    unitPrice: number;
    stockQuantity: number;
    status: string;
    createdDate: string;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cart, addToCart } = useCart();
    const [showAddedMessage, setShowAddedMessage] = useState(false);

    if (!product) {
        console.warn('ProductCard received invalid product:', product);
        return null;
    }

    const isAlreadyInCart = cart.some((item: CartItem) => item.productID === product.productID);

    const [companyName, setCompanyName] = useState<string>('Đang tải...');

    useEffect(() => {
    const fetchCompanyName = async () => {
        try {
        const res = await api.get(API_ENDPOINTS.getCompanyProfileById(product.companyID));
        const data: CompanyData = res.data;
        setCompanyName(data.companyName);
        } catch (err) {
        console.error('Không thể lấy tên công ty:', err);
        setCompanyName('Không xác định');
        }
    };

    if (product.companyID) {
        fetchCompanyName();
    }
    }, [product.companyID]);

    const handleUpdateCart = () => {
        if (product.status === 'Out of stock') return;

        const cartItem = {
            productID: product.productID,
            productName: product.productName,
            unitPrice: product.unitPrice,
            stockQuantity: product.stockQuantity,
            status: product.status,
            createdDate: product.createdDate,
        };

        addToCart(cartItem);
        setShowAddedMessage(true);
        setTimeout(() => setShowAddedMessage(false), 3000);
    };

    const handleCardClick = () => {
        navigate(`/products/${product.productID}${location.search}`);
    };

    const handleContactCompany = () => {
        navigate(`/companies/${product.productID}`);
    };

    return (
        <article className="w-full text-base leading-7 group hover:shadow-md transition-shadow duration-300">
            <div
                className="pb-4 bg-white rounded-xl border border-solid border-[#F6F8FB] overflow-hidden"
                onClick={handleCardClick}
            >
                {/* Image section */}
                <div className="relative w-full h-40 bg-gray-50">
                    <img
                        src={product.image}
                        alt={product.productName}
                        className="object-contain absolute inset-0 w-full h-full rounded-t-lg transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-90"
                    />

                    {product.status === 'Available' ? (
                        <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1 px-3 py-1 text-sm text-green-700 bg-white/70 backdrop-blur-sm rounded">
                            <img src="/products/instock.png" alt="In stock" className="w-4 h-4" />
                            <p>Còn hàng</p>
                        </div>
                    ) : (
                        <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1 px-3 py-1 text-sm text-red-600 bg-white/70 backdrop-blur-sm rounded">
                            <img src="/products/outstock.png" alt="Out of stock" className="w-4 h-4" />
                            <p>Hết hàng</p>
                        </div>
                    )}
                </div>

                {/* Content section */}
                <div className="flex flex-col justify-between px-4 flex-1 text-[15px]">
                    <div>
                    <span className="text-sm text-gray-600">{companyName}</span>
                        <h3 className="text-lg font-semibold text-neutral-950 w-full line-clamp-2">
                            {product.productName}
                        </h3>
                        
                        <div className="mt-3 text-sm">
                            <span className="text-red-600">Giá:</span>{' '}
                            <span className="font-bold text-xl text-red-600">
                                {product.unitPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                            </span>
                        </div>
                    </div>

                    <div className="mt-5">
                        <div className="flex gap-2 items-center mt-2 w-full">
                            <input
                                id={`qty-${product.productID}`}
                                type="number"
                                defaultValue={1}
                                min={1}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }} 
                                className="w-30 px-3 py-2 text-center border border-gray-300 rounded text-sm"
                            />
                            <select
                                onClick={(e) => {
                                    e.stopPropagation();
                                }} 
                                className="px-3 py-2 border border-gray-300 rounded text-sm w-full"
                            >
                                <option value="item">Item</option>
                            </select>
                        </div>

                        <div className="flex gap-2 mt-4 w-full">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleContactCompany();
                                }}
                                className="w-1/2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50"
                            >
                                Liên hệ
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdateCart();
                                }}
                                disabled={product.status === 'Out of stock'}
                                className={`w-1/2 px-4 py-2 text-sm font-medium text-white rounded-full 
                    ${product.status === 'Available' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                            >
                                {isAlreadyInCart ? 'Cập nhật' : 'Thêm vào giỏ'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showAddedMessage && (
                <div className="flex gap-2 justify-center px-6 py-2 text-blue-600 bg-sky-100 rounded">
                    <img src="/products/added.png" alt="Success" className="w-4 h-4" />
                    <p className="text-blue-600 text-sm">Đã thêm vào giỏ</p>
                </div>
            )}
        </article>
    );
};

export default ProductCard;
