import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../../lib/axios';
import { API_ENDPOINTS } from '../../lib/apiConfig';

interface Company {
    companyID: number;
    companyName: string;
    taxCode: string;
    businessSector: string;
    address: string;
    representative: string;
    email: string;
    phoneNumber: string;
    verificationStatus: string;
    imageCompany: string;
}

// Fallback data nếu API lỗi
const fallbackCompanies: Company[] = [
    {
        companyID: 1,
        companyName: 'Công ty TNHH ABC',
        taxCode: '123456789',
        businessSector: 'Công nghệ',
        address: '123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh',
        representative: 'Nguyễn Văn A',
        email: 'contact@abc.com',
        phoneNumber: '0123456789',
        verificationStatus: 'Đã xác minh',
        imageCompany: 'https://placehold.co/150',
    },
    {
        companyID: 2,
        companyName: 'Công ty TNHH XYZ',
        taxCode: '987654321',
        businessSector: 'Nội thất',
        address: '456 Đường XYZ, Quận ABC, TP. Hồ Chí Minh',
        representative: 'Trần Thị B',
        email: 'info@xyz.com',
        phoneNumber: '0987654321',
        verificationStatus: 'Đã xác minh',
        imageCompany: 'https://placehold.co/150',
    },
];

const CompaniesPage = () => {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState<Company[]>(fallbackCompanies);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await api.get(API_ENDPOINTS.getAllCompanies);
                const data = response?.data;
                if (Array.isArray(data)) {
                    setCompanies(data);
                } else {
                    setCompanies(fallbackCompanies);
                }
            } catch (err) {
                console.error('Error fetching companies:', err);
                setError(true);
                setCompanies(fallbackCompanies);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    // Mảng công ty đã lọc theo lĩnh vực
    const filteredCompanies = companies.filter(
        (c) => selectedSectors.length === 0 || selectedSectors.includes(c.businessSector),
    );

    // Tính tổng số trang
    const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

    // Lấy danh sách công ty theo trang hiện tại
    const currentCompanies = filteredCompanies.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    // Lấy danh sách lĩnh vực duy nhất
    const uniqueSectors = Array.from(new Set(companies.map((c) => c.businessSector)));

    // Hàm reset bộ lọc về mặc định (mảng rỗng) và trở về trang 1
    const resetFilters = () => {
        setSelectedSectors([]);
        setCurrentPage(1);
    };

    // Khi chọn bộ lọc thay đổi, reset về trang 1
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedSectors]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500">
                <span>Trang chủ</span>
                <span className="mx-2">/</span>
                <span className="text-gray-900">Doanh nghiệp</span>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 pb-16">
                <div className="bg-white rounded-lg shadow-sm p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Danh sách doanh nghiệp</h1>

                    {error && <div className="text-red-500 mb-4">Không thể tải danh sách doanh nghiệp từ máy chủ.</div>}

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                        {/* Spinner */}
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
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        {/* Bộ lọc */}
                        <div className="lg:col-span-1">
                            <div className='flex justify-between items-center mt-2 mb-4'>
                                <p className="font-medium text-xl">Bộ lọc</p>
                                <span className="text-blue-600 text-sm cursor-pointer" onClick={resetFilters}>
                                    Xóa hết
                                </span>
                            </div>
                            <p className="text-lg font-semibold mb-2">Lọc theo lĩnh vực</p>
                            <ul className="space-y-2">
                            {uniqueSectors.map((sector, idx) => (
                                <li key={idx} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={sector}
                                    checked={selectedSectors.includes(sector)}
                                    onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedSectors((prev) => [...prev, sector]);
                                    } else {
                                        setSelectedSectors((prev) => prev.filter((s) => s !== sector));
                                    }
                                    }}
                                    className="mr-2"
                                />
                                <label htmlFor={sector} className="text-sm">
                                    {sector}
                                </label>
                                </li>
                            ))}
                            </ul>
                        </div>

                        {/* Danh sách công ty */}
                        <div className="lg:col-span-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {currentCompanies.map((company) => (
                                <button
                                key={company.companyID}
                                onClick={() => navigate(`/companies/${company.companyID}`)}
                                className="w-full text-left bg-white rounded-lg overflow-hidden shadow-xl border border-gray-200 hover:shadow-md hover:cursor-pointer transition-shadow"
                                >
                                <img
                                    src={company.imageCompany || 'https://placehold.co/150'}
                                    alt={company.companyName}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {company.companyName}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-3">{company.address}</p>
                                    <div className="flex items-center justify-between">
                                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                        {company.businessSector}
                                    </span>
                                    <span
                                        className={`text-sm ${
                                        company.verificationStatus === 'Đã xác minh'
                                            ? 'text-green-500'
                                            : company.verificationStatus === 'Chưa xác minh'
                                            ? 'text-red-500'
                                            : 'text-orange-500'
                                        }`}
                                    >
                                        {company.verificationStatus}
                                    </span>
                                    </div>
                                </div>
                                </button>
                            ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                            <div className="mt-6 flex justify-center space-x-2">
                                <button
                                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 rounded border ${
                                    currentPage === 1 ? 'text-gray-400 border-gray-300' : 'hover:bg-gray-200'
                                }`}
                                >
                                Prev
                                </button>

                                {[...Array(totalPages)].map((_, idx) => {
                                const pageNum = idx + 1;
                                return (
                                    <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`px-3 py-1 rounded border ${
                                        currentPage === pageNum
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'hover:bg-gray-200'
                                    }`}
                                    >
                                    {pageNum}
                                    </button>
                                );
                                })}

                                <button
                                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-1 rounded border ${
                                    currentPage === totalPages ? 'text-gray-400 border-gray-300' : 'hover:bg-gray-200'
                                }`}
                                >
                                Next
                                </button>
                            </div>
                            )}
                        </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default CompaniesPage;