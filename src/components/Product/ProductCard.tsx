'use client';

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useCart } from '../../context/CardContext';

interface ProductCardProps {
    product: {
        id: number;
        name: string;
        price: number;
        oldPrice: number;
        brand: string;
        partNo: string;
        image: string;
        parameters: string[];
        bulbType?: string;
        wattage?: number;
        lumens?: number;
        maxBulbPower?: number;
        beamHeight?: number;
        beamWidth?: number;
        material?: string;
        inStock: boolean;
        delivery?: string;
        category: string;
        rating: number;
        discount: number;
        company: string;
        companyId: number;
    };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cart, addToCart } = useCart();
    const [showAddedMessage, setShowAddedMessage] = useState(false);

    if (!product || product.discount === undefined) {
        console.warn("ProductCard received invalid product:", product);
        return null;
    }
    
    const isAlreadyInCart = cart.some((item) => item.partNo === product.partNo);

    const handleUpdateCart = () => {
        if (!product.inStock) return;

        const quantity = Number(
        (document.querySelector(`#qty-${product.partNo}`) as HTMLInputElement | null)?.value || 1
        );

        const cartItem = {
        image: product.image,
        name: product.name,
        price: product.price,
        partNo: product.partNo,
        quantity,
        company: product.company,
        };

        addToCart(cartItem);
        setShowAddedMessage(true);
        setTimeout(() => setShowAddedMessage(false), 3000);
    };

    const handleCardClick = () => {
        navigate(`/products/${product.id}${location.search}`);
    };
    
    const handleContactCompany = () => {
        navigate(`/companies/${product.companyId}`);
    };

    return (
        <article className="w-full text-base leading-7 group hover:shadow-md transition-shadow duration-300">
        <div className="pb-4 bg-white rounded-xl border border-solid border-[#F6F8FB] overflow-hidden"
            onClick={handleCardClick}>
            {/* Image section */}
            <div className="relative w-full h-40 bg-gray-50">
            {product.discount && (
                <div className="absolute top-2 left-2 z-10 px-2 py-1 font-semibold text-white text-sm bg-orange-500 rounded">
                {product.discount}%
                </div>
            )}

            <img
                src={product.image}
                alt={product.name}
                className="object-contain absolute inset-0 w-full h-full rounded-t-lg transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-90"
            />

            {product.inStock ? (
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
            <div className="flex flex-col justify-between px-4 pt-3 pb-4 flex-1 text-[15px]">
            <div>
                <p className="text-sm text-zinc-500">{product.brand} | Part No. {product.partNo}</p>

                <h3 className="text-lg font-semibold text-neutral-950 w-full line-clamp-2 min-h-[56px]">
                {product.name}
                </h3>

                <p className="text-sm text-blue-700">Company: {product.company}</p>

                {product.parameters?.map((param, index) => (
                <p key={index} className="text-sm text-neutral-700 mt-1">{param}</p>
                ))}

                <div className="mt-3 text-sm">
                <span className="text-sm text-blue-600">your price:</span>{' '}
                <span className="font-bold text-xl text-blue-600">{product.price}.000đ</span>{' '}
                {product.oldPrice && (
                    <span className="text-sm text-orange-500 line-through ml-1">{product.oldPrice}.000đ</span>
                )}
                </div>
            </div>

            <div className="mt-5">
                <div className="flex gap-2 items-center mt-2 w-full">
                <input
                    id={`qty-${product.partNo}`}
                    type="number"
                    defaultValue={1}
                    min={1}
                    className="w-30 px-3 py-2 text-center border border-gray-300 rounded text-sm"
                />
                <select className="px-3 py-2 border border-gray-300 rounded text-sm w-full">
                    <option value="item">Item</option>
                </select>
                </div>

                <button
                onClick={(e) => {
                    e.stopPropagation();
                    handleContactCompany();
                }}
                className="w-full px-4 py-2 mt-3 text-sm font-medium text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50"
                >
                Liên hệ
                </button>

                <button
                onClick={handleUpdateCart}
                disabled={!product.inStock}
                className={`w-full px-4 py-3 mt-2 text-sm font-medium text-white rounded-full ${
                    product.inStock ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                }`}
                >
                {isAlreadyInCart ? 'Cập nhật' : 'Thêm vào giỏ'}
                </button>
            </div>
            </div>
        </div>

        {showAddedMessage && (
            <div className="flex gap-2 justify-center px-6 py-2 text-blue-600 bg-sky-100 mt-3 rounded">
            <img src="/products/added.png" alt="Success" className="w-4 h-4" />
            <p className="text-blue-600 text-sm">Đã thêm vào giỏ</p>
            </div>
        )}
        </article>
    );
};

export default ProductCard;
