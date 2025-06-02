'use client';

import { useState } from "react";

const Footer = () => {
    const [accepted, setAccepted] = useState(false);

    return (
        <footer className="bg-gray-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_4fr] gap-8">
                    <div className="w-[285px]">
                        <h2 className="text-xl font-bold leading-tight text-neutral-950">Sign up for news</h2>
                        <p className="mt-6 text-sm leading-6 text-neutral-950">
                            Keep up to date with the latest product launches and news. Find out more about our brands
                            and get special promo codes.
                        </p>
                        <input
                            type="email"
                            placeholder="Your e-mail address"
                            className="flex-1 shrink gap-2 self-stretch px-4 py-3 mt-6 max-w-full text-sm leading-6 bg-white rounded-lg border border-solid basis-0 border-[color:var(--Light-Colors-Platinum,#EAECEE)] text-zinc-500 w-[301px]"
                        />
                        <div className="mt-6 w-full max-w-[301px]">
                            <button
                                className={`flex gap-2.5 justify-center items-center px-8 py-4 w-full text-base font-medium leading-none text-white min-h-12 rounded-[30px] max-md:px-5 ${accepted ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 opacity-50 cursor-not-allowed'}`}>
                                <span className="gap-10 self-stretch my-auto">Sign up for newsletter</span>
                            </button>
                            <div className="flex gap-2 items-center mt-4 w-full">
                                <input type="checkbox" id="accept" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="w-4 h-4 accent-blue-600"/>
                                <label htmlFor="accept" className="text-sm leading-6 text-neutral-950 w-[277px]">
                                    I accept <span className="text-blue-600">the personal data management.</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div>
                            <h3 className="font-bold text-lg mb-4">How to buy</h3>
                            <ul className="text-sm text-gray-600 space-y-2">
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        Payment methods
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        Order and pick up
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        Delivery
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        Shopping over the phone
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        Returns
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-4">Help</h3>
                            <ul className="text-sm text-gray-600 space-y-2">
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        Contact
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        Online help
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        Our stores
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        Give feedback
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-4">Services</h3>
                            <ul className="text-sm text-gray-600 space-y-2">
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        Transport
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        Repair service
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        Best personal advice service
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        Recycling and disposal service
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        Dismantling and assembly
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-4">About</h3>
                            <ul className="text-sm text-gray-600 space-y-2">
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        About us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        Our stores
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        Regulations
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        Terms and Conditions
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        Return of used equipment
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-blue-600">
                                        Personal Data Request
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-4 border-t border-gray-200 flex items-center justify-between">
                    <div className="text-sm text-gray-500">© 2025 Kết Nối Giao Thương</div>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-500 hover:text-gray-800">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-800">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.382 4.482C7.69 8.095 4.067 6.13 1.64 3.16a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                            </svg>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-800">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
