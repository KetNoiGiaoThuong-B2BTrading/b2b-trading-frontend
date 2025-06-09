import * as React from "react";
import { useState } from "react";
import api from "../../lib/axios";
import { API_ENDPOINTS } from "../../lib/apiConfig";

interface Review {
    name: string;
    comment: string;
    rating: number;
}

interface ShippingInfo {
    description: string;
    types: { type: string; cost: string }[];
}

interface PaymentInfo {
    description: string;
    methods: { type: string; info: string }[];
}

interface QA {
    name: string;
    email: string;
    question: string;
    answer?: string;
}

interface Product {
    productID: number;
    image: string;
    productName: string;
    description: string;
    unitPrice: number;
    stockQuantity: number;
    status: string;
    createdDate: string;
    categoryID: number;
    companyID: number;

    // brand: string;
    // partNo: string;
    // rating: number;
    // ratingCount: number;
    // inStock: boolean;
    // discountTiers: {
    //     quantity: string;
    //     discount: string;
    //     price: string;
    // }[];
    // yourPrice: string;
    // originalPrice: string;
    // variants: string[];
    // unit: string;
    // quantity: number;
    // images: string[];
    // companyId: number;
    // technicalDetails?: Record<string, string>;
    // attachments?: string[];
    // reviews?: Review[];
    // shipping?: ShippingInfo;
    // payments?: PaymentInfo;
    // questions?: QA[];
}

export default function ProductTabs({ product }: { product: Product }) {
    const [activeTab, setActiveTab] = React.useState("description");
    // const [productReviewList, setProductReviewList] = useState<Review[]>(product.reviews ?? []);
    const [reviewRating, setReviewRating] = useState<number>(0);
    const [reviewName, setReviewName] = useState<string>("");
    const [reviewComment, setReviewComment] = useState<string>("");
    // const [updatedRating, setUpdatedRating] = useState<number>(product.rating);
    // const [updatedRatingCount, setUpdatedRatingCount] = useState<number>(product.ratingCount);
    // const [questionList, setQuestionList] = useState<QA[]>(product.questions ?? []);
    const [qaName, setQaName] = useState("");
    const [qaEmail, setQaEmail] = useState("");
    const [qaQuestion, setQaQuestion] = useState("");

    const tabs = [
        { id: "description", label: "Mô tả" },
        { id: "technical", label: "Thông số kỹ thuật" },
        { id: "attachments", label: "Tài liệu liên quan" },
        { id: "shipping", label: "Phương thức Vận chuyển & Thanh toán" },
        {
        id: "reviews", label: `Đánh giá`, 
        // (${product.reviews?.length ?? 0})`,
        },
        { id: "ask", label: "Hỏi đáp" },
    ];

    return (
        <section className="mt-20 w-full text-base text-neutral-950 max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-wrap gap-2 items-center w-full">
            {tabs.map((tab) => (
            <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`self-stretch px-3 py-2 my-auto rounded-lg ${
                activeTab === tab.id
                    ? "font-medium text-white bg-blue-600"
                    : "bg-slate-50 text-neutral-950"
                }`}
            >
                {tab.label}
            </button>
            ))}
        </div>

        <div className="flex flex-col justify-center p-4 w-full bg-sky-100 rounded-lg">
            {activeTab === "description" && (
            <div className="bg-white p-6 rounded-lg">
                {/* <h3 className="font-bold text-lg mb-2">Description</h3> */}
                <p>{product.description ?? "No description available."}</p>
            </div>
            )}

            {activeTab === "technical" && (
            <div className="bg-white p-6 rounded-lg">
                {/* <h3 className="font-bold text-lg mb-2">Technical Details</h3> */}
                {/* {product.technicalDetails ? (
                <ul className="list-disc list-inside">
                    {Object.entries(product.technicalDetails).map(
                    ([key, value]) => (
                        <li key={key}>
                        <strong>{key}:</strong> {value}
                        </li>
                    )
                    )}
                </ul>
                ) : (
                <p>No technical details available.</p>
                )} */}
            </div>
            )}

            {activeTab === "attachments" && (
            <div className="bg-white p-6 rounded-lg">
                {/* <h3 className="font-bold text-lg mb-2">Attachments</h3> */}
                {/* {product.attachments && product.attachments.length > 0 ? (
                <ul className="list-disc list-inside">
                    {product.attachments.map((file, idx) => (
                    <li key={idx}>
                        <a
                        href={file}
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noreferrer"
                        >
                        {file.split("/").pop()}
                        </a>
                    </li>
                    ))}
                </ul>
                ) : (
                <p>No attachments available.</p>
                )} */}
            </div>
            )}

            {activeTab === "shipping" && (
            <div className="bg-white p-6 rounded-lg space-y-10">
                {/* Shipping Info */}
                <div>
                {/* <h3 className="text-xl font-bold text-blue-600">Shipping</h3> */}
                <p className="mt-2 text-neutral-700">
                    {/* {product.shipping?.description ?? "Thông tin giao hàng chưa được cập nhật."} */}
                </p>
                <ul className="mt-4 space-y-2">
                    {/* {product.shipping?.types.map((type, idx) => (
                    <li key={idx} className="flex justify-between border-b py-2">
                        <span>{type.type}</span>
                        <span className="text-blue-600 font-semibold">{type.cost}</span>
                    </li>
                    )) ?? <li>Chưa có phương thức giao hàng.</li>} */}
                </ul>
                </div>

                {/* Payment Info */}
                <div>
                <h3 className="text-xl font-bold text-blue-600">Payment</h3>
                <p className="mt-2 text-neutral-700">
                    {/* {product.payments?.description ?? "Thông tin thanh toán chưa được cập nhật."} */}
                </p>
                <ul className="mt-4 space-y-2">
                    {/* {product.payments?.methods.map((method, idx) => (
                    <li key={idx} className="flex justify-between border-b py-2">
                        <span>{method.type}</span>
                        <span className="text-blue-600">{method.info}</span>
                    </li>
                    )) ?? <li>Chưa có phương thức thanh toán.</li>} */}
                </ul>
                </div>
            </div>
            )}

            {activeTab === "reviews" && (
            <div className="flex flex-wrap items-start gap-10 p-6 bg-white">
                <div className="flex-1 min-w-[300px]">
                {/* <h3 className="text-2xl font-bold text-neutral-950">
                    Customer Reviews ({product.reviews?.length ?? 0})
                </h3> */}

                {/* {product.reviews && product.reviews.length > 0 ? (
                    <div className="mt-4 space-y-4">
                    {productReviewList.map((review, idx) => (
                        <div key={idx} className="bg-white p-4 rounded shadow-sm">
                        <div className="flex justify-between">
                            <span className="font-semibold">{review.name}</span>
                            <div className="flex">
                            {[0, 1, 2, 3, 4].map((i) => (
                                <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 
                                    1 0 00.95.69h3.462c.969 0 1.371 1.24.588 
                                    1.81l-2.8 2.034a1 1 0 00-.364 
                                    1.118l1.07 3.292c.3.921-.755 1.688-1.54 
                                    1.118l-2.8-2.034a1 1 0 00-1.175 
                                    0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 
                                    1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 
                                    1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                            </div>
                        </div>
                        <p className="mt-2 text-neutral-700">{review.comment}</p>
                        </div>
                    ))}
                    </div>
                ) : (
                    <div className="text-center mt-4">
                    <p className="text-lg">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/182fee6bb5c14645ac126407c1ee5eb2/e4f5c67249d8d0ce8252af1b6b797001439e55a7?placeholderIfAbsent=true"
                        className="mt-6 w-[191px] mx-auto"
                        alt="No reviews"
                    />
                    </div>
                )} */}
                </div>

                {/* Form đánh giá */}
                <div className="flex-1 min-w-[300px]">
                <h3 className="text-xl font-medium text-neutral-950 mb-4">Bạn hài lòng về sản phẩm này?</h3>

                <form
                    onSubmit={(e) => {
                    e.preventDefault();
                    
                    if (!reviewName || !reviewComment || reviewRating === 0) {
                        alert("Vui lòng nhập đầy đủ thông tin và chọn số sao!");
                        return;
                    }
                    
                    const newReview = {
                        name: reviewName,
                        comment: reviewComment,
                        rating: reviewRating,
                    };
                    
                    api
                        .post(API_ENDPOINTS.updateProductReview(product.productID), newReview)
                        .then((res) => {
                        // const { review, rating, ratingCount } = res.data;
                    
                        // setProductReviewList((prev) => [...prev, review]);
                        // setUpdatedRating(rating);
                        // setUpdatedRatingCount(ratingCount);
                    
                        // reset form
                        setReviewName("");
                        setReviewComment("");
                        setReviewRating(0);
                        })
                        .catch((err) => {
                        console.error("Lỗi khi gửi đánh giá:", err);
                        alert("Gửi đánh giá thất bại.");
                        });
                    }}                
                    className="space-y-4"
                >
                    {/* Rating chọn sao */}
                    <div className="flex gap-2 items-center">
                    <div className="flex gap-1 items-center">
                        {[0, 1, 2, 3, 4].map((i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setReviewRating(i + 1)}
                            className="focus:outline-none"
                        >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-6 w-6 ${i < reviewRating ? 'text-yellow-400' : 'text-gray-300'}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 
                            0l1.07 3.292a1 1 0 00.95.69h3.462c.969 
                            0 1.371 1.24.588 1.81l-2.8 
                            2.034a1 1 0 00-.364 
                            1.118l1.07 3.292c.3.921-.755 
                            1.688-1.54 
                            1.118l-2.8-2.034a1 1 0 
                            00-1.175 0l-2.8 
                            2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 
                            1 0 00-.364-1.118L2.98 
                            8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 
                            1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </button>
                        ))}
                    </div>
                    </div>

                    <div>
                        {/* <label className="block text-md">Tên hiển thị</label> */}
                        <input
                            type="text"
                            value={reviewName}
                            onChange={(e) => setReviewName(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                            placeholder="Tên hiển thị"
                        />
                    </div>

                    <div>
                        {/* <label className="block text-md">Đánh giá của bạn</label> */}
                        <textarea
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded min-h-[100px]"
                            placeholder="Đánh giá của bạn"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="w-1/4 bg-blue-600 text-white py-2 rounded"
                        >
                            Gửi
                        </button>
                    </div>
                </form>
                </div>
            </div>
            )}

            {activeTab === 'ask' && (
            <div className="flex flex-wrap gap-10 p-6 bg-white">
                {/* Form hỏi bên trái */}
                <div className="flex-1 min-w-[300px]">
                <h3 className="text-xl font-medium text-neutral-950 mb-4">Bạn có câu hỏi?</h3>

                <form
                    onSubmit={(e) => {
                    e.preventDefault();
                    if (!qaName || !qaEmail || !qaQuestion) {
                        alert("Vui lòng điền đầy đủ thông tin!");
                        return;
                    }

                    const newQA: QA = {
                        name: qaName,
                        email: qaEmail,
                        question: qaQuestion,
                        answer: undefined,
                    };

                    api.post(API_ENDPOINTS.updateProductQuestion(product.productID), newQA)

                    // setQuestionList((prev) => [...prev, newQA]);

                    setQaName("");
                    setQaEmail("");
                    setQaQuestion("");
                    }}
                    className="space-y-4"
                >
                    <div>
                    {/* <label className="block font-medium">Name</label> */}
                    <input
                        type="text"
                        value={qaName}
                        onChange={(e) => setQaName(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded"
                        placeholder="Tên hiển thị"
                    />
                    </div>

                    <div>
                    {/* <label className="block font-medium">E-mail</label> */}
                    <input
                        type="email"
                        value={qaEmail}
                        onChange={(e) => setQaEmail(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded"
                        placeholder="Email"
                    />
                    </div>

                    <div>
                    {/* <label className="block font-medium">Your question</label> */}
                    <textarea
                        value={qaQuestion}
                        onChange={(e) => setQaQuestion(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded min-h-[100px]"
                        placeholder="Câu hỏi của bạn"
                    />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="w-1/4 bg-blue-600 text-white py-2 rounded"
                        >
                            Gửi
                        </button>
                    </div>
                </form>
                </div>

                {/* Danh sách câu hỏi bên phải */}
                <div className="flex-1 min-w-[300px]">
                {/* <h3 className="text-2xl font-bold text-neutral-950 mb-4">Previous Questions</h3> */}
                {/* {questionList.length === 0 ? (
                    <p className="text-gray-600">Chưa có câu hỏi nào.</p>
                ) : (
                    <div className="space-y-4">
                    {questionList.map((qa, idx) => (
                        <div key={idx} className="bg-white p-4 rounded shadow">
                        <p className="font-semibold">{qa.name} hỏi:</p>
                        <p className="text-gray-800 italic mt-1">"{qa.question}"</p>
                        {qa.answer && (
                            <div className="mt-2 border-t pt-2">
                            <p className="text-blue-700 font-semibold">Trả lời:</p>
                            <p className="text-gray-700">{qa.answer}</p>
                            </div>
                        )}
                        </div>
                    ))}
                    </div>
                )} */}
                </div>
            </div>
            )}
        </div>
        </section>
    );
}
