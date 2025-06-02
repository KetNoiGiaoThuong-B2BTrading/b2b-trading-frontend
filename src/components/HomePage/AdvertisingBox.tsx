interface AdvertisingBoxProps {
    title: string;
    description: string;
    buttonText: string;
}

const AdvertisingBox: React.FC<AdvertisingBoxProps> = ({ title, description, buttonText }) => {
    return (
        <section className="py-6">
            <div className="w-max-screen bg-blue-500 py-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <section className={'w-full text-white py-1 rounded-lg'}>
                        <div className="flex items-center justify-between flex-wrap gap-4 w-full">
                            <div className="flex items-center gap-6 flex-1 min-w-[250px] group duration-300">
                                <img src="advert.png" alt="Promo icon" className="h-[121px] w-auto object-contain transform transition-transform duration-300 group-hover:scale-105" />
                                <div className="flex items-center flex-wrap gap-x-4">
                                    <h3 className="text-6xl font-bold leading-tight">{title}</h3>
                                    {description && <p className="text-4xl font-bold">{description}</p>}
                                </div>
                            </div>

                            <button className="bg-white text-blue-600 px-6 py-2 rounded-full text-base font-semibold hover:bg-gray-100 transition-all">
                                {buttonText}
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
};

export default AdvertisingBox;
