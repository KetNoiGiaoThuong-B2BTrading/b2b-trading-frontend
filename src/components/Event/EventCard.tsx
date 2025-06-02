interface EventCardProps {
    image: string;
    title: string;
    date: string;
    location: string;
    description: string;
}

const EventCard: React.FC<EventCardProps> = ({ image, title, date, location, description }) => {
    return (
        <article className="relative rounded-lg overflow-hidden group hover:shadow-lg transition-shadow duration-300">
            <img src={image} alt={title} className="object-contain max-w-full rounded-lg aspect-[1.77] w-full transform transition-transform duration-300 group-hover:scale-105 group-hover:brightness-90" />
            <div className="flex flex-col px-2 py-4 w-full bg-white rounded-none border border-solid border-[color:var(--Light-Colors-Platinum-2,#F6F8FB)] min-h-[276px]">
                <h3 className="min-h-[60px] text-xl font-bold leading-7 text-neutral-950 line-clamp-2">{title}</h3>
                <p className="mt-4 text-sm text-blue-600">
                    {date} | {location}
                </p>
                <p className="mt-4 text-neutral-950">{description}</p>
                <button className="flex gap-2.5 justify-center items-center self-start px-8 py-4 mt-4 font-medium leading-none text-blue-600 bg-white border-2 border-solid border-[color:var(--Brand-Colors-Main-Color---Vibrant-Blue,#1071FF)] min-h-12 rounded-[30px] max-md:px-5 hover:bg-blue-600 hover:text-white transition-all">
                    <span className="gap-10 self-stretch my-auto">Know more</span>
                </button>
            </div>
        </article>
    );
};

export default EventCard;
