import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import api from '../../lib/axios';
import { API_ENDPOINTS } from '../../lib/apiConfig';

interface Category {
    id: string;
    name: string;
    description: string;
    type: 'business' | 'product';
    parentId?: string;
    createdAt: string;
}

interface Business {
    id: string;
    name: string;
    categoryId: string;
}

interface Product {
    id: string;
    name: string;
    categoryId: string;
}

// Dữ liệu mẫu cho testing
const mockCategories: Category[] = [
    {
        id: '1',
        name: 'Công nghệ thông tin',
        description: 'Các doanh nghiệp và sản phẩm liên quan đến CNTT',
        type: 'business',
        createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'Máy móc công nghiệp',
        description: 'Các sản phẩm máy móc công nghiệp',
        type: 'product',
        createdAt: new Date().toISOString(),
    },
];

const mockBusinesses: Business[] = [
    { id: '1', name: 'Công ty TNHH ABC', categoryId: '1' },
    { id: '2', name: 'Công ty XYZ', categoryId: '1' },
];

const mockProducts: Product[] = [
    { id: '1', name: 'Máy CNC XYZ', categoryId: '2' },
    { id: '2', name: 'Máy in 3D', categoryId: '2' },
];

export default function CategoryManagement() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'create' | 'edit'>('create');
    const [activeTab, setActiveTab] = useState<'categories' | 'assignments'>('categories');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Sử dụng dữ liệu mẫu cho testing
            setCategories(mockCategories);
            setBusinesses(mockBusinesses);
            setProducts(mockProducts);

            // Comment lại phần gọi API thực tế
            // const [categoriesRes, businessesRes, productsRes] = await Promise.all([
            //     api.get(API_ENDPOINTS.getAllCategories),
            //     api.get(API_ENDPOINTS.getAllBusinesses),
            //     api.get(API_ENDPOINTS.getAllProducts),
            // ]);
            // setCategories(categoriesRes.data);
            // setBusinesses(businessesRes.data);
            // setProducts(productsRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Không thể tải dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setSelectedCategory(null);
        setModalType('create');
        setIsModalOpen(true);
    };

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setModalType('edit');
        setIsModalOpen(true);
    };

    const handleDelete = async (categoryId: string) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
            try {
                // await api.delete(`${API_ENDPOINTS.deleteCategory}/${categoryId}`);
                // Cập nhật state local cho testing
                setCategories(categories.filter((category) => category.id !== categoryId));
            } catch (error) {
                console.error('Error deleting category:', error);
                setError('Không thể xóa danh mục');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCategory) return;

        try {
            if (modalType === 'create') {
                // await api.post(API_ENDPOINTS.createCategory, selectedCategory);
                // Cập nhật state local cho testing
                setCategories([...categories, { ...selectedCategory, id: Date.now().toString() }]);
            } else {
                // await api.put(`${API_ENDPOINTS.updateCategory}/${selectedCategory.id}`, selectedCategory);
                // Cập nhật state local cho testing
                setCategories(
                    categories.map((category) => (category.id === selectedCategory.id ? selectedCategory : category)),
                );
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving category:', error);
            setError('Không thể lưu danh mục');
        }
    };

    const handleAssignCategory = async (itemId: string, categoryId: string, type: 'business' | 'product') => {
        try {
            // await api.put(`${API_ENDPOINTS.updateItemCategory}/${itemId}`, { categoryId });
            // Cập nhật state local cho testing
            if (type === 'business') {
                setBusinesses(
                    businesses.map((business) => (business.id === itemId ? { ...business, categoryId } : business)),
                );
            } else {
                setProducts(products.map((product) => (product.id === itemId ? { ...product, categoryId } : product)));
            }
        } catch (error) {
            console.error('Error assigning category:', error);
            setError('Không thể gán danh mục');
        }
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
                <h2 className="text-2xl font-bold mb-6">Quản lý danh mục ngành nghề</h2>

                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('categories')}
                            className={`${
                                activeTab === 'categories'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Danh mục
                        </button>
                        <button
                            onClick={() => setActiveTab('assignments')}
                            className={`${
                                activeTab === 'assignments'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Phân loại
                        </button>
                    </nav>
                </div>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                    <p>{error}</p>
                </div>
            )}

            {activeTab === 'categories' ? (
                <div>
                    <div className="mb-4">
                        <button
                            onClick={handleCreate}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
                        >
                            <FaPlus className="mr-2" />
                            Thêm danh mục mới
                        </button>
                    </div>

                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tên danh mục
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Mô tả
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Loại
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {categories.map((category) => (
                                    <tr key={category.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{category.name}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-500">{category.description}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {category.type === 'business' ? 'Doanh nghiệp' : 'Sản phẩm'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleEdit(category)}
                                                className="text-blue-600 hover:text-blue-900 mr-3"
                                            >
                                                <FaEdit className="inline-block" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category.id)}
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
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Phân loại doanh nghiệp</h3>
                        <div className="space-y-4">
                            {businesses.map((business) => (
                                <div key={business.id} className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">{business.name}</span>
                                    <select
                                        value={business.categoryId}
                                        onChange={(e) => handleAssignCategory(business.id, e.target.value, 'business')}
                                        className="ml-4 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        {categories
                                            .filter((category) => category.type === 'business')
                                            .map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Phân loại sản phẩm</h3>
                        <div className="space-y-4">
                            {products.map((product) => (
                                <div key={product.id} className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">{product.name}</span>
                                    <select
                                        value={product.categoryId}
                                        onChange={(e) => handleAssignCategory(product.id, e.target.value, 'product')}
                                        className="ml-4 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        {categories
                                            .filter((category) => category.type === 'product')
                                            .map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Modal tạo/chỉnh sửa danh mục */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                                {modalType === 'create' ? 'Thêm danh mục mới' : 'Chỉnh sửa danh mục'}
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">
                                        Tên danh mục
                                    </label>
                                    <input
                                        id="categoryName"
                                        type="text"
                                        value={selectedCategory?.name || ''}
                                        onChange={(e) =>
                                            setSelectedCategory({
                                                ...selectedCategory!,
                                                name: e.target.value,
                                            })
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="categoryDescription"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Mô tả
                                    </label>
                                    <textarea
                                        id="categoryDescription"
                                        value={selectedCategory?.description || ''}
                                        onChange={(e) =>
                                            setSelectedCategory({
                                                ...selectedCategory!,
                                                description: e.target.value,
                                            })
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        rows={3}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="categoryType" className="block text-sm font-medium text-gray-700">
                                        Loại danh mục
                                    </label>
                                    <select
                                        id="categoryType"
                                        value={selectedCategory?.type || 'business'}
                                        onChange={(e) =>
                                            setSelectedCategory({
                                                ...selectedCategory!,
                                                type: e.target.value as Category['type'],
                                            })
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        <option value="business">Doanh nghiệp</option>
                                        <option value="product">Sản phẩm</option>
                                    </select>
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                        {modalType === 'create' ? 'Thêm mới' : 'Lưu thay đổi'}
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
