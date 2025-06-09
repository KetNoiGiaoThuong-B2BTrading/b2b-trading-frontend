import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
    Building2,
    MapPin,
    Phone,
    Mail,
    Globe,
    Star,
    Award,
    FileText,
    Users,
    Calendar,
    ExternalLink,
    Shield,
    CheckCircle,
} from 'lucide-react';
import api from '../../lib/axios';
import { API_ENDPOINTS } from '../../lib/apiConfig';
import { useToast } from '../../context/ToastContext';
import Cookies from 'js-cookie';

interface Product {
    productID: number;
    productName: string;
    description: string;
    unitPrice: number;
    stockQuantity: number;
    status: string;
    createdDate: string;
    categoryID: number;
    companyID: number;
    image: string;
}

interface Category {
    categoryID: number;
    categoryName: string;
}

interface Company {
    companyID: number;
    companyName: string;
    taxCode: string;
    businessSector: string;
    address: string;
    representative: string;
    email: string;
    phoneNumber: string;
    registrationDate: string;
    verificationStatus: string;
    imageCompany: string;
}

const fallbackData: Company = {
    companyID: 1,
    companyName: 'Công ty TNHH Công nghệ ABC',
    taxCode: '123456',
    businessSector: 'Công nghệ thông tin',
    address: '123 Đường Nguyễn Văn Cừ, Quận 5, TP. Hồ Chí Minh, Việt Nam',
    representative: 'Nguyễn Văn A',
    email: 'contact@abc-tech.vn',
    phoneNumber: '+84 28 1234 5678',
    registrationDate: '2024-01-01',
    verificationStatus: 'verified',
    imageCompany: 'https://placehold.co/120x120/2563eb/ffffff?text=ABC',
};

const CompanyProfile = () => {
    const { showToast } = useToast();
    const path = window.location.pathname;
    const segments = path.split('/');
    const companyId = parseInt(segments[2], 10);

    const [Company, setCompany] = useState<Company | null>(null);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        const fetchCompany = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await api.get(API_ENDPOINTS.getCompanyProfileById(companyId));
                setCompany(res.data);
            } catch (err) {
                setError('Không thể tải dữ liệu công ty. Sử dụng dữ liệu mẫu.');
                setCompany(fallbackData);
            } finally {
                setLoading(false);
            }
        };

        fetchCompany();
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await api.get(API_ENDPOINTS.getProductsByCompanyId(companyId));
                setProducts(Array.isArray(response.data) ? response.data : [response.data]);
            } catch (error) {
                setProducts([]);
                console.error('Error fetching products:', error);
                showToast({
                    title: 'Error fetching products',
                    message: 'Error fetching products',
                    type: 'error',
                });
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
        const fetchCategories = async () => {
            const response = await api.get(API_ENDPOINTS.getAllCategories);
            setCategories(response.data);
        };
        fetchCategories();
    }, [companyId]);

    const handleRetry = () => {
        window.location.reload();
    };

    const renderStars = (rating: number) =>
        Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
        ));

    const getCategoryName = (categoryID: number) => {
        const category = categories.find((c) => c.categoryID === categoryID);
        return category ? category.categoryName : 'Không xác định';
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!Company) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy thông tin doanh nghiệp</h2>
                    <p className="text-gray-600 mb-4">Vui lòng thử lại sau.</p>
                    <button
                        onClick={handleRetry}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-300">
                {/* Error Banner */}
                {error && (
                    <div className="bg-yellow-50 border-b border-yellow-200">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                    <span className="text-sm text-yellow-800">{error}</span>
                                </div>
                                <button
                                    onClick={handleRetry}
                                    className="text-xs bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full hover:bg-yellow-300 transition-colors"
                                >
                                    Thử lại API
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div className="flex items-start gap-6">
                            <div className="flex-shrink-0">
                                <img
                                    src={
                                        Company.imageCompany ||
                                        `https://placehold.co/120x120/2563eb/ffffff?text=${Company.companyName}`
                                    }
                                    alt={`${Company.companyName} logo`}
                                    className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-2xl font-bold text-gray-900 truncate">{Company.companyName}</h1>
                                    {Company.verificationStatus === 'verified' && (
                                        <div className="flex items-center gap-1 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                            <CheckCircle className="w-3 h-3" />
                                            <span>Đã xác thực</span>
                                        </div>
                                    )}
                                </div>
                                <p className="text-gray-600 mb-3">{Company.registrationDate}</p>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <Building2 className="w-4 h-4" />
                                        {Company.businessSector}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        {Company.representative}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-1">
                                {renderStars(Company.verificationStatus === 'Đã xác minh' ? 5 : 0)}
                                <span className="ml-2 text-sm font-medium text-gray-900">
                                    {Company.verificationStatus === 'Đã xác minh' ? 'Đã xác minh' : 'Chưa xác minh'}
                                </span>
                                <span className="text-sm text-gray-500">
                                    ({Company.verificationStatus === 'Đã xác minh' ? 'Đã xác minh' : 'Chưa xác minh'})
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white border-b border-gray-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex space-x-8">
                        {[
                            { id: 'overview', label: 'Tổng quan', icon: Building2 },
                            { id: 'products', label: 'Sản phẩm/Dịch vụ', icon: Award },
                        ].map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === tab.id
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Info */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin liên hệ</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-gray-900">{Company.address}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-5 h-5 text-gray-400" />
                                        <span className="text-gray-900">{Company.phoneNumber}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5 text-gray-400" />
                                        <span className="text-gray-900">{Company.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Globe className="w-5 h-5 text-gray-400" />
                                        <a
                                            href={window.location.pathname}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                        >
                                            {Company.companyName}
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thống kê nhanh</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Đánh giá trung bình</span>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="font-semibold">5.0</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Sản phẩm/Dịch vụ</span>
                                        <span className="font-semibold">{products.length}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Ngày đăng ký</span>
                                        <span className="font-semibold">
                                            {new Date(Company.registrationDate).toLocaleDateString('vi-VN')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'products' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div key={product.productID} className="bg-white rounded-lg shadow overflow-hidden">
                                <img
                                    src={
                                        product.image ||
                                        `https://placehold.co/120x120/2563eb/ffffff?text=${product.productName}`
                                    }
                                    alt={product.productName}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                            {getCategoryName(product.categoryID)}
                                        </span>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{product.productName}</h4>
                                    <p className="text-lg font-bold text-blue-600">
                                        {product.unitPrice.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompanyProfile;
