import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaUserShield } from 'react-icons/fa';
import api from '../../lib/axios';
import { API_ENDPOINTS } from '../../lib/apiConfig';

interface User {
    id: string;
    fullName: string;
    email: string;
    role: 'admin' | 'company' | 'employee';
    status: 'active' | 'inactive';
    createdAt: string;
}

// Dữ liệu mẫu cho testing
const mockUsers: User[] = [
    {
        id: '1',
        fullName: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
        status: 'active',
        createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        fullName: 'Company User',
        email: 'company@example.com',
        role: 'company',
        status: 'active',
        createdAt: new Date().toISOString(),
    },
    {
        id: '3',
        fullName: 'Employee User',
        email: 'employee@example.com',
        role: 'employee',
        status: 'inactive',
        createdAt: new Date().toISOString(),
    },
];

export default function UserManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [roleFilter, setRoleFilter] = useState<string>('all');

    useEffect(() => {
        fetchUsers();
    }, [roleFilter]);

    const fetchUsers = async () => {
        try {
            // Sử dụng dữ liệu mẫu cho testing
            setUsers(mockUsers);

            // Comment lại phần gọi API thực tế
            // const response = await api.get(API_ENDPOINTS.getUsers, {
            //     params: { role: roleFilter !== 'all' ? roleFilter : undefined }
            // });
            // if (Array.isArray(response.data)) {
            //     setUsers(response.data);
            // } else {
            //     setUsers([]);
            //     setError('Dữ liệu không hợp lệ');
            // }
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Không thể tải danh sách người dùng');
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (userId: string) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
            try {
                // await api.delete(`${API_ENDPOINTS.deleteUser}/${userId}`);
                // Cập nhật state local cho testing
                setUsers(users.filter((user) => user.id !== userId));
            } catch (error) {
                console.error('Error deleting user:', error);
                setError('Không thể xóa người dùng');
            }
        }
    };

    const handleRoleChange = async (userId: string, newRole: string) => {
        try {
            // await api.put(`${API_ENDPOINTS.updateUserRole}/${userId}`, {
            //     role: newRole
            // });
            // Cập nhật state local cho testing
            setUsers(users.map((user) => (user.id === userId ? { ...user, role: newRole as User['role'] } : user)));
        } catch (error) {
            console.error('Error updating user role:', error);
            setError('Không thể cập nhật vai trò người dùng');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Quản lý người dùng</h2>

            {error && (
                <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                    <p>{error}</p>
                </div>
            )}

            <div className="mb-4">
                <label htmlFor="roleFilter" className="block text-sm font-medium text-gray-700 mb-2">
                    Lọc theo vai trò
                </label>
                <select
                    id="roleFilter"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                    <option value="all">Tất cả</option>
                    <option value="admin">Admin</option>
                    <option value="company">Doanh nghiệp</option>
                    <option value="employee">Nhân viên</option>
                </select>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tên người dùng
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Vai trò
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Trạng thái
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ngày tạo
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        className="text-sm text-gray-900 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="company">Doanh nghiệp</option>
                                        <option value="employee">Nhân viên</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                    >
                                        {user.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleEdit(user)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        <FaEdit className="inline-block" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <FaTrash className="inline-block" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal chỉnh sửa người dùng */}
            {isEditModalOpen && selectedUser && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                                Chỉnh sửa thông tin người dùng
                            </h3>
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="userFullName" className="block text-sm font-medium text-gray-700">
                                        Họ và tên
                                    </label>
                                    <input
                                        id="userFullName"
                                        type="text"
                                        value={selectedUser.fullName}
                                        onChange={(e) => setSelectedUser({ ...selectedUser, fullName: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        id="userEmail"
                                        type="email"
                                        value={selectedUser.email}
                                        onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="userRole" className="block text-sm font-medium text-gray-700">
                                        Vai trò
                                    </label>
                                    <select
                                        id="userRole"
                                        value={selectedUser.role}
                                        onChange={(e) =>
                                            setSelectedUser({ ...selectedUser, role: e.target.value as User['role'] })
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="company">Doanh nghiệp</option>
                                        <option value="employee">Nhân viên</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="userStatus" className="block text-sm font-medium text-gray-700">
                                        Trạng thái
                                    </label>
                                    <select
                                        id="userStatus"
                                        value={selectedUser.status}
                                        onChange={(e) =>
                                            setSelectedUser({
                                                ...selectedUser,
                                                status: e.target.value as User['status'],
                                            })
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        <option value="active">Hoạt động</option>
                                        <option value="inactive">Không hoạt động</option>
                                    </select>
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                        Lưu thay đổi
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
