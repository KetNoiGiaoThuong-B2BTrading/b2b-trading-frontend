'use client';

import { LogOut } from 'react-feather';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

import { useToast } from '../../context/ToastContext';

export default function LogoutBtn() {
    const navigate = useNavigate();
    const { showToast } = useToast();

    const handleLogout = async () => {
        try {
            showToast({
                title: 'Đăng xuất thành công',
                message: 'Hẹn gặp lại!',
                type: 'success',
            });
            Cookies.remove('data');
            navigate('/auth/login');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="my-1 flex h-[42px] w-full items-center rounded-2xl px-2 text-red-600 hover:cursor-pointer hover:bg-red-100"
        >
            <span className="me-2">
                <LogOut />
            </span>
            <span>Logout</span>
        </button>
    );
}
