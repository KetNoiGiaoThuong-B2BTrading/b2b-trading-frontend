import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import api from '../../lib/axios';
import { API_ENDPOINTS } from '../../lib/apiConfig';

interface Category {
    categoryID: number;
    categoryName: string;
    parentCategoryName?: string | null;
    imageCategoly?: string;
}

export default function CategoryManagement() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'create' | 'edit'>('create');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await api.get(API_ENDPOINTS.getAllCategories);
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setError('Không thể tải danh sách danh mục');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setSelectedCategory({
            categoryID: 0,
            categoryName: '',
            parentCategoryName: null,
            imageCategoly: 'default.jpg',
        });
        setModalType('create');
        setIsModalOpen(true);
    };

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setModalType('edit');
        setIsModalOpen(true);
    };

    const handleDelete = async (categoryId: number) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
            try {
                await api.delete(`${API_ENDPOINTS.updateCategory}/${categoryId}`);
                setCategories(categories.filter((category) => category.categoryID !== categoryId));
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
            const categoryData = {
                categoryName: selectedCategory.categoryName,
                parentCategoryID: selectedCategory.parentCategoryName
                    ? categories.find((cat) => cat.categoryName === selectedCategory.parentCategoryName)?.categoryID
                    : null,
                imageCategoly: selectedCategory.imageCategoly || 'default.jpg',
            };

            if (modalType === 'create') {
                await api.post(API_ENDPOINTS.createCategory, categoryData);
            } else {
                await api.put(`${API_ENDPOINTS.updateCategory}/${selectedCategory.categoryID}`, categoryData);
            }
            await fetchCategories();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving category:', error);
            setError('Không thể lưu danh mục');
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
                <h2 className="text-2xl font-bold mb-6">Quản lý danh mục</h2>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                    <p>{error}</p>
                </div>
            )}

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
                                    Danh mục cha
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {categories.map((category) => (
                                <tr key={category.categoryID}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{category.categoryName}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {category.parentCategoryName || '-'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(category)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(category.categoryID)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal thêm/sửa danh mục */}
            {isModalOpen && selectedCategory && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                                {modalType === 'create' ? 'Thêm danh mục mới' : 'Sửa danh mục'}
                            </h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label
                                        htmlFor="categoryName"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Tên danh mục
                                    </label>
                                    <input
                                        id="categoryName"
                                        type="text"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={selectedCategory.categoryName}
                                        onChange={(e) =>
                                            setSelectedCategory({ ...selectedCategory, categoryName: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="parentCategory"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Danh mục cha
                                    </label>
                                    <select
                                        id="parentCategory"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={selectedCategory.parentCategoryName || ''}
                                        onChange={(e) =>
                                            setSelectedCategory({
                                                ...selectedCategory,
                                                parentCategoryName: e.target.value || null,
                                            })
                                        }
                                    >
                                        <option value="">Không có</option>
                                        {categories
                                            .filter((cat) => cat.categoryID !== selectedCategory.categoryID)
                                            .map((cat) => (
                                                <option key={cat.categoryID} value={cat.categoryName}>
                                                    {cat.categoryName}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="categoryImage"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Hình ảnh danh mục
                                    </label>
                                    <input
                                        id="categoryImage"
                                        type="text"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={selectedCategory.imageCategoly || ''}
                                        onChange={(e) =>
                                            setSelectedCategory({ ...selectedCategory, imageCategoly: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    >
                                        {modalType === 'create' ? 'Thêm' : 'Lưu'}
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
