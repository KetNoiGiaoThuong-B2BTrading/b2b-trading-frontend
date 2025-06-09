import { useEffect, useState } from 'react';
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

    // discount: number;
    // brand: string;
    // partNo: string;
    // parameters: string[];
    // isAddedToCart?: boolean;
    // category: string;
    // rating: number;
}

interface RelatedProductsProps {
    title: string;
}

const fallbackProducts: Product[] = [
    {
      productID: 1,
      image: '/products/product-1.png',
      productName: 'Connection with a handle Omnires round',
      description: 'Material of execution: brass, Manufacturer\'s color: chrome, Guarantee: 5 years',
      unitPrice: 45,
      stockQuantity: 10,
      status: 'available',
      createdDate: '2024-01-01',
      companyID: 101,
    },
    {
      productID: 2,
      image: '/products/product-2.png',
      productName: 'Countertop washbasin GoodHome Tekapo',
      description: 'Basin width : 45 cm, Basin height: 12 cm, Basin depth: 35 cm',
      unitPrice: 51,
      stockQuantity: 20,
      status: 'available',
      createdDate: '2024-02-01',
      companyID: 102,
    },
    {
      productID: 3,
      image: '/products/product-3.png',
      productName: 'Perforated Simpson tape 25 x 2500 x 2 mm',
      description: 'Width: 45 cm, Height: 12 cm, Depth: 35 cm',
      unitPrice: 51,
      stockQuantity: 15,
      status: 'available',
      createdDate: '2024-03-01',
      companyID: 102,
    },
    {
      productID: 4,
      image: '/products/product-4.png',
      productName: 'AMBER DECOR Bulb 60W, E27 590',
      description: 'Thread: E27, Wattage: 60W, Glass type: clear',
      unitPrice: 51,
      stockQuantity: 0,
      status: 'out of stock',
      createdDate: '2024-04-01',
      companyID: 103,
    },
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
        <section className="py-6 px-15 bg-white w-full">
            <div className="flex justify-between w-full mb-8">
                <h2 className="text-2xl font-bold leading-tight text-neutral-950">{title}</h2>
            </div>

            <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products
                    // .filter((p): p is Product => !!p && typeof p === 'object' && 'discount' in p)
                    .map((product) => (
                    <ProductCard key={product.productID} product={product} />
                ))}
                </div>
            </div>
        </section>
    );
}
