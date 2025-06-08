interface DiscountTier {
    quantity: string;
    discount: string;
    price: string;
}

interface Product {
    productID: number;
    productName: string;
    description: string;
    unitPrice: number;
    stockQuantity: number;
    status: string;
    createdDate: string;
}

type ProductInfoProps = {
    product: Product;
};

export default function ProductInfo({ product }: ProductInfoProps) {
    if (!product) return null;

    return (
        <section className="grow max-md:mt-5 max-md:max-w-full">
            <div className="flex flex-col items-start w-full max-w-[621px] max-md:max-w-full">
                <header>
                    <h1 className="text-3xl font-bold leading-9 text-neutral-950 max-md:max-w-full">
                        {product.productName}
                    </h1>
                    <p className="mt-2 text-lg leading-8 text-zinc-500 max-md:max-w-full">{product.description}</p>
                </header>

                {/* <div className="flex gap-2 items-center mt-4">
                <div className="flex gap-2 items-start self-stretch my-auto">
                {[...Array(product.rating ?? 0)].map((_, i) => (
                    <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                ))}
                </div>
                <div className="flex gap-1 items-start self-stretch my-auto text-sm leading-6 whitespace-nowrap text-neutral-950">
                <span className="font-semibold">{product.rating?.toFixed(1)}</span>
                <span>({product.ratingCount})</span>
                </div>
            </div> */}

                <div className="flex flex-col items-start mt-4 max-w-full text-sm leading-6 text-green-700 w-[117px]">
                    <div className="flex gap-1 px-2 py-0.5 bg-white rounded border border-solid border-[#F6F8FB]">
                        <img
                            src="/products/instock.png"
                            className="object-contain shrink-0 my-auto w-4 aspect-square"
                            alt="In stock icon"
                        />
                        <span>{product.status === 'Available' ? 'In stock' : 'Out of stock'}</span>
                    </div>
                </div>

                <div className="mt-6 w-full rounded-lg max-w-[622px] max-md:max-w-full">
                    <div className="flex flex-wrap gap-5 justify-between text-sm leading-6 text-zinc-500">
                        <span>Số lượng</span>
                        <span>Giảm giá</span>
                        <span className="text-right">Đơn giá</span>
                    </div>

                    <hr className="mt-2 h-px rounded-lg bg-slate-50" />

                    <div className="flex flex-wrap gap-5 justify-between mt-3">
                        <div className="flex gap-45 text-sm leading-6 col-span-full">
                            <div className="flex flex-col text-zinc-500">
                                {/* {product.discountTiers.map((tier, i) => (
                        <span key={i} className={i > 0 ? 'mt-3.5' : ''}>{tier.quantity}</span>
                    ))} */}
                            </div>
                            <div className="flex flex-col font-semibold text-red-600">
                                {/* {product.discountTiers.map((tier, i) => (
                        <span key={i} className={i > 0 ? 'mt-3.5' : ''}>{tier.discount}</span>
                    ))} */}
                            </div>
                            <div className="text-xl font-bold leading-tight text-right">
                                {/* {product.discountTiers.map((tier, i) => (
                    <div key={i} className={i > 0 ? 'mt-3' : ''}>{tier.price}</div>
                    ))} */}
                            </div>
                        </div>
                    </div>

                    <hr className="mt-3 h-px rounded-lg bg-slate-50" />
                </div>

                <div className="flex flex-col items-start mt-6 max-w-full w-[622px]">
                    <div className="text-xl font-bold leading-7">
                        <span className="text-sm font-semibold text-blue-600">your price </span>
                        <span className="text-2xl text-blue-600">{product.unitPrice} </span>
                        <span className="text-sm font-semibold text-blue-600">net </span>
                        {/* <span className="text-base line-through text-orange-500">{product.originalPrice} net</span> */}
                    </div>

                    <div className="mt-4 w-full">
                        <div className="flex flex-wrap gap-4 items-center">
                            <select className="flex grow shrink px-4 py-2 bg-white rounded-lg border min-w-60 w-[278px]">
                                {/* {product.variants.map((variant, i) => (
                        <option key={i}>{variant}</option>
                    ))} */}
                            </select>

                            <input
                                type="number"
                                value={product.stockQuantity}
                                className="flex-1 px-4 py-2 text-center bg-white rounded-lg border w-[81px]"
                                readOnly
                            />

                            <select className="flex grow shrink px-4 py-2 bg-white rounded-lg border w-[172px]">
                                {/* <option>{product.unit}</option> */}
                            </select>
                        </div>

                        <div className="flex flex-wrap gap-4 items-center mt-4">
                            <button className="flex gap-1 justify-center items-center py-2 text-base font-medium text-white bg-blue-600 min-w-60 rounded-[30px] w-[75%]">
                                <span>Thêm vào giỏ</span>
                            </button>

                            {/* Action buttons */}
                            {/* <button aria-label="Add to favorites">
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/.../heart-icon"
                        className="object-contain w-11 aspect-square"
                        alt="Heart icon"
                    />
                    </button>
                    <button aria-label="Compare">
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/.../compare-icon"
                        className="object-contain w-11 aspect-square"
                        alt="Compare icon"
                    />
                    </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
