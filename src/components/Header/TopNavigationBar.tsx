import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

interface User {
    userID: number;
    fullName: string;
    email: string;
    role: string;
    companyID: string;
}

export default function TopNavigationBar() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = Cookies.get('data');
        // console.log(token);
        if (token) {
            const data = JSON.parse(token);
            // console.log(data);
            setUser(data);
        }
    }, []);

    return (
        <div className="flex flex-wrap gap-10 justify-between items-center px-20 py-2 w-full text-sm leading-6 bg-slate-200 min-h-12 text-neutral-950 max-md:px-5 max-md:max-w-full">
            {/* Left section: Country, Language, Currency */}
            <div className="flex gap-4 items-start self-stretch my-auto min-w-60 max-md:max-w-full">
                <div className="flex gap-1 items-center">
                    <span className="self-stretch my-auto text-neutral-950">Country: Vietnam</span>
                    <img src="/header/arrowdown.png" className="w-3" alt="Country selector" />
                </div>
                <div className="flex gap-1 items-center">
                    <span className="self-stretch my-auto text-neutral-950">Language: Tiếng Việt</span>
                    <img src="/header/arrowdown.png" className="w-3" alt="Language selector" />
                </div>
                <div className="flex gap-1 items-center">
                    <span className="self-stretch my-auto text-neutral-950">Currency: VND</span>
                    <img src="/header/arrowdown.png" className="w-3" alt="Currency selector" />
                </div>
            </div>

            {/* Right section: contact, messages, user */}
            <div className="flex flex-wrap gap-4 items-center self-stretch my-auto min-w-60 max-md:max-w-full">
                <a href="tel:+3215287667" className="flex gap-2 items-center font-semibold text-blue-600">
                    <img src="/header/phone.png" className="w-4 aspect-square" alt="Phone" />
                    <span>+32 (0) 15 28 76 67</span>
                </a>

                <div className="w-px h-7 bg-zinc-700" />

                <button className="flex gap-1 items-center whitespace-nowrap">
                    <img src="/header/message.png" className="w-5" alt="Messages" />
                    <span className="text-neutral-950">Messages</span>
                </button>

                <div className="w-px h-7 bg-zinc-700" />

                {user?.fullName ? (
                    // Logged in
                    <button
                        onClick={() => navigate('/profiles')} // Đổi lại đường dẫn vào trang dashboard/hồ sơ người dùng
                        className="flex gap-1 items-center whitespace-nowrap hover:cursor-pointer"
                    >
                        <img src="/header/user.png" className="w-5 aspect-square" alt="User" />
                        <span className="text-neutral-950">{user.fullName}</span>
                        <img src="/header/arrowdown.png" className="w-3" alt="Menu" />
                    </button>
                ) : (
                    // Chưa login
                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate('/auth/login')}
                            className="px-4 py-2 rounded-[30px] border border-blue-600 bg-blue-600 text-white font-semibold hover:cursor-pointer hover:bg-blue-700 hover:text-white transition-colors duration-300"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate('/auth/register')}
                            className="px-4 py-2 rounded-[30px] border border-blue-300 bg-white text-blue-500 font-medium hover:cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300"
                        >
                            Sign up
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
