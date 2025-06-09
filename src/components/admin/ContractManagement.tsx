import { useState, useEffect } from 'react';
import { FaEye, FaCheck, FaTimes, FaFileDownload } from 'react-icons/fa';
import api from '../../lib/axios';
import { API_ENDPOINTS } from '../../lib/apiConfig';

interface Contract {
    id: string;
    contractNumber: string;
    buyerCompany: string;
    sellerCompany: string;
    totalAmount: number;
    status: 'pending' | 'approved' | 'rejected' | 'completed';
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
}

// Dữ liệu mẫu cho testing
const mockContracts: Contract[] = [
    {
        id: '1',
        contractNumber: 'HD-2024-001',
        buyerCompany: 'Công ty TNHH ABC',
        sellerCompany: 'Công ty XYZ',
        totalAmount: 300000000,
        status: 'pending',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '2',
        contractNumber: 'HD-2024-002',
        buyerCompany: 'Công ty DEF',
        sellerCompany: 'Công ty GHI',
        totalAmount: 150000000,
        status: 'approved',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

export default function ContractManagement() {
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState<string>('all');

    useEffect(() => {
        fetchContracts();
    }, []);

    const fetchContracts = async () => {
        try {
            // Sử dụng dữ liệu mẫu cho testing
            setContracts(mockContracts);

            // Comment lại phần gọi API thực tế
            // const response = await api.get(API_ENDPOINTS.getAllContracts);
            // setContracts(response.data);
        } catch (error) {
            console.error('Error fetching contracts:', error);
            setError('Không thể tải dữ liệu hợp đồng');
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (contract: Contract) => {
        setSelectedContract(contract);
        setIsModalOpen(true);
    };

    const handleApprove = async (contractId: string) => {
        try {
            // await api.put(`${API_ENDPOINTS.approveContract}/${contractId}`);
            // Cập nhật state local cho testing
            setContracts(
                contracts.map((contract) =>
                    contract.id === contractId ? { ...contract, status: 'approved' } : contract,
                ),
            );
        } catch (error) {
            console.error('Error approving contract:', error);
            setError('Không thể duyệt hợp đồng');
        }
    };

    const handleReject = async (contractId: string) => {
        try {
            // await api.put(`${API_ENDPOINTS.rejectContract}/${contractId}`);
            // Cập nhật state local cho testing
            setContracts(
                contracts.map((contract) =>
                    contract.id === contractId ? { ...contract, status: 'rejected' } : contract,
                ),
            );
        } catch (error) {
            console.error('Error rejecting contract:', error);
            setError('Không thể từ chối hợp đồng');
        }
    };

    const handleDownload = async (contractId: string) => {
        try {
            // await api.get(`${API_ENDPOINTS.downloadContract}/${contractId}`, { responseType: 'blob' });
            // Xử lý tải file
            console.log('Downloading contract:', contractId);
        } catch (error) {
            console.error('Error downloading contract:', error);
            setError('Không thể tải hợp đồng');
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
        });
    };

    const filteredContracts =
        statusFilter === 'all' ? contracts : contracts.filter((contract) => contract.status === statusFilter);

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
                <h2 className="text-2xl font-bold mb-6">Quản lý hợp đồng</h2>

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
                        <option value="completed">Hoàn thành</option>
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
                                Số hợp đồng
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Bên mua
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Bên bán
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tổng giá trị
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Trạng thái
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ngày bắt đầu
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ngày kết thúc
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredContracts.map((contract) => (
                            <tr key={contract.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{contract.contractNumber}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{contract.buyerCompany}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{contract.sellerCompany}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{formatCurrency(contract.totalAmount)}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${
                                            contract.status === 'approved'
                                                ? 'bg-green-100 text-green-800'
                                                : contract.status === 'pending'
                                                  ? 'bg-yellow-100 text-yellow-800'
                                                  : contract.status === 'rejected'
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-blue-100 text-blue-800'
                                        }`}
                                    >
                                        {contract.status === 'approved'
                                            ? 'Đã duyệt'
                                            : contract.status === 'pending'
                                              ? 'Chờ duyệt'
                                              : contract.status === 'rejected'
                                                ? 'Đã từ chối'
                                                : 'Hoàn thành'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{formatDate(contract.startDate)}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{formatDate(contract.endDate)}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleViewDetails(contract)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        <FaEye className="inline-block" />
                                    </button>
                                    <button
                                        onClick={() => handleDownload(contract.id)}
                                        className="text-gray-600 hover:text-gray-900 mr-3"
                                    >
                                        <FaFileDownload className="inline-block" />
                                    </button>
                                    {contract.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => handleApprove(contract.id)}
                                                className="text-green-600 hover:text-green-900 mr-3"
                                            >
                                                <FaCheck className="inline-block" />
                                            </button>
                                            <button
                                                onClick={() => handleReject(contract.id)}
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

            {/* Modal xem chi tiết hợp đồng */}
            {isModalOpen && selectedContract && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Chi tiết hợp đồng</h3>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="contractNumber" className="block text-sm font-medium text-gray-700">
                                        Số hợp đồng
                                    </label>
                                    <p id="contractNumber" className="mt-1 text-sm text-gray-900">
                                        {selectedContract.contractNumber}
                                    </p>
                                </div>
                                <div>
                                    <label htmlFor="buyerCompany" className="block text-sm font-medium text-gray-700">
                                        Bên mua
                                    </label>
                                    <p id="buyerCompany" className="mt-1 text-sm text-gray-900">
                                        {selectedContract.buyerCompany}
                                    </p>
                                </div>
                                <div>
                                    <label htmlFor="sellerCompany" className="block text-sm font-medium text-gray-700">
                                        Bên bán
                                    </label>
                                    <p id="sellerCompany" className="mt-1 text-sm text-gray-900">
                                        {selectedContract.sellerCompany}
                                    </p>
                                </div>
                                <div>
                                    <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700">
                                        Tổng giá trị
                                    </label>
                                    <p id="totalAmount" className="mt-1 text-sm text-gray-900">
                                        {formatCurrency(selectedContract.totalAmount)}
                                    </p>
                                </div>
                                <div>
                                    <label htmlFor="contractStatus" className="block text-sm font-medium text-gray-700">
                                        Trạng thái
                                    </label>
                                    <p id="contractStatus" className="mt-1 text-sm text-gray-900">
                                        {selectedContract.status === 'approved'
                                            ? 'Đã duyệt'
                                            : selectedContract.status === 'pending'
                                              ? 'Chờ duyệt'
                                              : selectedContract.status === 'rejected'
                                                ? 'Đã từ chối'
                                                : 'Hoàn thành'}
                                    </p>
                                </div>
                                <div>
                                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                                        Ngày bắt đầu
                                    </label>
                                    <p id="startDate" className="mt-1 text-sm text-gray-900">
                                        {formatDate(selectedContract.startDate)}
                                    </p>
                                </div>
                                <div>
                                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                                        Ngày kết thúc
                                    </label>
                                    <p id="endDate" className="mt-1 text-sm text-gray-900">
                                        {formatDate(selectedContract.endDate)}
                                    </p>
                                </div>
                                <div>
                                    <label htmlFor="createdAt" className="block text-sm font-medium text-gray-700">
                                        Ngày tạo
                                    </label>
                                    <p id="createdAt" className="mt-1 text-sm text-gray-900">
                                        {formatDate(selectedContract.createdAt)}
                                    </p>
                                </div>
                                <div>
                                    <label htmlFor="updatedAt" className="block text-sm font-medium text-gray-700">
                                        Cập nhật lần cuối
                                    </label>
                                    <p id="updatedAt" className="mt-1 text-sm text-gray-900">
                                        {formatDate(selectedContract.updatedAt)}
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
