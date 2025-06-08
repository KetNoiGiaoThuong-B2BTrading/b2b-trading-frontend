import React from 'react';
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

interface ChartData {
    name: string;
    value: number;
}

interface DashboardChartsProps {
    monthlyCompanies: ChartData[];
    categoryTransactions: ChartData[];
    orderTimeline: ChartData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const DashboardCharts: React.FC<DashboardChartsProps> = ({ monthlyCompanies, categoryTransactions, orderTimeline }) => {
    return (
        <div className="space-y-6">
            {/* Biểu đồ doanh nghiệp mới theo tháng */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Doanh nghiệp mới theo tháng</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyCompanies}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip
                                formatter={(value: number) => [`${value} doanh nghiệp`, 'Số lượng']}
                                labelFormatter={(label) => `Tháng ${label}`}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#8884d8"
                                name="Số doanh nghiệp"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Biểu đồ giao dịch theo danh mục */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Giao dịch theo danh mục</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={categoryTransactions}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {categoryTransactions.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => [`${value} giao dịch`, 'Số lượng']} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Biểu đồ đơn hàng theo thời gian */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Đơn hàng theo thời gian</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={orderTimeline}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip
                                formatter={(value: number) => [`${value} đơn hàng`, 'Số lượng']}
                                labelFormatter={(label) => `Tháng ${label}`}
                            />
                            <Legend />
                            <Bar dataKey="value" fill="#82ca9d" name="Số đơn hàng" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardCharts;
