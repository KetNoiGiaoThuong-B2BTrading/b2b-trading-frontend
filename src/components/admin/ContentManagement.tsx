import { useState, useEffect } from 'react';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import api from '../../lib/axios';
import { API_ENDPOINTS } from '../../lib/apiConfig';

interface Content {
    id: string;
    title: string;
    slug: string;
    content: string;
    type: 'about' | 'terms' | 'privacy' | 'contact';
    updatedAt: string;
}

const mockContents: Content[] = [
    {
        id: '1',
        title: 'Giới thiệu',
        slug: 'about',
        content: 'Nội dung giới thiệu về nền tảng B2B...',
        type: 'about',
        updatedAt: '2024-03-20T10:00:00Z',
    },
    {
        id: '2',
        title: 'Điều khoản sử dụng',
        slug: 'terms',
        content: 'Các điều khoản và điều kiện sử dụng nền tảng...',
        type: 'terms',
        updatedAt: '2024-03-20T10:00:00Z',
    },
    {
        id: '3',
        title: 'Chính sách bảo mật',
        slug: 'privacy',
        content: 'Chính sách bảo mật thông tin người dùng...',
        type: 'privacy',
        updatedAt: '2024-03-20T10:00:00Z',
    },
    {
        id: '4',
        title: 'Liên hệ',
        slug: 'contact',
        content: 'Thông tin liên hệ và hỗ trợ...',
        type: 'contact',
        updatedAt: '2024-03-20T10:00:00Z',
    },
];

export default function ContentManagement() {
    const [contents, setContents] = useState<Content[]>(mockContents);
    const [selectedContent, setSelectedContent] = useState<Content | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchContents();
    }, []);

    const fetchContents = async () => {
        try {
            setLoading(true);
            // const response = await api.get(API_ENDPOINTS.getContents);
            // setContents(response.data);
            setContents(mockContents); // Sử dụng dữ liệu mẫu cho testing
        } catch (error) {
            console.error('Error fetching contents:', error);
            setError('Không thể tải dữ liệu nội dung');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (content: Content) => {
        setSelectedContent(content);
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (!selectedContent) return;

        try {
            setLoading(true);
            // await api.put(`${API_ENDPOINTS.updateContent}/${selectedContent.id}`, selectedContent);
            setContents(contents.map((content) => (content.id === selectedContent.id ? selectedContent : content)));
            setIsEditing(false);
            setSelectedContent(null);
        } catch (error) {
            console.error('Error updating content:', error);
            setError('Không thể cập nhật nội dung');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setSelectedContent(null);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
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
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Quản lý nội dung</h1>
                <p className="text-gray-600">Quản lý các nội dung tĩnh của website</p>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                    <p>{error}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Danh sách nội dung */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold mb-4">Danh sách nội dung</h2>
                    <div className="space-y-4">
                        {contents.map((content) => (
                            <div
                                key={content.id}
                                className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                                onClick={() => handleEdit(content)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        handleEdit(content);
                                    }
                                }}
                                role="button"
                                tabIndex={0}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-medium text-gray-900">{content.title}</h3>
                                        <p className="text-sm text-gray-500">
                                            Cập nhật: {formatDate(content.updatedAt)}
                                        </p>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleEdit(content);
                                        }}
                                        className="text-blue-600 hover:text-blue-800"
                                        aria-label={`Chỉnh sửa ${content.title}`}
                                    >
                                        <FaEdit />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form chỉnh sửa */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    {selectedContent ? (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">Chỉnh sửa nội dung</h2>
                                <div className="space-x-2">
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                                        disabled={loading}
                                    >
                                        <FaSave className="mr-2" />
                                        Lưu
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center"
                                    >
                                        <FaTimes className="mr-2" />
                                        Hủy
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        Tiêu đề
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={selectedContent.title}
                                        onChange={(e) =>
                                            setSelectedContent({ ...selectedContent, title: e.target.value })
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                                        Nội dung
                                    </label>
                                    <textarea
                                        id="content"
                                        rows={10}
                                        value={selectedContent.content}
                                        onChange={(e) =>
                                            setSelectedContent({ ...selectedContent, content: e.target.value })
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 py-8">Chọn một nội dung để chỉnh sửa</div>
                    )}
                </div>
            </div>
        </div>
    );
}
