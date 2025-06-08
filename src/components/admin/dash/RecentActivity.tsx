import React from 'react';

interface Activity {
    id: number;
    type: string;
    description: string;
    time: string;
}

interface RecentActivityProps {
    activities?: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities = [] }) => {
    // Đảm bảo activities luôn là một mảng
    const safeActivities = Array.isArray(activities) ? activities : [];

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Hoạt động gần đây</h2>
            <div className="space-y-4">
                {safeActivities.length > 0 ? (
                    safeActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-4">
                            <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                            <div>
                                <p className="text-sm text-gray-600">{activity.description}</p>
                                <p className="text-xs text-gray-400">{activity.time}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">Không có hoạt động nào gần đây</p>
                )}
            </div>
        </div>
    );
};

export default RecentActivity;
