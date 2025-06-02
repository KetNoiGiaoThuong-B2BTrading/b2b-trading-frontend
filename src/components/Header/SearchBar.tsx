import { useState } from 'react';
// import { useNavigate } from "react-router";

export default function SearchBar() {
    const [keyword, setKeyword] = useState('');
    const [searchType, setSearchType] = useState('product');
    // const navigate = useNavigate();

    // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //   if (e.key === "Enter" && keyword.trim() !== "") {
    //     navigate(`/${searchType}s?search=${encodeURIComponent(keyword)}`);
    //   }
    // };


    return (
        <section className="relative flex flex-wrap gap-5 justify-between items-center px-20 w-full bg-gray-100 min-h-20 max-md:px-5 max-md:max-w-full">
            <div className=" font-bold text-2xl text-blue-800 flex items-center"><img src="b2b.png" alt="Logo" className="object-contain w-30"/><p>Kết Nối Giao Thương</p></div>

            <div className="flex flex-wrap gap-2 items-center self-stretch my-auto text-sm px-4 py-3 leading-6 bg-white rounded-lg min-w-60 text-zinc-500 w-[543px] max-md:max-w-full">
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="mr-2 text-sm text-neutral-700 focus:outline-none"
                >
                    <option value="product">Sản phẩm</option>
                    <option value="company">Công ty</option>
                </select>

                <input
                    type="text"
                    placeholder={`Tìm kiếm ${searchType}`}
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    //onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none outline-none text-neutral-800"
                />
                <img src="/header/search.png" className="w-6 aspect-square" alt="Search" />
            </div>
        </section>
    );
}
