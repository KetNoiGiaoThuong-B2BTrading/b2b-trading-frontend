import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../../lib/axios';
import { API_ENDPOINTS } from '../../lib/apiConfig';
import InputField from '../../components/common/InputField';
import { useToast } from '../../context/ToastContext';
import Cookies from 'js-cookie';

export default function CompleteProfilePage() {
    const [formData, setFormData] = useState({
        companyName: '',
        taxCode: '',
        businessSector: '',
        address: '',
        representative: '',
        email: '',
        phoneNumber: '',
        registrationDate: '',
    });

    const [userId, setUserId] = useState(0);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEmail = async () => {
            try {
                const data = Cookies.get('data');
                const userData = JSON.parse(data || '{}');
                setUserId(userData.data.userID);
                setEmail(userData.data.email);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchEmail();
    }, []);

    const navigate = useNavigate();
    const { showToast } = useToast();

    const handleFileChange = () => {};

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            formData.email = email;
            const res = await api.post(API_ENDPOINTS.completeProfile, formData);
            const data = res.data;

            if (data.response.isSuccess === false) {
                setError(data.response.message);
                throw new Error(data.response.message);
            }

            showToast({
                title: 'Success',
                message: data.response.message,
                type: 'success',
            });

            // Update & link Company ID for UserAccount
            const resultGetInfo = await api.post(API_ENDPOINTS.getInfoByEmailPhone, {
                email: formData.email,
                phoneNumber: formData.phoneNumber,
            });
            const info = resultGetInfo.data.data;
            const companyID = info.companyID;

            await api.post(API_ENDPOINTS.updateUser(userId), { companyID });
            navigate('/');
        } catch (err) {
            console.error(err);
            showToast({
                title: 'Error',
                message: error + formData.email + formData.phoneNumber,
                type: 'error',
            });
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-center text-2xl font-bold">Complete Company Profile</h2>

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
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col space-y-4 md:w-1/2 mt-6 md:mt-0">
                        <InputField
                            name="representative"
                            value={formData.representative}
                            onChange={handleChange}
                            placeholder="Representative"
                            required
                        />

                        <InputField
                            name="email"
                            value={email}
                            onChange={() => {}}
                            placeholder="Email"
                            type="email"
                            readOnly
                        />

                        <InputField
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            required
                        />

                        <input
                            type="file"
                            name="legalDocuments"
                            accept=".pdf,.doc,.docx,.png,.jpg"
                            onChange={handleFileChange}
                            className="w-full rounded border px-3 py-2"
                            disabled
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-6 w-full rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
