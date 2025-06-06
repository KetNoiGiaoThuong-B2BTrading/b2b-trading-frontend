import { useEffect, useState } from 'react';
import InputField from '../../components/common/InputField';
import { cn } from '../../lib/utils';
import api from '../../lib/axios';
import { API_ENDPOINTS } from '../../lib/apiConfig';
import { useToast } from '../../context/ToastContext';
import Cookies from 'js-cookie';

export default function AccountInfo() {
    const { showToast } = useToast();
    const [form, setForm] = useState({
        userID: 0,
        companyID: 0,
        fullName: '',
        email: '',
        role: '',
        status: 'Active',
    });

    const fetchAccountInfo = async () => {
        const data = JSON.parse(Cookies.get('data') || '{}');
        setForm(data);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const badgeClass = (type: 'status' | 'role', value: string) => {
        if (type === 'status') {
            let colorClass = 'bg-gray-100 text-gray-800';
            if (value === 'Active') colorClass = 'bg-green-100 text-green-800';
            else if (value === 'Not Activated') colorClass = 'bg-red-100 text-red-800';

            return cn('inline-block px-3 py-1 rounded-full text-sm font-medium ms-3', colorClass);
        }

        if (type === 'role') {
            let colorClass = 'bg-gray-200 text-gray-800';
            if (value === 'Admin') colorClass = 'bg-green-100 text-green-800';
            else if (value === 'Company') colorClass = 'bg-blue-100 text-blue-800';

            return cn('inline-block px-3 py-1 rounded-full text-sm font-medium ms-3', colorClass);
        }
    };
    const handleUpdate = async () => {
        const res = await api.put(API_ENDPOINTS.updateUser(form.userID), form);
        if (res.status !== 200) {
            showToast({
                title: 'Cập nhật thông tin',
                message: 'Cập nhật thông tin thất bại',
                type: 'error',
            });
        } else {
            showToast({
                title: 'Cập nhật thông tin',
                message: 'Cập nhật thông tin thành công',
                type: 'success',
            });
        }
    };

    useEffect(() => {
        fetchAccountInfo();
    }, []);

    return (
        <div className="w-full bg-blue-50 rounded-lg p-6 space-y-4">
            <div className="flex items-center">
                <h2 className="text-lg font-semibold">Edit Account Information</h2>
                <span className={badgeClass('role', form.role)}>{form.role}</span>
                <span className={badgeClass('status', form.status)}>{form.status}</span>
            </div>
            <div className="py-4 grid grid-cols-1 gap-4">
                <InputField
                    name="companyID"
                    label="Company ID"
                    value={form.companyID?.toString() ?? ''}
                    onChange={handleChange}
                    type="text"
                    className="outline-none"
                    readOnly
                />
                <InputField name="fullName" label="Full Name" value={form.fullName} onChange={handleChange} />
                <InputField name="email" label="Email" value={form.email} onChange={handleChange} type="email" />
            </div>
            <div className="flex gap-4 justify-end">
                <button className="text-blue-600 px-4 py-2 rounded hover:cursor-pointer hover:bg-gray-200">
                    Cancel
                </button>
                <button
                    onClick={handleUpdate}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-blue-700"
                >
                    Save changes
                </button>
            </div>
        </div>
    );
}
