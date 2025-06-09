import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../../lib/axios";
import { API_ENDPOINTS } from "../../lib/apiConfig";

interface CompanyData {
  companyID: number;
  companyName: string;
  taxCode: string;
  businessSector: string;
  address: string;
  representative: string;
  email: string;
  phoneNumber: string;
  verificationStatus: string;
  imageCompany: string;
  //description: string;
}

interface Props {
  companyID: number;
}

const fallbackCompany: CompanyData = {
  companyID: 1,
  companyName: "Công ty ABC",
  taxCode: "123456789",
  businessSector: "Chưa rõ ngành nghề",
  address: "Địa chỉ mẫu, không xác định",
  representative: "Người đại diện mẫu",
  email: "contact@default.com",
  phoneNumber: "+84 000 000 000",
  verificationStatus: "Đã xác minh",
  imageCompany: "https://placehold.co/100x100.png?text=Logo",
  // description: "Mô tả công ty mẫu. Không thể tải dữ liệu từ máy chủ.",
};

export default function CompanyCard({ companyID }: Props) {
  const navigate = useNavigate();
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
        try {
            const res = await api.get(API_ENDPOINTS.getCompanyProfileById(companyID));
            const data = res.data?.data || res.data;
            
            if (!data || typeof data !== 'object' || !data.name) {
                console.warn('API trả về dữ liệu không hợp lệ, dùng fallback.');
                setCompany(fallbackCompany);
            } else {
                setCompany(data);
        }
        } catch (err) {
        console.error('Lỗi khi gọi API công ty:', err);
        setCompany(fallbackCompany);
        } finally {
        setLoading(false);
        }          
    };

    fetchCompany();
  }, [companyID]);

  if (loading) return <div>Đang tải thông tin công ty...</div>;
  if (!company) return <div>Không tìm thấy công ty</div>;

  return (
    <section className="relative grow p-6 w-full rounded-lg border border-blue-300 bg-slate-50">
        <div className="absolute top-4 right-4">
            <button
            onClick={() => navigate(`/companies/${company.companyID}`)}
            className="px-4 py-2 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-100 text-sm font-medium"
            >
            Xem hồ sơ công ty
            </button>
        </div>

        <div className="flex gap-4 items-start">
            <img src={company.imageCompany} alt="Company logo" className="w-20 h-20 rounded-lg object-cover border" />
            <div>
            <h2 className="text-xl font-bold text-blue-600">{company.companyName}</h2>
            <p className="text-gray-600 mt-2">{company.businessSector}</p>
            {/* <p className="text-gray-700 mt-2">{company.description}</p> */}
            <p className="text-sm text-gray-500 mt-2">📞 {company.phoneNumber}</p>
            <p className="text-sm text-gray-500">📧 {company.email}</p>
            </div>
        </div>
    </section>
  );
}
