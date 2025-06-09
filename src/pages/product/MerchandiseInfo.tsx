import { useEffect, useState } from 'react';
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

export default function MerchandiseInfo() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { showToast } = useToast();

    // Form state for new/edit product
    const [formData, setFormData] = useState({
        productName: '',
        description: '',
        unitPrice: 0,
        stockQuantity: 0,
        status: 'Available',
        categoryID: 0,
        companyID: 0,
        image: '',
    });

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const userInfo = JSON.parse(Cookies.get('data') || '{}');
            const companyId = userInfo.companyID;
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

    const fetchCategories = async () => {
        try {
            const response = await api.get(API_ENDPOINTS.getAllCategories);
            setCategories(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleAddProduct = async () => {
        try {
            const userInfo = JSON.parse(Cookies.get('data') || '{}');
            const companyId = userInfo.companyID;
            await api.post(API_ENDPOINTS.createProduct, {
                ...formData,
                companyID: companyId,
            });
            showToast({
                title: 'Product added successfully',
                message: 'Product added successfully',
                type: 'success',
            });
            setIsModalOpen(false);
            resetForm();
            fetchProducts();
        } catch (error) {
            console.error('Error adding product:', error);
            showToast({
                title: 'Error adding product',
                message: 'Error adding product',
                type: 'error',
            });
        }
    };

    const handleEditProduct = async () => {
        if (!editingProduct) return;
        try {
            console.log(editingProduct.productID);
            console.log(formData);
            await api.put(API_ENDPOINTS.updateProduct(editingProduct.productID), formData);
            showToast({
                title: 'Product updated successfully',
                message: 'Product updated successfully',
                type: 'success',
            });
            setIsModalOpen(false);
            resetForm();
            fetchProducts();
        } catch (error) {
            console.error('Error updating product:', error);
            showToast({
                title: 'Error updating product',
                message: 'Error updating product',
                type: 'error',
            });
        }
    };

    const handleDeleteProduct = async (productId: number) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await api.delete(API_ENDPOINTS.deleteProduct(productId));
            showToast({
                title: 'Product deleted successfully',
                message: 'Product deleted successfully',
                type: 'success',
            });
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            showToast({
                title: 'Error deleting product',
                message: 'Error deleting product',
                type: 'error',
            });
        }
    };

    const resetForm = () => {
        setFormData({
            productName: '',
            description: '',
            unitPrice: 0,
            stockQuantity: 0,
            status: 'Available',
            categoryID: 0,
            companyID: 0,
            image: '',
        });
        setEditingProduct(null);
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        const userInfo = JSON.parse(Cookies.get('data') || '{}');
        const companyId = userInfo.companyID;
        setFormData({
            productName: product.productName,
            description: product.description,
            unitPrice: product.unitPrice,
            stockQuantity: product.stockQuantity,
            status: product.status,
            categoryID: product.categoryID,
            companyID: companyId,
            image: product.image,
        });
        setIsModalOpen(true);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Product Management</h1>
                <button
                    onClick={() => {
                        resetForm();
                        setIsModalOpen(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add New Product
                </button>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2">Image</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Stock</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center">
                                    No products found
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.productID} className="border-b">
                                    <td className="px-4 py-2">
                                        <img
                                            src={product.image}
                                            alt={product.productName}
                                            className="w-16 h-16 object-cover"
                                        />
                                    </td>
                                    <td className="px-4 py-2">{product.productName}</td>
                                    <td className="px-4 py-2">{product.unitPrice.toLocaleString('vi-VN')} đ</td>
                                    <td className="px-4 py-2">{product.stockQuantity}</td>
                                    <td className="px-4 py-2">
                                        <span
                                            className={`px-2 py-1 rounded ${
                                                product.status === 'Available'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                        >
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() =>
                                                openEditModal({ ...product, categoryID: product.categoryID })
                                            }
                                            className="text-blue-600 hover:text-blue-800 mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProduct(product.productID)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Product Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
                        <h2 className="text-xl font-bold mb-4">
                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="productName" className="block mb-2">
                                    Product Name
                                </label>
                                <input
                                    id="productName"
                                    type="text"
                                    value={formData.productName}
                                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label htmlFor="categoryID" className="block mb-2">
                                    Category
                                </label>
                                <select
                                    id="categoryID"
                                    value={formData.categoryID}
                                    onChange={(e) => setFormData({ ...formData, categoryID: Number(e.target.value) })}
                                    className="w-full border rounded px-3 py-2"
                                >
                                    <option value={0}>Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category.categoryID} value={category.categoryID}>
                                            {category.categoryName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="unitPrice" className="block mb-2">
                                    Price
                                </label>
                                <input
                                    id="unitPrice"
                                    type="number"
                                    value={formData.unitPrice}
                                    onChange={(e) => setFormData({ ...formData, unitPrice: Number(e.target.value) })}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label htmlFor="stockQuantity" className="block mb-2">
                                    Stock Quantity
                                </label>
                                <input
                                    id="stockQuantity"
                                    type="number"
                                    value={formData.stockQuantity}
                                    onChange={(e) =>
                                        setFormData({ ...formData, stockQuantity: Number(e.target.value) })
                                    }
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label htmlFor="status" className="block mb-2">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full border rounded px-3 py-2"
                                >
                                    <option value="Available">Available</option>
                                    <option value="Out of stock">Out of stock</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="image" className="block mb-2">
                                    Image URL
                                </label>
                                <input
                                    id="image"
                                    type="text"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="description" className="block mb-2">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full border rounded px-3 py-2"
                                    rows={4}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    resetForm();
                                }}
                                className="px-4 py-2 border rounded hover:bg-gray-100 hover:cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={editingProduct ? handleEditProduct : handleAddProduct}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 hover:cursor-pointer"
                            >
                                {editingProduct ? 'Save Changes' : 'Add Product'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
