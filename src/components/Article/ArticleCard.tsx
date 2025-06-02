interface ArticleCardProps {
    image: string;
    title: string;
    description: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ image, title, description }) => {
    return (
        <article className="relative rounded-lg overflow-hidden group hover:shadow-lg transition-shadow duration-300">
            <img src={image} alt={title} className="object-contain max-w-full rounded-lg aspect-[1.77] w-full transform transition-transform duration-300 group-hover:scale-105 group-hover:brightness-90" />
            <div className="flex flex-col px-2 py-4 w-full bg-white rounded-none border border-solid border-[color:var(--Light-Colors-Platinum-2,#F6F8FB)] min-h-[212px]">
                <h3 className="text-xl font-bold leading-7 text-neutral-950">{title}</h3>
                <p className="mt-4 leading-6 text-neutral-950">{description}</p>
                <button className="flex gap-1 justify-center items-center self-start mt-4 font-medium leading-none text-blue-600 transform transition-transform hover:translate-x-1 hover:underline">
                    <span className="self-stretch my-auto">Read more</span>
                    <img
                        src="arrowright.png"
                        alt="Arrow right"
                        className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                    />
                </button>
            </div>
        </article>
    );
};
export default ArticleCard;
