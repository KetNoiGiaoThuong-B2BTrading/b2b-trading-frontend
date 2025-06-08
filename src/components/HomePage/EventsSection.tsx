import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import EventCard from '../Event/EventCard';
import api from '../../lib/axios';
import { API_ENDPOINTS } from '../../lib/apiConfig';

interface Event {
    id: number;
    image: string;
    title: string;
    date: string;
    location: string;
    description: string;
}

// Dữ liệu cứng fallback (dùng khi không gọi API)
const fallbackEvents: Event[] = [
    {
        id: 1,
        image: '/events/event-1.png',
        title: 'Electrician course for electricians with SEP licence',
        date: '23.05.2021',
        location: 'London, UK',
        description:
            'This course is conducted in the form of lectures via the Internet and ends with an examination, also online...',
    },
    {
        id: 2,
        image: '/events/event-2.png',
        title: 'Interior design and decoration',
        date: '04-06.11.2021',
        location: 'London, UK',
        description:
            'This course is conducted in the form of lectures via the Internet and ends with an examination, also online...',
    },
    {
        id: 3,
        image: '/events/event-3.png',
        title: 'AutoCAD 2d basic level',
        date: '15.06.2021',
        location: 'London, UK',
        description:
            'This course is conducted in the form of lectures via the Internet and ends with an examination, also online...',
    },
    {
        id: 4,
        image: '/events/event-4.png',
        title: 'Paving engineer with a road construction machine licence',
        date: '31.03.2021',
        location: 'London, UK',
        description:
            'This course is conducted in the form of lectures via the Internet and ends with an examination, also online...',
    },
];

const EventsSection: React.FC = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await api.get(API_ENDPOINTS.getAllEvents);
                console.log("Fetched events:", res.data);
        
                if (Array.isArray(res.data)) {
                setEvents(res.data.slice(0, 4));
                } else if (Array.isArray(res.data.data)) {
                setEvents(res.data.data.slice(0, 4));
                } else {
                console.warn("API events trả về sai định dạng. Sử dụng fallback.");
                setEvents(fallbackEvents);
                }
            } catch (error) {
                console.error('Error fetching events:', error);
                setEvents(fallbackEvents); // fallback khi lỗi
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return <div className="text-center mt-10 text-gray-600">Loading ...</div>;
    }

    return (
        <section className="pt-6 pb-10 px-20 bg-white">
            <div className="flex flex-wrap gap-5 justify-between mt-5 max-md:mt-10">
                <h2 className="text-3xl font-bold leading-tight text-neutral-950">Sự kiện</h2>
                <button onClick={() => navigate("/events")} className="flex gap-1 items-center my-auto text-base font-medium text-blue-600 transform transition-transform hover:translate-x-1 hover:underline">
                    <span>Xem tất cả sự kiện</span>
                    <img src="arrowright.png" alt="Arrow right" className="w-4" />
                </button>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {events.map((event) => (
                    <EventCard
                        key={event.id}
                        image={event.image}
                        title={event.title}
                        date={event.date}
                        location={event.location}
                        description={event.description}
                    />
                ))}
            </div>
        </section>
    );
};
export default EventsSection;
