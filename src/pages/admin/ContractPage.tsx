import { useState } from 'react';
import QuoteManagement from '../../components/admin/QuoteManagement';
import ContractManagement from '../../components/admin/ContractManagement';

export default function ContractPage() {
    const [activeTab, setActiveTab] = useState<'quotes' | 'contracts'>('quotes');

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('quotes')}
                            className={`${
                                activeTab === 'quotes'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Quản lý báo giá
                        </button>
                        <button
                            onClick={() => setActiveTab('contracts')}
                            className={`${
                                activeTab === 'contracts'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Quản lý hợp đồng
                        </button>
                    </nav>
                </div>
            </div>

            {activeTab === 'quotes' ? <QuoteManagement /> : <ContractManagement />}
        </div>
    );
}
