import { useState, useEffect } from 'react';
import { FaEye, FaCheck, FaTimes } from 'react-icons/fa';
import api from '../../lib/axios';
import { API_ENDPOINTS } from '../../lib/apiConfig';

interface Quote {
    id: string;
    productName: string;
    buyerCompany: string;
    sellerCompany: string;
    quantity: number;
    price: number;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
    updatedAt: string;
}

// Dữ liệu mẫu cho testing
const mockQuotes: Quote[] = [
    {
        id: '1',
        productName: 'Máy CNC XYZ',
        buyerCompany: 'Công ty TNHH ABC',
        sellerCompany: 'Công ty XYZ',
        quantity: 2,
        price: 150000000,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '2',
        productName: 'Vật tư công nghiệp',
        buyerCompany: 'Công ty DEF',
        sellerCompany: 'Công ty GHI',
        quantity: 100,
        price: 5000000,
        status: 'approved',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

export default function QuoteManagement() {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState<string>('all');

    useEffect(() => {
        fetchQuotes();
    }, []);

    const fetchQuotes = async () => {
        try {
            // Sử dụng dữ liệu mẫu cho testing
            setQuotes(mockQuotes);

            // Comment lại phần gọi API thực tế
            // const response = await api.get(API_ENDPOINTS.getAllQuotes);
            // setQuotes(response.data);
        } catch (error) {
            console.error('Error fetching quotes:', error);
            setError('Không thể tải dữ liệu báo giá');
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (quote: Quote) => {
        setSelectedQuote(quote);
        setIsModalOpen(true);
    };

    const handleApprove = async (quoteId: string) => {
        try {
            // await api.put(`${API_ENDPOINTS.approveQuote}/${quoteId}`);
            // Cập nhật state local cho testing
            setQuotes(quotes.map((quote) => (quote.id === quoteId ? { ...quote, status: 'approved' } : quote)));
        } catch (error) {
            console.error('Error approving quote:', error);
            setError('Không thể duyệt báo giá');
        }
    };

    const handleReject = async (quoteId: string) => {
        try {
            // await api.put(`${API_ENDPOINTS.rejectQuote}/${quoteId}`);
            // Cập nhật state local cho testing
            setQuotes(quotes.map((quote) => (quote.id === quoteId ? { ...quote, status: 'rejected' } : quote)));
        } catch (error) {
            console.error('Error rejecting quote:', error);
            setError('Không thể từ chối báo giá');
        }
    };

    const formatCurrency = (value: number) => {
        return value.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const filteredQuotes = statusFilter === 'all' ? quotes : quotes.filter((quote) => quote.status === statusFilter);

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
                <h2 className="text-2xl font-bold mb-6">Quản lý báo giá</h2>

                <div className="mb-4">
                    <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-2">
                        Lọc theo trạng thái
                    </label>
                    <select
                        id="statusFilter"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="all">Tất cả</option>
                        <option value="pending">Chờ duyệt</option>
                        <option value="approved">Đã duyệt</option>
                        <option value="rejected">Đã từ chối</option>
                    </select>
                </div>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                    <p>{error}</p>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Sản phẩm
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Bên mua
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Bên bán
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Số lượng
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Giá
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Trạng thái
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ngày tạo
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredQuotes.map((quote) => (
                            <tr key={quote.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{quote.productName}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{quote.buyerCompany}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{quote.sellerCompany}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{quote.quantity}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{formatCurrency(quote.price)}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${
                                            quote.status === 'approved'
                                                ? 'bg-green-100 text-green-800'
                                                : quote.status === 'pending'
                                                  ? 'bg-yellow-100 text-yellow-800'
                                                  : 'bg-red-100 text-red-800'
                                        }`}
                                    >
                                        {quote.status === 'approved'
                                            ? 'Đã duyệt'
                                            : quote.status === 'pending'
                                              ? 'Chờ duyệt'
                                              : 'Đã từ chối'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{formatDate(quote.createdAt)}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleViewDetails(quote)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        <FaEye className="inline-block" />
                                    </button>
                                    {quote.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => handleApprove(quote.id)}
                                                className="text-green-600 hover:text-green-900 mr-3"
                                            >
                                                <FaCheck className="inline-block" />
                                            </button>
                                            <button
                                                onClick={() => handleReject(quote.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <FaTimes className="inline-block" />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal xem chi tiết báo giá */}
            {isModalOpen && selectedQuote && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Chi tiết báo giá</h3>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                                        Sản phẩm
                                    </label>
                                    <p id="productName" className="mt-1 text-sm text-gray-900">
                                        {selectedQuote.productName}
                                    </p>
                                </div>
                                <div>
                                    <label htmlFor="buyerCompany" className="block text-sm font-medium text-gray-700">
                                        Bên mua
                                    </label>
                                    <p id="buyerCompany" className="mt-1 text-sm text-gray-900">
                                        {selectedQuote.buyerCompany}
                                    </p>
                                </div>
                                <div>
                                    <label htmlFor="sellerCompany" className="block text-sm font-medium text-gray-700">
                                        Bên bán
                                    </label>
                                    <p id="sellerCompany" className="mt-1 text-sm text-gray-900">
                                        {selectedQuote.sellerCompany}
                                    </p>
                                </div>
                                <div>
                                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                        Số lượng
                                    </label>
                                    <p id="quantity" className="mt-1 text-sm text-gray-900">
                                        {selectedQuote.quantity}
                                    </p>
                                </div>
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                        Giá
                                    </label>
                                    <p id="price" className="mt-1 text-sm text-gray-900">
                                        {formatCurrency(selectedQuote.price)}
                                    </p>
                                </div>
                                <div>
                                    <label htmlFor="quoteStatus" className="block text-sm font-medium text-gray-700">
                                        Trạng thái
                                    </label>
                                    <p id="quoteStatus" className="mt-1 text-sm text-gray-900">
                                        {selectedQuote.status === 'approved'
                                            ? 'Đã duyệt'
                                            : selectedQuote.status === 'pending'
                                              ? 'Chờ duyệt'
                                              : 'Đã từ chối'}
                                    </p>
                                </div>
                                <div>
                                    <label htmlFor="createdAt" className="block text-sm font-medium text-gray-700">
                                        Ngày tạo
                                    </label>
                                    <p id="createdAt" className="mt-1 text-sm text-gray-900">
                                        {formatDate(selectedQuote.createdAt)}
                                    </p>
                                </div>
                                <div>
                                    <label htmlFor="updatedAt" className="block text-sm font-medium text-gray-700">
                                        Cập nhật lần cuối
                                    </label>
                                    <p id="updatedAt" className="mt-1 text-sm text-gray-900">
                                        {formatDate(selectedQuote.updatedAt)}
                                    </p>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                    >
                                        Đóng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
