import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import ProductCard from '../../components/Product/ProductCard';
// import FilterSection from '../../components/Filter/FilterSection';
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
}

const fallbackProducts: Product[] = [
    {
        productID: 1,
        productName: 'AMBER DECOR Small Lamp 60W, E27 S90',
        unitPrice: 45000,
        stockQuantity: 100,
        status: 'Available',
        createdDate: '2021-01-01',
        image: 'https://placehold.co/150/FFD700/000000?text=Lamp',
        description: 'AMBER DECOR Small Lamp 60W, E27 S90',
    },
    {
        productID: 2,
        productName: 'EGLO Philips GU10 3 pcs.',
        unitPrice: 45000,
        stockQuantity: 100,
        status: 'Available',
        createdDate: '2021-01-01',
        image: 'https://placehold.co/150/FFFFFF/000000?text=Philips',
        description: 'EGLO Philips GU10 3 pcs.',
    },
    {
        productID: 3,
        productName: 'LED Dual G9 bulb 3 pcs.',
        unitPrice: 45000,
        stockQuantity: 100,
        status: 'Available',
        createdDate: '2021-01-01',
        image: 'https://placehold.co/150/FFFFFF/000000?text=LED',
        description: 'LED Dual G9 bulb 3 pcs.',
    },
    {
        productID: 4,
        productName: 'LED Dual A60 bulb transparent warm color',
        unitPrice: 45000,
        stockQuantity: 100,
        status: 'Available',
        createdDate: '2021-01-01',
        image: 'https://placehold.co/150/FFFAF0/000000?text=A60',
        description: 'LED Dual A60 bulb transparent warm color',
    },
    {
        productID: 5,
        productName: 'LED Dual R80 bulb milky warm color 2 pcs.',
        unitPrice: 45000,
        stockQuantity: 100,
        status: 'Available',
        createdDate: '2021-01-01',
        image: 'https://placehold.co/150/FFFFFF/000000?text=R80',
        description: 'LED Dual R80 bulb milky warm color 2 pcs.',
    },
    {
        productID: 6,
        productName: 'LED Dual B35 bulb DIM transparent neutral color',
        unitPrice: 45000,
        stockQuantity: 100,
        status: 'Available',
        createdDate: '2021-01-01',
        image: 'https://placehold.co/150/FFFAF0/000000?text=B35',
        description: 'LED Dual B35 bulb DIM transparent neutral color',
    },
    {
        productID: 7,
        productName: 'Ladystena P45 LED, milky, warm color',
        unitPrice: 45000,
        stockQuantity: 100,
        status: 'Available',
        createdDate: '2021-01-01',
        image: 'https://placehold.co/150/FFFAF0/000000?text=P45',
        description: 'Ladystena P45 LED, milky, warm color',
    },
    {
        productID: 8,
        productName: 'LED Dial A60 bulb neutral milky color',
        unitPrice: 45000,
        stockQuantity: 100,
        status: 'Available',
        createdDate: '2021-01-01',
        image: 'https://placehold.co/150/FFFFFF/000000?text=A60',
        description: 'LED Dial A60 bulb neutral milky color',
    },
    {
        productID: 9,
        productName: 'Faucet kit basin + handle OmoKee round',
        unitPrice: 45000,
        stockQuantity: 100,
        status: 'Available',
        createdDate: '2021-01-01',
        image: 'https://placehold.co/150/C0C0C0/000000?text=Faucet',
        description: 'Faucet kit basin + handle OmoKee round',
    },
    {
        productID: 10,
        productName: 'Countertop washbasin GoodHome Tekapo',
        unitPrice: 55000,
        stockQuantity: 100,
        status: 'Available',
        createdDate: '2021-01-01',
        image: 'https://placehold.co/150/FFFFFF/000000?text=Basin',
        description: 'Countertop washbasin GoodHome Tekapo',
    },
    {
        productID: 11,
        productName: 'Waterproof Silicone tape 25 x 2 mm',
        unitPrice: 55000,
        stockQuantity: 100,
        status: 'Available',
        createdDate: '2021-01-01',
        image: 'https://placehold.co/150/87CEFA/000000?text=Tape',
        description: 'Waterproof Silicone tape 25 x 2 mm',
    },
    {
        productID: 12,
        productName: 'AMBER DECOR Bulb 60W, E27 S90',
        unitPrice: 55000,
        stockQuantity: 100,
        status: 'Available',
        createdDate: '2021-01-01',
        image: 'https://placehold.co/150/FFD700/000000?text=Bulb',
        description: 'AMBER DECOR Bulb 60W, E27 S90',
    },
];

const ProductPage = () => {
    const [hasFilteredOnce, setHasFilteredOnce] = useState(false);

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [resultsCount, setResultsCount] = useState(0);

    const [view, setView] = useState<'grid' | 'list'>(() => {
        const saved = localStorage.getItem('view');
        return saved === 'list' || saved === 'grid' ? saved : 'grid';
    });
    const [sort, setSort] = useState<string>(() => localStorage.getItem('sort') || 'popular');
    const [itemsPerPage, setItemsPerPage] = useState<number>(() => Number(localStorage.getItem('itemsPerPage')) || 9);
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const changePage = (page: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', String(page));
        setSearchParams(newParams, { replace: false });
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    useEffect(() => {
        localStorage.setItem('view', view);
    }, [view]);

    useEffect(() => {
        localStorage.setItem('sort', sort);
    }, [sort]);

    useEffect(() => {
        localStorage.setItem('itemsPerPage', itemsPerPage.toString());
    }, [itemsPerPage]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await api.get(API_ENDPOINTS.getAllProducts);
                // console.log('Fetched products:', response.data);

                let fetchedProducts: Product[] = [];

                if (Array.isArray(response.data)) {
                    fetchedProducts = response.data;
                } else if (Array.isArray(response.data.data)) {
                    fetchedProducts = response.data.data;
                } else {
                    console.warn('Dữ liệu từ API không hợp lệ, sử dụng fallback.');
                    fetchedProducts = fallbackProducts;
                }

                setProducts(fetchedProducts);
                setResultsCount(fetchedProducts.length);
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
                setProducts(fallbackProducts);
                setResultsCount(fallbackProducts.length);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // const handleFilterChange = (filteredProducts: Product[]) => {
    //     setProducts(filteredProducts);
    //     setResultsCount(filteredProducts.length);
    //     if (hasFilteredOnce && currentPage !== 1) {
    //         changePage(1);
    //     }
    //     if (!hasFilteredOnce) {
    //         setHasFilteredOnce(true);
    //     }
    // };

    const paginatedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const recommendedProducts = products.filter((p) => p.status === 'Available').slice(0, 4);

    return (
        <div className="min-h-screen">
            {/* Breadcrumbs */}
            <div className="container mx-auto px-4 py-6">
                {/* Main content with sidebar and right section */}
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left Sidebar */}
                    <div className="w-full md:w-1/4">
                        {/* <FilterSection onFilterChange={handleFilterChange} products={products} /> */}
                    </div>

                    {/* Right Content Section */}
                    <div className="w-full md:w-3/4">
                        {/* Banner */}
                        <div className="bg-blue-600 text-white p-6 rounded-md flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-medium">-20% on power tools</h2>
                            <button className="bg-white text-blue-600 px-4 py-2 rounded-md">Check offer</button>
                        </div>

                        {/* Product Grid Header */}
                        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                            {/* View toggle */}
                            <div className="flex items-center">
                                <button
                                    onClick={() => setView('grid')}
                                    className={`p-2 rounded-l-md border ${view === 'grid' ? 'bg-blue-100 text-blue-600 border-blue-600' : 'bg-gray-100 border-gray-300'}`}
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setView('list')}
                                    className={`p-2 rounded-r-md border ${view === 'list' ? 'bg-blue-100 text-blue-600 border-blue-600' : 'bg-gray-100 border-gray-300'}`}
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 10h16M4 14h16M4 18h16"
                                        />
                                    </svg>
                                </button>
                                <span className="ml-4 text-sm font-medium">Tìm thấy {resultsCount} kết quả</span>
                            </div>

                            {/* Sorting */}
                            <div className="flex items-center space-x-2">
                                <div className="text-sm">Sắp xếp theo:</div>
                                <select
                                    className="border border-gray-300 rounded-md p-1 text-sm"
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}
                                >
                                    <option value="newest">Mới nhất</option>
                                    <option value="popular">Phổ biến</option>
                                    <option value="priceLow">Giá từ thấp tới cao</option>
                                    <option value="priceHigh">Giá từ cao tới thấp</option>
                                </select>
                            </div>

                            {/* Items per page */}
                            <div className="flex items-center space-x-2">
                                {[9, 27, 72].map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => {
                                            setItemsPerPage(num);
                                        }}
                                        className={`w-8 h-8 flex items-center justify-center border rounded-md ${
                                            itemsPerPage === num ? 'border-blue-600 text-blue-600' : 'border-gray-300'
                                        }`}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Products Grid */}
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <svg
                                    className="animate-spin h-10 w-10 text-blue-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    />
                                </svg>
                            </div>
                        ) : (
                            <>
                                <div
                                    className={`grid ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6 mb-8`}
                                >
                                    {paginatedProducts.map((product) => (
                                        <ProductCard key={product.productID} product={product} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                <div className="flex justify-center mt-8 space-x-2">
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => changePage(currentPage - 1)}
                                        className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-200"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>

                                    {Array.from({ length: Math.ceil(products.length / itemsPerPage) }, (_, i) => (
                                        <button
                                            key={i + 1}
                                            onClick={() => changePage(i + 1)}
                                            className={`px-3 py-1 border rounded ${
                                                currentPage === i + 1 ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
                                            }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}

                                    <button
                                        disabled={currentPage === Math.ceil(products.length / itemsPerPage)}
                                        onClick={() => changePage(currentPage + 1)}
                                        className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-200"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Recommended Products */}
            <div className="bg-white py-10">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-semibold mb-6">Có thể bạn sẽ thích</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {recommendedProducts.map((product) => (
                            <ProductCard key={product.productID} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
