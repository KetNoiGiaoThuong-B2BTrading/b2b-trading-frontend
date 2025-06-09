import { useEffect, useState } from 'react';
import { FaBuilding, FaBox, FaChartLine, FaUsers, FaFileContract } from 'react-icons/fa';
import Cookies from 'js-cookie';

import api from '../../lib/axios';
import { API_ENDPOINTS } from '../../lib/apiConfig';
import StatCard from '../../components/admin/dash/StatCard';
import RecentActivity from '../../components/admin/dash/RecentActivity';
import DashboardCharts from '../../components/admin/dash/DashboardCharts';

interface User {
    userId: string;
    fullName: string;
    email: string;
}

interface DashboardStats {
    totalCompanies: number;
    totalProducts: number;
    totalContracts: number;
    totalUsers: number;
    pendingVerifications: number;
    activeContracts: number;
    totalRevenue: number;
}

interface Activity {
    action: string;
    actionTime: string;
    notes: string;
    userName: string;
    contractTitle: string;
}

interface ChartData {
    year: number;
    month: number;
    contractCount: number;
    totalValue: number;
}

// Dữ liệu giả cho dashboard
const mockStats: DashboardStats = {
    totalCompanies: 1234,
    totalProducts: 5678,
    totalContracts: 890,
    totalUsers: 234,
    pendingVerifications: 1234,
    activeContracts: 1234,
    totalRevenue: 123456789,
};

const mockActivities: Activity[] = [
    {
        action: 'company',
        actionTime: '5 phút trước',
        notes: 'Doanh nghiệp mới đã đăng ký: Công ty TNHH ABC',
        userName: '',
        contractTitle: '',
    },
    {
        action: 'quote',
        actionTime: '10 phút trước',
        notes: 'Yêu cầu báo giá mới từ Công ty XYZ',
        userName: '',
        contractTitle: '',
    },
    {
        action: 'product',
        actionTime: '15 phút trước',
        notes: 'Sản phẩm mới đã được thêm vào: Máy CNC XYZ',
        userName: '',
        contractTitle: '',
    },
    {
        action: 'contract',
        actionTime: '20 phút trước',
        notes: 'Hợp đồng mới đã được ký kết',
        userName: '',
        contractTitle: '',
    },
    {
        action: 'company',
        actionTime: '25 phút trước',
        notes: 'Doanh nghiệp đã cập nhật thông tin',
        userName: '',
        contractTitle: '',
    },
];

// Dữ liệu giả cho biểu đồ
const mockMonthlyCompanies: ChartData[] = [
    { year: 2024, month: 1, contractCount: 30, totalValue: 123456 },
    { year: 2024, month: 2, contractCount: 45, totalValue: 185184 },
    { year: 2024, month: 3, contractCount: 60, totalValue: 246912 },
    { year: 2024, month: 4, contractCount: 75, totalValue: 308640 },
    { year: 2024, month: 5, contractCount: 90, totalValue: 370368 },
    { year: 2024, month: 6, contractCount: 120, totalValue: 493824 },
];

const mockCategoryTransactions: ChartData[] = [
    { year: 2024, month: 1, contractCount: 400, totalValue: 160000 },
    { year: 2024, month: 2, contractCount: 300, totalValue: 120000 },
    { year: 2024, month: 3, contractCount: 200, totalValue: 80000 },
    { year: 2024, month: 4, contractCount: 100, totalValue: 40000 },
];

const mockOrderTimeline: ChartData[] = [
    { year: 2024, month: 1, contractCount: 20, totalValue: 8000 },
    { year: 2024, month: 2, contractCount: 35, totalValue: 14000 },
    { year: 2024, month: 3, contractCount: 25, totalValue: 10000 },
    { year: 2024, month: 4, contractCount: 40, totalValue: 16000 },
    { year: 2024, month: 5, contractCount: 30, totalValue: 12000 },
    { year: 2024, month: 6, contractCount: 45, totalValue: 18000 },
];

export default function DashboardPage() {
    const [userData, setUserData] = useState<User | null>(null);
    const [stats, setStats] = useState<DashboardStats>({
        totalCompanies: 0,
        totalProducts: 0,
        totalContracts: 0,
        totalUsers: 0,
        pendingVerifications: 0,
        activeContracts: 0,
        totalRevenue: 0,
    });
    const [activities, setActivities] = useState<Activity[]>([]);
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user data
                const userData = Cookies.get('data');
                const userResponse = JSON.parse(userData || '{}');
                setUserData(userResponse.data);

                // Fetch dashboard stats
                const statsResponse = await api.get(API_ENDPOINTS.getDashboardStats);
                if (statsResponse.data) {
                    setStats(statsResponse.data);
                }

                // Fetch recent activities
                const activitiesResponse = await api.get(API_ENDPOINTS.getRecentActivities);
                if (Array.isArray(activitiesResponse.data)) {
                    setActivities(activitiesResponse.data);
                }

                // Fetch chart data
                const chartsResponse = await api.get(API_ENDPOINTS.getDashboardCharts);
                if (Array.isArray(chartsResponse.data)) {
                    setChartData(chartsResponse.data);
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setError('Không thể tải dữ liệu từ server.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const formatCurrency = (value: number) => {
        return (
            value?.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }) || '0đ'
        );
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {error && (
                <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
                    <p>{error}</p>
                </div>
            )}

            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                {userData && <p className="text-gray-600">Xin chào, {userData.fullName}!</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <StatCard
                    title="Tổng doanh nghiệp"
                    value={stats.totalCompanies}
                    icon={<FaBuilding className="text-white text-xl" />}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Tổng sản phẩm"
                    value={stats.totalProducts}
                    icon={<FaBox className="text-white text-xl" />}
                    color="bg-green-500"
                />
                <StatCard
                    title="Tổng hợp đồng"
                    value={stats.totalContracts}
                    icon={<FaFileContract className="text-white text-xl" />}
                    color="bg-purple-500"
                />
                <StatCard
                    title="Tổng người dùng"
                    value={stats.totalUsers}
                    icon={<FaUsers className="text-white text-xl" />}
                    color="bg-red-500"
                />
                <StatCard
                    title="Doanh nghiệp chờ xác minh"
                    value={stats.pendingVerifications}
                    icon={<FaBuilding className="text-white text-xl" />}
                    color="bg-yellow-500"
                />
                <StatCard
                    title="Hợp đồng đang thực hiện"
                    value={stats.activeContracts}
                    icon={<FaFileContract className="text-white text-xl" />}
                    color="bg-indigo-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <RecentActivity activities={activities} />
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Thống kê doanh thu</h2>
                    <DashboardCharts chartData={chartData} />
                </div>
            </div>
        </div>
    );
}
