import { Outlet } from 'react-router';

export default function ProfilePage() {
    return (
        <div className="min-h-screen max-w-[1240px] w-full bg-gray-50 p-6 mx-auto">
            <div className="text-xl font-bold m-3">Profiles</div>
            <div className="flex gap-3">
                <div className="flex-1 p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
