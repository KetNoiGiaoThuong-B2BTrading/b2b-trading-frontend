import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm">{title}</p>
                    <h3 className="text-2xl font-bold mt-2">{value}</h3>
                </div>
                <div className={`p-3 rounded-full ${color}`}>{icon}</div>
            </div>
        </div>
    );
};

export default StatCard;
