export default function NewsletterBanner() {
    return (
        <section className="flex flex-wrap gap-4 justify-center items-center self-stretch py-8 pr-20 pl-24 mt-10 mb-4 w-full bg-blue-500">
            <div className="flex flex-wrap gap-10 items-center self-stretch my-auto text-white min-w-60">
            <img
                src="https://cdn.builder.io/api/v1/image/assets/182fee6bb5c14645ac126407c1ee5eb2/b3fdb087f56dea92a52de7b5a28333dad08f99e6?placeholderIfAbsent=true"
                className="object-contain shrink-0 self-stretch my-auto aspect-square w-[88px]"
                alt="Newsletter icon"
            />
            <div className="self-stretch my-auto min-w-60 w-[473px]">
                <h2 className="text-4xl font-bold leading-tight text-white">
                Enjoy 10% OFF
                </h2>
                <p className="mt-3.5 text-sm leading-6 text-white">
                Stay informed about the latest product launches and news. Learn more
                about our emails and
                </p>
            </div>
            </div>
    
            <div className="flex flex-wrap gap-5 items-start self-stretch my-auto min-w-60">
            <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 shrink px-4 py-3 text-sm leading-6 bg-white rounded-lg border border-solid basis-0 border-[color:var(--Light-Colors-Platinum,#EAECEE)] min-w-60 text-zinc-500 w-[408px]"
            />
            <button className="flex gap-2.5 justify-center items-center px-8 py-4 text-base leading-none text-blue-600 bg-white min-h-12 rounded-[30px] w-[196px]">
                Sign Up
            </button>
            </div>
        </section>
    );
}
