import { FaBuilding, FaFileContract, FaBox, FaUser } from 'react-icons/fa';

interface Activity {
    action: string;
    actionTime: string;
    notes: string;
    userName: string;
    contractTitle: string;
}

interface RecentActivityProps {
    activities: Activity[];
}

const getActivityIcon = (action: string) => {
    switch (action.toLowerCase()) {
        case 'company':
            return <FaBuilding className="text-blue-500" />;
        case 'contract':
            return <FaFileContract className="text-green-500" />;
        case 'product':
            return <FaBox className="text-purple-500" />;
        default:
            return <FaUser className="text-gray-500" />;
    }
};

const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) {
        return `${diffInMinutes} phút trước`;
    } else if (diffInMinutes < 1440) {
        return `${Math.floor(diffInMinutes / 60)} giờ trước`;
    } else {
        return `${Math.floor(diffInMinutes / 1440)} ngày trước`;
    }
};

export default function RecentActivity({ activities }: RecentActivityProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Hoạt động gần đây</h2>
            <div className="space-y-4">
                {activities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                        <div className="mt-1">{getActivityIcon(activity.action)}</div>
                        <div className="flex-1">
                            <p className="text-gray-800">{activity.notes}</p>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                <span>{activity.userName}</span>
                                {activity.contractTitle && (
                                    <>
                                        <span className="mx-2">•</span>
                                        <span>{activity.contractTitle}</span>
                                    </>
                                )}
                                <span className="mx-2">•</span>
                                <span>{formatTime(activity.actionTime)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
