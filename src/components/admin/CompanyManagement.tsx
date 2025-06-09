import { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import api from '../../lib/axios';
import { API_ENDPOINTS } from '../../lib/apiConfig';

interface Company {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    status: 'pending' | 'active' | 'rejected';
    createdAt: string;
}

// Dữ liệu mẫu cho testing
const mockCompanies: Company[] = [
    {
        id: '1',
        name: 'Công ty TNHH ABC',
        email: 'abc@example.com',
        phone: '0123456789',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        status: 'pending',
        createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'Công ty XYZ',
        email: 'xyz@example.com',
        phone: '0987654321',
        address: '456 Đường XYZ, Quận 2, TP.HCM',
        status: 'active',
        createdAt: new Date().toISOString(),
    },
];

export default function CompanyManagement() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            // Sử dụng dữ liệu mẫu cho testing
            setCompanies(mockCompanies);

            // Comment lại phần gọi API thực tế
            // const response = await api.get(API_ENDPOINTS.getAllCompanies);
            // if (Array.isArray(response.data)) {
            //     setCompanies(response.data);
            // } else {
            //     setCompanies([]);
            //     setError('Dữ liệu không hợp lệ');
            // }
        } catch (error) {
            console.error('Error fetching companies:', error);
            setError('Không thể tải danh sách doanh nghiệp');
            setCompanies([]);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (companyId: string) => {
        try {
            // await api.put(`${API_ENDPOINTS.updateCompanyStatus}/${companyId}`, {
            //     status: 'active'
            // });
            // Cập nhật state local cho testing
            setCompanies(
                companies.map((company) => (company.id === companyId ? { ...company, status: 'active' } : company)),
            );
        } catch (error) {
            console.error('Error approving company:', error);
            setError('Không thể duyệt doanh nghiệp');
        }
    };

    const handleReject = async (companyId: string) => {
        try {
            // await api.put(`${API_ENDPOINTS.updateCompanyStatus}/${companyId}`, {
            //     status: 'rejected'
            // });
            // Cập nhật state local cho testing
            setCompanies(
                companies.map((company) => (company.id === companyId ? { ...company, status: 'rejected' } : company)),
            );
        } catch (error) {
            console.error('Error rejecting company:', error);
            setError('Không thể từ chối doanh nghiệp');
        }
    };

    const handleEdit = (company: Company) => {
        setSelectedCompany(company);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (companyId: string) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa doanh nghiệp này?')) {
            try {
                // await api.delete(`${API_ENDPOINTS.deleteCompany}/${companyId}`);
                // Cập nhật state local cho testing
                setCompanies(companies.filter((company) => company.id !== companyId));
            } catch (error) {
                console.error('Error deleting company:', error);
                setError('Không thể xóa doanh nghiệp');
            }
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
            <h2 className="text-2xl font-bold mb-6">Quản lý doanh nghiệp</h2>

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
                                Tên doanh nghiệp
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Số điện thoại
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
                        {companies.map((company) => (
                            <tr key={company.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{company.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{company.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{company.phone}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${
                                            company.status === 'active'
                                                ? 'bg-green-100 text-green-800'
                                                : company.status === 'pending'
                                                  ? 'bg-yellow-100 text-yellow-800'
                                                  : 'bg-red-100 text-red-800'
                                        }`}
                                    >
                                        {company.status === 'active'
                                            ? 'Đã duyệt'
                                            : company.status === 'pending'
                                              ? 'Chờ duyệt'
                                              : 'Đã từ chối'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(company.createdAt).toLocaleDateString('vi-VN')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {company.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => handleApprove(company.id)}
                                                className="text-green-600 hover:text-green-900 mr-3"
                                            >
                                                <FaCheck className="inline-block" />
                                            </button>
                                            <button
                                                onClick={() => handleReject(company.id)}
                                                className="text-red-600 hover:text-red-900 mr-3"
                                            >
                                                <FaTimes className="inline-block" />
                                            </button>
                                        </>
                                    )}
                                    <button
                                        onClick={() => handleEdit(company)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        <FaEdit className="inline-block" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(company.id)}
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

            {/* Modal chỉnh sửa doanh nghiệp */}
            {isEditModalOpen && selectedCompany && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                                Chỉnh sửa thông tin doanh nghiệp
                            </h3>
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                                        Tên doanh nghiệp
                                    </label>
                                    <input
                                        id="companyName"
                                        type="text"
                                        value={selectedCompany.name}
                                        onChange={(e) =>
                                            setSelectedCompany({ ...selectedCompany, name: e.target.value })
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="companyEmail" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        id="companyEmail"
                                        type="email"
                                        value={selectedCompany.email}
                                        onChange={(e) =>
                                            setSelectedCompany({ ...selectedCompany, email: e.target.value })
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="companyPhone" className="block text-sm font-medium text-gray-700">
                                        Số điện thoại
                                    </label>
                                    <input
                                        id="companyPhone"
                                        type="tel"
                                        value={selectedCompany.phone}
                                        onChange={(e) =>
                                            setSelectedCompany({ ...selectedCompany, phone: e.target.value })
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700">
                                        Địa chỉ
                                    </label>
                                    <textarea
                                        id="companyAddress"
                                        value={selectedCompany.address}
                                        onChange={(e) =>
                                            setSelectedCompany({ ...selectedCompany, address: e.target.value })
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
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
