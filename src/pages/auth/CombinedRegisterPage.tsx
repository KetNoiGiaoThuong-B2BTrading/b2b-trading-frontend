import { useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../../lib/axios';
import { API_ENDPOINTS } from '../../lib/apiConfig';
import { useToast } from '../../context/ToastContext';
import InputField from '../../components/common/InputField';

export default function CombinedRegisterPage() {
    const navigate = useNavigate();
    const { showToast } = useToast();

    const [formData, setFormData] = useState({
        companyName: '',
        taxCode: '',
        businessSector: '',
        address: '',
        representative: '',
        companyEmail: '',
        phoneNumber: '',
        legalDocuments: '', // mặc định là chuỗi rỗng
        imageCompany: '', // nếu cần
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'company', // gán mặc định hoặc cho người dùng chọn
    });

    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const payload = { ...formData };

            const res = await api.post(API_ENDPOINTS.register, payload);
            const data = res.data;

            showToast({
                title: 'Success',
                message: data.response?.message || 'Registration successful',
                type: 'success',
            });

            navigate(data.redirect_url || '/');
        } catch (error: any) {
            console.error(error);
            setError(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-center text-2xl font-bold">Register Company Account</h2>

                <div className="flex flex-col md:flex-row md:gap-6">
                    {/* Left Column */}
                    <div className="flex flex-col space-y-4 md:w-1/2">
                        <InputField
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="Company Name"
                            required
                        />
                        <InputField
                            name="taxCode"
                            value={formData.taxCode}
                            onChange={handleChange}
                            placeholder="Tax Code"
                            required
                        />
                        <select
                            name="businessSector"
                            value={formData.businessSector}
                            onChange={handleChange}
                            required
                            className="w-full rounded border border-gray-300 px-3 py-2"
                        >
                            <option value="">Select Sector</option>
                            <option value="software">Software Development</option>
                            <option value="construction">Construction</option>
                            <option value="manufacturing">Manufacturing</option>
                            <option value="education">Education</option>
                            <option value="finance">Finance</option>
                            <option value="agriculture">Agriculture</option>
                            <option value="logistics">Logistics</option>
                        </select>
                        <InputField
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Address"
                            required
                        />
                        <InputField
                            name="representative"
                            value={formData.representative}
                            onChange={handleChange}
                            placeholder="Representative"
                            required
                        />
                        <InputField
                            name="companyEmail"
                            value={formData.companyEmail}
                            onChange={handleChange}
                            placeholder="Company Email"
                            required
                        />
                        <InputField
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            required
                        />
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col space-y-4 md:w-1/2 mt-6 md:mt-0">
                        <InputField
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Full Name"
                            required
                        />
                        <InputField
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Account Email"
                            required
                        />
                        <InputField
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                        />
                        <InputField
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            required
                        />

                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full rounded border border-gray-300 px-3 py-2"
                        >
                            <option value="Admin">Admin</option>
                            <option value="Company">Company</option>
                            <option value="User">User</option>
                        </select>

                        <input type="file" name="legalDocuments" disabled className="w-full rounded border px-3 py-2" />
                    </div>
                </div>

                {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}

                <button
                    type="submit"
                    className="mt-6 w-full rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
