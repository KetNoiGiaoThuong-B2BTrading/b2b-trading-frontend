import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import api from '../../lib/axios';
import { API_ENDPOINTS } from '../../lib/apiConfig';

interface User {
    userId: string;
    fullName: string;
    email: string;
}

export default function DashboardPage() {
    const [userData, setUserData] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const response = await api.get(API_ENDPOINTS.me);
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
        };

        fetchUserData();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold underline">Dashboard</h1>
            {userData ? (
            <div>
                <p>Welcome, {userData.fullName}!</p>
                <p>Email: {userData.email}</p>
                <p className="break-words">{Cookies.get('access_token')}</p>
            </div>
            ) : (
            <p>Loading user data...</p>
            )}
        </div>
    );
}
