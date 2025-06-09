import { useState } from 'react';
import CompanyManagement from '../../components/admin/CompanyManagement';
import UserManagement from '../../components/admin/UserManagement';

export default function AccountPage() {
    const [activeTab, setActiveTab] = useState<'users' | 'companies'>('users');

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Quản lý tài khoản</h1>
            </div>

            <div className="mb-6">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`${
                                activeTab === 'users'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Người dùng
                        </button>
                        <button
                            onClick={() => setActiveTab('companies')}
                            className={`${
                                activeTab === 'companies'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Doanh nghiệp
                        </button>
                    </nav>
                </div>
            </div>

            <div className="mt-6">{activeTab === 'users' ? <UserManagement /> : <CompanyManagement />}</div>
        </div>
    );
}
