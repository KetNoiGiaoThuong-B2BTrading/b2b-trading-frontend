const DeliverySection = () => {
    return (
        <section className="py-6 flex flex-col justify-center self-stretch px-24 mt-5 bg-slate-50 max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-wrap gap-10 items-center max-md:max-w-full">
                <div className="flex-1 flex-col self-stretch my-auto min-w-60 w-[485px] max-md:max-w-full">
                    <div className="w-full text-neutral-950 max-md:max-w-full">
                        <h2 className="text-4xl font-bold leading-tight text-neutral-950 max-md:max-w-full">
                            DPD delivery already available!
                        </h2>
                        <p className="mt-6 text-base leading-6 text-neutral-950">
                            Choose DPD for speed, ease and convenience. Track your parcel in real time. This will help
                            you plan your work while waiting for the parcel.
                        </p>
                    </div>
                    <button className="flex gap-2.5 justify-center items-center self-start px-8 py-4 mt-10 text-base font-medium leading-none text-white bg-blue-600 min-h-12 rounded-[30px] max-md:px-5">
                        <span className="gap-10 self-stretch my-auto">Show more</span>
                    </button>
                </div>
                <div className="flex-1 group duration-300">
                    <img
                        src="delivery.png"
                        alt="DPD Delivery Service"
                        className="object-contain self-stretch my-auto aspect-[1.89] min-w-60 w-[552px] max-md:max-w-full transform transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            </div>
        </section>
    );
};

export default DeliverySection;
