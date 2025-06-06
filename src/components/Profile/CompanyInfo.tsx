import { useEffect, useState } from 'react';
import InputField from '../../components/common/InputField';
import api from '../../lib/axios';
import { API_ENDPOINTS } from '../../lib/apiConfig';
import { useToast } from '../../context/ToastContext';
import Cookies from 'js-cookie';

export default function CompanyInfo() {
    const { showToast } = useToast();

    const businessSectors = [
        { label: 'Software Development', value: 'software' },
        { label: 'Construction', value: 'construction' },
        { label: 'Manufacturing', value: 'manufacturing' },
        { label: 'Education', value: 'education' },
        { label: 'Finance', value: 'Finance' },
        { label: 'Agriculture', value: 'agriculture' },
        { label: 'Logistics', value: 'logistics' },
    ];

    const [form, setForm] = useState({
        companyName: '',
        taxCode: '',
        businessSector: '',
        address: '',
        representative: '',
        email: '',
        phoneNumber: '',
        legalDocuments: '',
        verificationStatus: '',
    });
    const [user, setUser] = useState({
        userID: 0,
        companyID: 0,
        fullName: '',
        email: '',
        role: '',
        status: 'Active',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const res = await api.put(API_ENDPOINTS.updateCompanyInfo(user.companyID), form);
            showToast({
                title: 'Cập nhật thông tin',
                message: res.status === 200 ? 'Cập nhật thông tin thành công' : 'Cập nhật thông tin thất bại',
                type: res.status === 200 ? 'success' : 'error',
            });
        } catch (error) {
            showToast({
                title: 'Lỗi hệ thống',
                message: 'Không thể cập nhật thông tin công ty.',
                type: 'error',
            });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = JSON.parse(Cookies.get('data') || '{}');
                const userData = data;
                setUser(userData);

                if (userData.companyID) {
                    const companyRes = await api.get(API_ENDPOINTS.getCompanyInfoById(userData.companyID));
                    setForm(companyRes.data.data);
                }
            } catch (err) {
                showToast({
                    title: 'Lỗi tải dữ liệu',
                    message: 'Không thể tải thông tin người dùng hoặc công ty.',
                    type: 'error',
                });
            }
        };
        fetchData();
    }, [showToast]);

    return (
        <div className="w-full bg-blue-50 rounded-lg p-6 space-y-4">
            <div className="flex items-center">
                <h2 className="text-lg font-semibold">Company Information</h2>
                <span
                    className={`text-sm font-medium px-3 py-1 mx-3 rounded-full ${
                        form.verificationStatus === 'Verified'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                    }`}
                >
                    {form.verificationStatus}
                </span>
            </div>
            <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-3 space-y-4">
                <InputField name="companyName" label="Company Name" value={form.companyName} onChange={handleChange} />
                <InputField name="taxCode" label="Tax Code" value={form.taxCode} onChange={handleChange} />
                <div>
                    <label htmlFor="businessSector" className="block mb-1 text-sm font-medium text-gray-700">
                        Business Sector
                    </label>
                    <select
                        id="businessSector"
                        name="businessSector"
                        value={form.businessSector}
                        onChange={handleChange}
                        className="w-full rounded border border-gray-300 px-3 py-2"
                    >
                        <option value="">-- Select sector --</option>
                        {businessSectors.map((sector) => (
                            <option key={sector.value} value={sector.value}>
                                {sector.label}
                            </option>
                        ))}
                    </select>
                </div>
                <InputField name="address" label="Address" value={form.address} onChange={handleChange} />
                <InputField
                    name="representative"
                    label="Representative"
                    value={form.representative}
                    onChange={handleChange}
                />
                <InputField name="email" label="Email" type="email" value={form.email} onChange={handleChange} />
                <InputField name="phoneNumber" label="Phone Number" value={form.phoneNumber} onChange={handleChange} />
                <InputField
                    name="legalDocuments"
                    label="Legal Documents"
                    value={form.legalDocuments}
                    onChange={handleChange}
                />
            </div>
            <div className="flex gap-4 justify-end">
                <button className="text-blue-600 px-4 py-2 rounded hover:bg-gray-200 hover:cursor-pointer">
                    Cancel
                </button>
                <button
                    onClick={handleUpdate}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 hover:cursor-pointer"
                >
                    Save changes
                </button>
            </div>
        </div>
    );
}
