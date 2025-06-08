import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import Cookies from 'js-cookie';
import { Search } from 'lucide-react';

interface User {
  userID: number;
  fullName: string;
  email: string;
  role: string;
  companyID: string;
}

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const token = Cookies.get('data');
        if (token) {
        const data = JSON.parse(token);
        setUser(data);
        }
    }, []);

    const [searchType, setSearchType] = useState<'product' | 'companie'>('product');
    const [keyword, setKeyword] = useState('');

    const handleSearch = () => {
        if (keyword.trim()) {
            navigate(`/${searchType}s?search=${encodeURIComponent(keyword.trim())}`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSearch();
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="sticky shadow top-0 z-50 bg-neutral-900 bg-opacity-90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">            
            <div className="flex items-center">
              <div className="bg-white px-3 py-1 rounded">
                <span className="text-black font-bold text-lg">B2B</span>
                <span className="text-black ml-1">Kết nối giao thương</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-2 mr-4">
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value as 'product' | 'companie')}
                className="px-2 py-1 rounded-md text-sm text-blue-400"
              >
                <option value="product">Sản phẩm</option>
                <option value="companie">Công ty</option>
              </select>
              <div className="relative w-30">
                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 text-white" />
                </div>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Tìm kiếm..."
                  className="w-full pr-8 pl-2 py-1 text-sm text-white border-b-1 border-gray-300"
                />
              </div>
            </div>

            <nav className="text-sm hidden md:flex items-center space-x-4">
              {[ 
                { label: 'Trang chủ', path: '/' },
                { label: 'Giới thiệu', path: '/about' },
                { label: 'Lĩnh vực', path: '/categories' },
                { label: 'Sản phẩm', path: '/products' },
                { label: 'Doanh nghiệp', path: '/companies' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(item.path)}
                  className={`text-white hover:text-gray-300 border-b-2 hover:border-gray-300 ${
                    isActive(item.path) ? 'border-white' : 'border-transparent'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>            

            <div className="flex items-center space-x-4">
              {user?.fullName ? (
                <button onClick={() => navigate('/profiles')} className="text-white hover:underline">
                  {user.fullName}
                </button>
              ) : (
                <>
                  <button onClick={() => navigate('/auth/login')} className="text-white text-sm border border-white hover:border-blue-400 hover:text-blue-400 px-3 py-1 rounded-full">
                    Đăng nhập
                  </button>
                  <button onClick={() => navigate('/auth/register')} className="text-white text-sm border border-white hover:border-blue-400 hover:text-blue-400 px-3 py-1 rounded-full">
                    Đăng ký
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    );
};

export default Header;
