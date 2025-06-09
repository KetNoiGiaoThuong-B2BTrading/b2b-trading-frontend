import { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import { FaUsers, FaBox, FaChartLine, FaEye } from 'react-icons/fa';
import api from '../../lib/axios';
import { API_ENDPOINTS } from '../../lib/apiConfig';

interface TimeRange {
    label: string;
    value: 'day' | 'week' | 'month' | 'year';
}

interface ChartData {
    name: string;
    value: number;
}

interface StatisticsData {
    newCompanies: ChartData[];
    totalProducts: ChartData[];
    userActivities: ChartData[];
    pageViews: ChartData[];
    categoryDistribution: ChartData[];
}

const timeRanges: TimeRange[] = [
    { label: 'Ngày', value: 'day' },
    { label: 'Tuần', value: 'week' },
    { label: 'Tháng', value: 'month' },
    { label: 'Năm', value: 'year' },
];

// Dữ liệu mẫu cho testing
const mockData: StatisticsData = {
    newCompanies: [
        { name: 'T1', value: 30 },
        { name: 'T2', value: 45 },
        { name: 'T3', value: 60 },
        { name: 'T4', value: 75 },
        { name: 'T5', value: 90 },
        { name: 'T6', value: 120 },
    ],
    totalProducts: [
        { name: 'T1', value: 100 },
        { name: 'T2', value: 150 },
        { name: 'T3', value: 200 },
        { name: 'T4', value: 250 },
        { name: 'T5', value: 300 },
        { name: 'T6', value: 350 },
    ],
    userActivities: [
        { name: 'T1', value: 500 },
        { name: 'T2', value: 600 },
        { name: 'T3', value: 700 },
        { name: 'T4', value: 800 },
        { name: 'T5', value: 900 },
        { name: 'T6', value: 1000 },
    ],
    pageViews: [
        { name: 'T1', value: 1000 },
        { name: 'T2', value: 1200 },
        { name: 'T3', value: 1400 },
        { name: 'T4', value: 1600 },
        { name: 'T5', value: 1800 },
        { name: 'T6', value: 2000 },
    ],
    categoryDistribution: [
        { name: 'Máy móc', value: 400 },
        { name: 'Vật tư', value: 300 },
        { name: 'Dịch vụ', value: 200 },
        { name: 'Khác', value: 100 },
    ],
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function StatisticsManagement() {
    const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>(timeRanges[2]); // Mặc định là tháng
    const [statisticsData, setStatisticsData] = useState<StatisticsData>(mockData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchStatisticsData();
    }, [selectedTimeRange]);

    const fetchStatisticsData = async () => {
        try {
            setLoading(true);
            // const response = await api.get(`${API_ENDPOINTS.getStatistics}?timeRange=${selectedTimeRange.value}`);
            // setStatisticsData(response.data);
            setStatisticsData(mockData); // Sử dụng dữ liệu mẫu cho testing
        } catch (error) {
            console.error('Error fetching statistics:', error);
            setError('Không thể tải dữ liệu thống kê');
        } finally {
            setLoading(false);
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
                <h1 className="text-2xl font-bold text-gray-800">Thống kê và báo cáo</h1>
                <p className="text-gray-600">Xem các biểu đồ thống kê theo thời gian</p>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                    <p>{error}</p>
                </div>
            )}

            {/* Bộ lọc thời gian */}
            <div className="mb-6">
                <div className="flex space-x-4">
                    {timeRanges.map((range) => (
                        <button
                            key={range.value}
                            onClick={() => setSelectedTimeRange(range)}
                            className={`px-4 py-2 rounded-md ${
                                selectedTimeRange.value === range.value
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {range.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Biểu đồ doanh nghiệp mới */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center mb-4">
                        <FaUsers className="text-blue-500 mr-2" />
                        <h2 className="text-lg font-semibold">Doanh nghiệp đăng ký mới</h2>
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={statisticsData.newCompanies}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="value" stroke="#0088FE" name="Số lượng" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Biểu đồ sản phẩm */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center mb-4">
                        <FaBox className="text-green-500 mr-2" />
                        <h2 className="text-lg font-semibold">Tổng số sản phẩm</h2>
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={statisticsData.totalProducts}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#00C49F" name="Số lượng" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Biểu đồ hoạt động người dùng */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center mb-4">
                        <FaChartLine className="text-purple-500 mr-2" />
                        <h2 className="text-lg font-semibold">Hoạt động người dùng</h2>
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={statisticsData.userActivities}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="value" stroke="#8884d8" name="Số lượng" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Biểu đồ lượt truy cập */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center mb-4">
                        <FaEye className="text-yellow-500 mr-2" />
                        <h2 className="text-lg font-semibold">Lượt truy cập</h2>
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={statisticsData.pageViews}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="value" stroke="#FFBB28" name="Số lượng" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Biểu đồ phân bố danh mục */}
                <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
                    <h2 className="text-lg font-semibold mb-4">Phân bố theo danh mục</h2>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statisticsData.categoryDistribution}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {statisticsData.categoryDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
