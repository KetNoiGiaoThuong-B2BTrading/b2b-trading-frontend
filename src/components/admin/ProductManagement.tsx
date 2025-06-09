import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaChartBar } from 'react-icons/fa';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import api from '../../lib/axios';
import { API_ENDPOINTS } from '../../lib/apiConfig';

interface Product {
    id: string;
    name: string;
    category: string;
    company: string;
    price: number;
    stock: number;
    status: 'active' | 'inactive';
    createdAt: string;
}

interface CategoryStats {
    name: string;
    value: number;
}

interface CompanyStats {
    name: string;
    value: number;
}

// Dữ liệu mẫu cho testing
const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Máy CNC XYZ',
        category: 'Máy móc',
        company: 'Công ty TNHH ABC',
        price: 150000000,
        stock: 5,
        status: 'active',
        createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'Vật tư công nghiệp',
        category: 'Vật tư',
        company: 'Công ty XYZ',
        price: 5000000,
        stock: 100,
        status: 'active',
        createdAt: new Date().toISOString(),
    },
];

const mockCategoryStats: CategoryStats[] = [
    { name: 'Máy móc', value: 50 },
    { name: 'Vật tư', value: 100 },
    { name: 'Dịch vụ', value: 30 },
    { name: 'Khác', value: 20 },
];

const mockCompanyStats: CompanyStats[] = [
    { name: 'Công ty TNHH ABC', value: 80 },
    { name: 'Công ty XYZ', value: 60 },
    { name: 'Công ty DEF', value: 40 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function ProductManagement() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([]);
    const [companyStats, setCompanyStats] = useState<CompanyStats[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'list' | 'stats'>('list');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Sử dụng dữ liệu mẫu cho testing
            setProducts(mockProducts);
            setCategoryStats(mockCategoryStats);
            setCompanyStats(mockCompanyStats);

            // Comment lại phần gọi API thực tế
            // const [productsRes, categoryStatsRes, companyStatsRes] = await Promise.all([
            //     api.get(API_ENDPOINTS.getAllProducts),
            //     api.get(API_ENDPOINTS.getProductCategoryStats),
            //     api.get(API_ENDPOINTS.getProductCompanyStats),
            // ]);
            // setProducts(productsRes.data);
            // setCategoryStats(categoryStatsRes.data);
            // setCompanyStats(companyStatsRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Không thể tải dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (productId: string) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            try {
                // await api.delete(`${API_ENDPOINTS.deleteProduct}/${productId}`);
                // Cập nhật state local cho testing
                setProducts(products.filter((product) => product.id !== productId));
            } catch (error) {
                console.error('Error deleting product:', error);
                setError('Không thể xóa sản phẩm');
            }
        }
    };

    const formatCurrency = (value: number) => {
        return value.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-6">Quản lý sản phẩm</h2>

                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('list')}
                            className={`${
                                activeTab === 'list'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Danh sách sản phẩm
                        </button>
                        <button
                            onClick={() => setActiveTab('stats')}
                            className={`${
                                activeTab === 'stats'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Thống kê
                        </button>
                    </nav>
                </div>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                    <p>{error}</p>
                </div>
            )}

            {activeTab === 'list' ? (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tên sản phẩm
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Danh mục
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Doanh nghiệp
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Giá
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tồn kho
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{product.category}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{product.company}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{formatCurrency(product.price)}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{product.stock}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                        >
                                            {product.status === 'active' ? 'Đang bán' : 'Ngừng bán'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="text-blue-600 hover:text-blue-900 mr-3"
                                        >
                                            <FaEdit className="inline-block" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <FaTrash className="inline-block" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Thống kê theo danh mục</h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryStats}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        label
                                    >
                                        {categoryStats.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value: number) => [`${value} sản phẩm`, 'Số lượng']} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Thống kê theo doanh nghiệp</h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={companyStats}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip formatter={(value: number) => [`${value} sản phẩm`, 'Số lượng']} />
                                    <Legend />
                                    <Bar dataKey="value" name="Số sản phẩm" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal chỉnh sửa sản phẩm */}
            {isEditModalOpen && selectedProduct && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                                Chỉnh sửa thông tin sản phẩm
                            </h3>
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                                        Tên sản phẩm
                                    </label>
                                    <input
                                        id="productName"
                                        type="text"
                                        value={selectedProduct.name}
                                        onChange={(e) =>
                                            setSelectedProduct({ ...selectedProduct, name: e.target.value })
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="productCategory"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Danh mục
                                    </label>
                                    <input
                                        id="productCategory"
                                        type="text"
                                        value={selectedProduct.category}
                                        onChange={(e) =>
                                            setSelectedProduct({ ...selectedProduct, category: e.target.value })
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
                                        Giá
                                    </label>
                                    <input
                                        id="productPrice"
                                        type="number"
                                        value={selectedProduct.price}
                                        onChange={(e) =>
                                            setSelectedProduct({
                                                ...selectedProduct,
                                                price: parseInt(e.target.value),
                                            })
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="productStock" className="block text-sm font-medium text-gray-700">
                                        Tồn kho
                                    </label>
                                    <input
                                        id="productStock"
                                        type="number"
                                        value={selectedProduct.stock}
                                        onChange={(e) =>
                                            setSelectedProduct({
                                                ...selectedProduct,
                                                stock: parseInt(e.target.value),
                                            })
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="productStatus" className="block text-sm font-medium text-gray-700">
                                        Trạng thái
                                    </label>
                                    <select
                                        id="productStatus"
                                        value={selectedProduct.status}
                                        onChange={(e) =>
                                            setSelectedProduct({
                                                ...selectedProduct,
                                                status: e.target.value as Product['status'],
                                            })
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        <option value="active">Đang bán</option>
                                        <option value="inactive">Ngừng bán</option>
                                    </select>
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                        Lưu thay đổi
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
