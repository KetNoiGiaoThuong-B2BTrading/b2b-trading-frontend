import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import api from '../../lib/axios';
import { API_ENDPOINTS } from '../../lib/apiConfig';

interface Product {
    id: number;
    image: string;
    discount: number;
    brand: string;
    partNo: string;
    name: string;
    parameters: string[];
    price: number;
    oldPrice: number;
    inStock: boolean;
    isAddedToCart?: boolean;
    company: string;
    companyId: number;
    category: string;
    rating: number;
}

interface RelatedProductsProps {
    title: string;
}

const fallbackProducts: Product[] = [
    {
        id: 1,
        image: '/products/product-1.png',
        discount: 30,
        brand: 'Omnires',
        partNo: '2123532',
        name: 'Connection with a handle Omnires round',
        parameters: ['Material of execution: brass', "Manufacturer's color: chrome", 'Guarantee: 5 years'],
        price: 45,
        oldPrice: 55,
        inStock: true,
        company: 'Omnires Ltd.',
        companyId: 101,
        category: 'Bathroom',
        rating: 4.6
    },
    {
        id: 2,
        image: '/products/product-2.png',
        discount: 15,
        brand: 'GoodHome',
        partNo: '234565',
        name: 'Countertop washbasin GoodHome Tekapo',
        parameters: ['Basin width : 45 cm', 'Basin height: 12 cm', 'Basin depth: 35 cm'],
        price: 51,
        oldPrice: 64,
        inStock: true,
        company: 'GoodHome',
        companyId: 102,
        category: 'Bathroom',
        rating: 4.8
    },
    {
        id: 3,
        image: '/products/product-3.png',
        discount: 15,
        brand: 'GoodHome',
        partNo: '234565',
        name: 'Perforated Simpson tape 25 x 2500 x 2 mm',
        parameters: ['Width: 45 cm', 'Height: 12 cm', 'Depth: 35 cm'],
        price: 51,
        oldPrice: 64,
        inStock: true,
        isAddedToCart: true,
        company: 'GoodHome',
        companyId: 102,
        category: 'Hardware',
        rating: 4.3
    },
    {
        id: 4,
        image: '/products/product-4.png',
        discount: 15,
        brand: 'GoodHome',
        partNo: '234565',
        name: 'AMBER DECOR Bulb 60W, E27 590',
        parameters: ['Thread: E27', 'Wattage: 60W', 'Glass type: clear'],
        price: 51,
        oldPrice: 64,
        inStock: false,
        company: 'Amber Decor',
        companyId: 103,
        category: 'Lighting',
        rating: 4.1
    }
];

export default function RelatedProducts({ title }: RelatedProductsProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const response = await api.get(API_ENDPOINTS.getAllProducts);
            if (Array.isArray(response.data)) {
            setProducts(response.data.slice(0, 4));
            } else if (Array.isArray(response.data.data)) {
            setProducts(response.data.data.slice(0, 4));
            } else {
            setProducts(fallbackProducts);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts(fallbackProducts);
        } finally {
            setLoading(false);
        }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="text-center mt-10 text-gray-600">Loading products...</div>;
    }

    return (
        <section className="py-6 px-11 bg-white">
            <div className="flex justify-between w-full mb-8">
                <h2 className="text-2xl font-bold leading-tight text-neutral-950">{title}</h2>
            </div>

            <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products
                    .filter((p): p is Product => !!p && typeof p === 'object' && 'discount' in p)
                    .map((product) => (
                    <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
