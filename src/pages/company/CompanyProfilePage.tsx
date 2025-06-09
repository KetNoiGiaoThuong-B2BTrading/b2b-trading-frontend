import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Building2, MapPin, Phone, Mail, Globe, Star, Award, FileText, Users, Calendar, ExternalLink, Shield, CheckCircle } from 'lucide-react';
import api from '../../lib/axios';
import { API_ENDPOINTS } from '../../lib/apiConfig';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
}

interface Review {
  id: number;
  companyName: string;
  rating: number;
  comment: string;
  date: string;
  reviewer: string;
}

interface Document {
  id: number;
  name: string;
  type: string;
  issueDate: string;
  expiryDate: string;
  status: 'valid' | 'expiring' | 'expired';
}

interface Company {
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

  description: string;
  establishedYear: number;
  employeeCount: string;
  website: string;
  rating: number;
  totalReviews: number;
  products: Product[];
  reviews: Review[];
  documents: Document[];
}

const fallbackData: Company = {
  companyID: 1,
  companyName: "Công ty TNHH Công nghệ ABC",
  imageCompany: "https://placehold.co/120x120/2563eb/ffffff?text=ABC",
  taxCode: "123456",
  representative: "Nguyễn Văn A",
  businessSector: "Công nghệ thông tin",
  description: "Chuyên cung cấp giải pháp phần mềm và dịch vụ CNTT cho doanh nghiệp",
  establishedYear: 2015,
  employeeCount: "50-100",
  address: "123 Đường Nguyễn Văn Cừ, Quận 5, TP. Hồ Chí Minh, Việt Nam",
  phoneNumber: "+84 28 1234 5678",
  email: "contact@abc-tech.vn",
  website: "https://abc-tech.vn",
  rating: 4.7,
  totalReviews: 128,
  verificationStatus: "verified",
  products: [
    {
      id: 1,
      name: "Hệ thống quản lý bán hàng",
      category: "Phần mềm",
      price: "Liên hệ",
      image: "https://placehold.co/200x150/3b82f6/ffffff?text=ERP"
    },
    {
      id: 2,
      name: "Dịch vụ phát triển ứng dụng mobile",
      category: "Dịch vụ",
      price: "Từ 50,000,000 VNĐ",
      image: "https://placehold.co/200x150/10b981/ffffff?text=Mobile"
    },
    {
      id: 3,
      name: "Tư vấn chuyển đổi số",
      category: "Tư vấn",
      price: "Liên hệ",
      image: "https://placehold.co/200x150/f59e0b/ffffff?text=Digital"
    }
  ],
  reviews: [
    {
      id: 1,
      companyName: "Công ty XYZ",
      rating: 5,
      comment: "Dịch vụ chuyên nghiệp, hỗ trợ tận tình. Sản phẩm chất lượng cao.",
      date: "2024-03-15",
      reviewer: "Nguyễn Văn A"
    },
    {
      id: 2,
      companyName: "Doanh nghiệp DEF",
      rating: 4,
      comment: "Giá cả hợp lý, thời gian giao hàng đúng hẹn.",
      date: "2024-02-28",
      reviewer: "Trần Thị B"
    },
    {
      id: 3,
      companyName: "Tập đoàn GHI",
      rating: 5,
      comment: "Đội ngũ kỹ thuật giỏi, sản phẩm đáp ứng đúng yêu cầu.",
      date: "2024-01-20",
      reviewer: "Lê Văn C"
    }
  ],
  documents: [
    {
      id: 1,
      name: "Giấy phép kinh doanh",
      type: "Pháp lý",
      issueDate: "2015-06-15",
      expiryDate: "2025-06-15",
      status: "valid"
    },
    {
      id: 2,
      name: "Chứng nhận ISO 9001:2015",
      type: "Chất lượng",
      issueDate: "2022-03-10",
      expiryDate: "2025-03-10",
      status: "valid"
    },
    {
      id: 3,
      name: "Giấy phép phần mềm",
      type: "Chuyên ngành",
      issueDate: "2020-09-01",
      expiryDate: "2024-09-01",
      status: "expiring"
    }
  ]
};

const CompanyProfile = () => {
  const { id } = useParams();
  const companyId = parseInt(id || '1', 10);

  const [Company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);  

  useEffect(() => {
    const fetchCompany = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await api.get(API_ENDPOINTS.getCompanyProfileById(companyId));
        let businessInfo = res.data?.data || res.data || fallbackData;

        const mergedData: Company = {
          ...fallbackData,
          ...businessInfo,
          products: businessInfo.products || fallbackData.products,
          reviews: businessInfo.reviews || fallbackData.reviews,
          documents: businessInfo.documents || fallbackData.documents
        };

        setCompany(mergedData);
      } catch (err) {
        setError('Không thể tải dữ liệu công ty. Sử dụng dữ liệu mẫu.');
        setCompany(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [companyId]);

  const handleRetry = () => {
    window.location.reload();
  };

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
    ));

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'valid': return 'text-green-600 bg-green-100';
      case 'expiring': return 'text-yellow-600 bg-yellow-100';
      case 'expired': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!Company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy thông tin doanh nghiệp</h2>
          <p className="text-gray-600 mb-4">Vui lòng thử lại sau.</p>
          <button
            onClick={handleRetry}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-300">
        {/* Error Banner */}
        {error && (
          <div className="bg-yellow-50 border-b border-yellow-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-yellow-800">
                    {error}
                  </span>
                </div>
                <button 
                  onClick={handleRetry}
                  className="text-xs bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full hover:bg-yellow-300 transition-colors"
                >
                  Thử lại API
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <img
                  src={Company.imageCompany}
                  alt={`${Company.companyName} logo`}
                  className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900 truncate">
                    {Company.companyName}
                  </h1>
                  {Company.verificationStatus === 'verified' && (
                    <div className="flex items-center gap-1 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      <span>Đã xác thực</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 mb-3">{Company.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    {Company.businessSector}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Thành lập {Company.establishedYear}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {Company.employeeCount} nhân viên
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-1">
                {renderStars(Company.rating)}
                <span className="ml-2 text-sm font-medium text-gray-900">
                  {Company.rating}
                </span>
                <span className="text-sm text-gray-500">
                  ({Company.totalReviews} đánh giá)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Tổng quan', icon: Building2 },
              { id: 'products', label: 'Sản phẩm/Dịch vụ', icon: Award },
              { id: 'reviews', label: 'Đánh giá', icon: Star },
              { id: 'documents', label: 'Hồ sơ pháp lý', icon: FileText }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin liên hệ</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-900">{Company.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{Company.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{Company.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <a 
                      href={Company.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      {Company.website}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thống kê nhanh</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Đánh giá trung bình</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{Company.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tổng đánh giá</span>
                    <span className="font-semibold">{Company.totalReviews}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Sản phẩm/Dịch vụ</span>
                    <span className="font-semibold">{Company.products.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Năm hoạt động</span>
                    <span className="font-semibold">{new Date().getFullYear() - Company.establishedYear}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Company.products.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h4>
                  <p className="text-lg font-bold text-blue-600">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {Company.reviews.map(review => (
              <div key={review.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.companyName}</h4>
                    <p className="text-sm text-gray-600">bởi {review.reviewer}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Company.documents.map(doc => (
              <div key={doc.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {doc.type === 'Pháp lý' ? (
                        <Shield className="w-5 h-5 text-blue-600" />
                      ) : (
                        <FileText className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{doc.name}</h4>
                      <p className="text-sm text-gray-600">{doc.type}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(doc.status)}`}>
                    {doc.status === 'valid' ? 'Còn hiệu lực' : 
                     doc.status === 'expiring' ? 'Sắp hết hạn' : 'Hết hạn'}
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Ngày cấp: {new Date(doc.issueDate).toLocaleDateString('vi-VN')}</p>
                  <p>Ngày hết hạn: {new Date(doc.expiryDate).toLocaleDateString('vi-VN')}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;