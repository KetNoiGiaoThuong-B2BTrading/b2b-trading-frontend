import { NavLink, useLocation, useNavigate } from 'react-router';

import { useToast } from '../../context/ToastContext';
import LogoutBtn from '../common/LogoutBtn';

export default function LeftSidebar() {
    const location = useLocation();

    const sidebarItems = [
        { title: 'Dashboard', path: '/profiles' },
        { title: 'Merchandise', path: '/profiles/merchandise' },
        { title: 'Account Data', path: '/profiles/account' },
        { title: 'Company Data', path: '/profiles/company' },
    ];

    return (
        <div className="w-[250px] h-full bg-white rounded-lg p-4 space-y-3 text-sm shadow-md shadow-gray-300">
            {sidebarItems.map(({ title, path }, idx) => {
                const isActive = location.pathname === path;
                return (
                    <NavLink
                        key={idx}
                        to={path}
                        className={`block cursor-pointer rounded px-2 py-1 transition ${
                            isActive ? 'font-semibold text-black bg-gray-100' : 'text-gray-600 hover:text-black'
                        }`}
                    >
                        {title}
                    </NavLink>
                );
            })}
            <hr />
            <LogoutBtn />
        </div>
    );
}
