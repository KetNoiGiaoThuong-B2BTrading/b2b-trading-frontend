import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../../lib/axios';
import { API_ENDPOINTS } from '../../lib/apiConfig';

type Category = {
    title: string;
    image: string;
    description: string;
};

// Fallback categories nếu API lỗi
const fallbackCategories: Category[] = [
    {
        title: 'Construction',
        image: 'https://placehold.co/300x200',
        description: 'Ball & roller bearings, bearing units, track rollers...',
    },
    {
        title: 'Installation',
        image: 'https://placehold.co/300x200',
        description: 'Ball & roller bearings, bearing units, track rollers...',
    },
    {
        title: 'Painting',
        image: 'https://placehold.co/300x200',
        description: 'Ball & roller bearings, bearing units, track rollers...',
    },
    {
        title: 'Arranging',
        image: 'https://placehold.co/300x200',
        description: 'Ball & roller bearings, bearing units, track rollers...',
    },
    {
        title: 'Garden',
        image: 'https://placehold.co/300x200',
        description: 'Ball & roller bearings, bearing units, track rollers...',
    },
    {
        title: 'Tools and articles',
        image: 'https://placehold.co/300x200',
        description: 'Ball & roller bearings, bearing units, track rollers...',
    },
];

const CategoriesPage = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
        try {
            const res = await api.get(API_ENDPOINTS.getAllCategories);
            if (res.data && Array.isArray(res.data)) {
            setCategories(res.data);
            } else {
            setCategories(fallbackCategories);
            }
        } catch (err) {
            console.error('API lỗi:', err);
            setCategories(fallbackCategories);
            setError(true);
        } finally {
            setLoading(false);
        }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (categoryTitle: string) => {
        navigate(`/products?category=${encodeURIComponent(categoryTitle)}`);
    };

    return (
        <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500">
            <span>Trang chủ</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Lĩnh vực</span>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 pb-16">
            <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Danh mục lĩnh vực</h1>

            {/* Error Message */}
            {error && (
                <div className="text-red-500 mb-4">
                Không thể tải danh sách danh mục từ máy chủ. Hiển thị dữ liệu dự phòng.
                </div>
            )}

            {/* Categories */}
            {loading ? (
                <p className="text-gray-500">Đang tải danh mục...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((category, index) => (
                    <div
                    key={index}
                    className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleCategoryClick(category.title)} // thêm xử lý click
                    >
                    <div className="aspect-w-16 aspect-h-10">
                        <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-48 object-cover"
                        />
                    </div>
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">{category.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>
                    </div>
                    </div>
                ))}
                </div>
            )}
            </div>
        </main>
        </div>
    );
};

export default CategoriesPage;
