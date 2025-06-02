import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ArticleCard from '../Article/ArticleCard';
import api from '../../lib/axios';
import { API_ENDPOINTS } from '../../lib/apiConfig';

interface Article {
    id: number;
    image: string;
    title: string;
    description: string;
}

// Dữ liệu fallback nếu API lỗi
const fallbackArticles: Article[] = [
    {
        id: 1,
        image: '/hints/hint-1.png',
        title: 'How much does it cost to finish an apartment?',
        description:
            'Are you standing on the threshold of your own "M", to which you have just picked up the keys, and with the eye...',
    },
    {
        id: 2,
        image: '/hints/hint-2.png',
        title: 'Demolition of the load-bearing wall',
        description:
            'Are you planning a home renovation or renovation? Your vision is limited by the load-bearing wall, which you...',
    },
    {
        id: 3,
        image: '/hints/hint-3.png',
        title: 'What color to paint a hall in a block of flats?',
        description:
            'Matching the right paint is a real challenge. If you are wondering what color to paint your hall with, you can...',
    },
    {
        id: 4,
        image: '/hints/hint-4.png',
        title: 'How does a concrete pump work?',
        description:
            'A concrete pump is currently one of the most common equipment used on construction sites. Its operation...',
    },
];

export const ArticlesSection = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await api.get(API_ENDPOINTS.getAllArticles);
                console.log("Fetched articles:", res.data);
                if (Array.isArray(res.data)) {
                setArticles(res.data.slice(0, 4));
                } else if (Array.isArray(res.data.data)) {
                setArticles(res.data.data.slice(0, 4));
                } else {
                console.warn("API trả về dữ liệu không hợp lệ. Dùng fallback.");
                setArticles(fallbackArticles);
                }
            } catch (error) {
                console.error('Error fetching articles:', error);
                setArticles(fallbackArticles);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    return (
        <section className="py-6 px-20 bg-white">
            <div className="flex flex-wrap gap-5 justify-between mt-5 w-full max-md:mt-10 max-md:max-w-full">
                <h2 className="text-3xl font-bold leading-tight text-neutral-950">Bài viết</h2>
                <button onClick={() => navigate("/articles")} className="flex gap-1 items-center my-auto text-base font-medium leading-none text-right text-blue-600 transform transition-transform hover:translate-x-1 hover:underline">
                    <span className="self-stretch my-auto">Xem tất cả bài viết</span>
                    <img
                        src="arrowright.png"
                        alt="Arrow right"
                        className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                    />
                </button>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {loading ? (
                    <p className="text-gray-500 col-span-full text-center">Loading ...</p>
                ) : (
                    articles.map((article) => (
                        <ArticleCard
                            key={article.id}
                            image={article.image}
                            title={article.title}
                            description={article.description}
                        />
                    ))
                )}
            </div>
        </section>
    );
};
