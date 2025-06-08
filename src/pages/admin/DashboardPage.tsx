import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { FaBuilding, FaShoppingCart, FaBox, FaChartLine, FaUsers, FaFileContract } from 'react-icons/fa';

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
    totalQuotes: number;
    totalRevenue: number;
    dailyActiveUsers: number;
    monthlyActiveUsers: number;
}

interface Activity {
    id: number;
    type: string;
    description: string;
    time: string;
}

interface ChartData {
    name: string;
    value: number;
}

// Dữ liệu giả cho dashboard
const mockStats: DashboardStats = {
    totalCompanies: 1234,
    totalProducts: 5678,
    totalQuotes: 890,
    totalRevenue: 123456789,
    dailyActiveUsers: 234,
    monthlyActiveUsers: 1234,
};

const mockActivities: Activity[] = [
    {
        id: 1,
        type: 'company',
        description: 'Doanh nghiệp mới đã đăng ký: Công ty TNHH ABC',
        time: '5 phút trước',
    },
    {
        id: 2,
        type: 'quote',
        description: 'Yêu cầu báo giá mới từ Công ty XYZ',
        time: '10 phút trước',
    },
    {
        id: 3,
        type: 'product',
        description: 'Sản phẩm mới đã được thêm vào: Máy CNC XYZ',
        time: '15 phút trước',
    },
    {
        id: 4,
        type: 'contract',
        description: 'Hợp đồng mới đã được ký kết',
        time: '20 phút trước',
    },
    {
        id: 5,
        type: 'company',
        description: 'Doanh nghiệp đã cập nhật thông tin',
        time: '25 phút trước',
    },
];

// Dữ liệu giả cho biểu đồ
const mockMonthlyCompanies: ChartData[] = [
    { name: 'T1', value: 30 },
    { name: 'T2', value: 45 },
    { name: 'T3', value: 60 },
    { name: 'T4', value: 75 },
    { name: 'T5', value: 90 },
    { name: 'T6', value: 120 },
];

const mockCategoryTransactions: ChartData[] = [
    { name: 'Máy móc', value: 400 },
    { name: 'Vật tư', value: 300 },
    { name: 'Dịch vụ', value: 200 },
    { name: 'Khác', value: 100 },
];

const mockOrderTimeline: ChartData[] = [
    { name: 'T1', value: 20 },
    { name: 'T2', value: 35 },
    { name: 'T3', value: 25 },
    { name: 'T4', value: 40 },
    { name: 'T5', value: 30 },
    { name: 'T6', value: 45 },
];

export default function DashboardPage() {
    const [userData, setUserData] = useState<User | null>(null);
    const [stats, setStats] = useState<DashboardStats>(mockStats);
    const [activities, setActivities] = useState<Activity[]>(mockActivities);
    const [monthlyCompanies, setMonthlyCompanies] = useState<ChartData[]>(mockMonthlyCompanies);
    const [categoryTransactions, setCategoryTransactions] = useState<ChartData[]>(mockCategoryTransactions);
    const [orderTimeline, setOrderTimeline] = useState<ChartData[]>(mockOrderTimeline);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user data
                const userResponse = await api.get(API_ENDPOINTS.me);
                setUserData(userResponse.data);

                // Fetch dashboard stats
                const statsResponse = await api.get(API_ENDPOINTS.getDashboardStats);
                if (statsResponse.data) {
                    setStats(statsResponse.data);
                }

                // Fetch recent activities
                const activitiesResponse = await api.get(API_ENDPOINTS.getRecentActivities);
                const activitiesData = activitiesResponse.data;
                if (Array.isArray(activitiesData) && activitiesData.length > 0) {
                    setActivities(activitiesData);
                }

                // Fetch chart data
                const chartsResponse = await api.get(API_ENDPOINTS.getDashboardCharts);
                if (chartsResponse.data) {
                    setMonthlyCompanies(chartsResponse.data.monthlyCompanies || mockMonthlyCompanies);
                    setCategoryTransactions(chartsResponse.data.categoryTransactions || mockCategoryTransactions);
                    setOrderTimeline(chartsResponse.data.orderTimeline || mockOrderTimeline);
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setError('Không thể tải dữ liệu từ server. Đang hiển thị dữ liệu mẫu.');
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
                    value={stats.totalCompanies || 0}
                    icon={<FaBuilding className="text-white text-xl" />}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Tổng sản phẩm"
                    value={stats.totalProducts || 0}
                    icon={<FaBox className="text-white text-xl" />}
                    color="bg-green-500"
                />
                <StatCard
                    title="Yêu cầu báo giá"
                    value={stats.totalQuotes || 0}
                    icon={<FaFileContract className="text-white text-xl" />}
                    color="bg-purple-500"
                />
                <StatCard
                    title="Doanh thu"
                    value={formatCurrency(stats.totalRevenue)}
                    icon={<FaChartLine className="text-white text-xl" />}
                    color="bg-yellow-500"
                />
                <StatCard
                    title="Người dùng hoạt động (ngày)"
                    value={stats.dailyActiveUsers || 0}
                    icon={<FaUsers className="text-white text-xl" />}
                    color="bg-red-500"
                />
                <StatCard
                    title="Người dùng hoạt động (tháng)"
                    value={stats.monthlyActiveUsers || 0}
                    icon={<FaUsers className="text-white text-xl" />}
                    color="bg-indigo-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <RecentActivity activities={activities} />
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Thống kê truy cập</h2>
                    {/* Thêm biểu đồ thống kê truy cập ở đây */}
                </div>
            </div>

            <div className="mt-6">
                <DashboardCharts
                    monthlyCompanies={monthlyCompanies}
                    categoryTransactions={categoryTransactions}
                    orderTimeline={orderTimeline}
                />
            </div>
        </div>
    );
}
