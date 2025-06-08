import { Link, useLocation } from 'react-router';
import { cn } from '../../../lib/utils';
import { Layers, Briefcase, User, CreditCard, Box, DollarSign, Settings } from 'react-feather';
import LogoutBtn from '..//../common/LogoutBtn';

export default function Sidebar() {
    const location = useLocation();
    const pathname = location.pathname;
    // console.log(pathname);
    const menuItems = [
        { label: 'Bảng điều khiển', href: '/admin/dashboard', icon: <Layers /> },
        { label: 'Tài khoản', href: '/admin/dashboard/account', icon: <User /> },
        { label: 'Sản phẩm', href: '/admin/dashboard/merchandise', icon: <Box /> },
        { label: 'Hợp đồng', href: '/admin/dashboard/contract', icon: <Briefcase /> },
        { label: 'Giao dịch & thanh toán', href: '/admin/dashboard/payments', icon: <DollarSign /> },
        { label: 'Khiếu nại, vi phạm', href: '/admin/dashboard/reports', icon: <CreditCard /> },
        { label: 'Cài đặt chung', href: '/admin/dashboard/settings', icon: <Settings /> },
    ];

    return (
        <div className="h-screen w-[250px] bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
            <div className="flex h-[200px] w-[200px] items-center justify-center bg-(--color-primary)">
                <img src="/logo.png" alt="Logo" width={180} height={153} />
            </div>
            <div className="mx-3 my-10">
                {menuItems.map((item) => (
                    <Link
                        key={item.label}
                        to={item.href}
                        className={cn(
                            'my-1 flex h-[42px] items-center rounded-2xl px-2',
                            pathname === item.href ? 'bg-blue-500 text-white' : 'text-[#333] hover:bg-blue-100',
                        )}
                    >
                        <span className="me-2">{item.icon}</span>
                        <span>{item.label}</span>
                    </Link>
                ))}
                <hr />
                <LogoutBtn />
            </div>
        </div>
    );
}
