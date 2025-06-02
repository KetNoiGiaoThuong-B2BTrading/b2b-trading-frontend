'use client';

import SearchBar from "./SearchBar";
import TopNavigationBar from "./TopNavigationBar";
import CategoryNav from "./CategoryNav";

const Header = () => {
    return (
    <div className="w-full">
        <TopNavigationBar />
        <SearchBar />
        <CategoryNav/>
    </div>
    );
};

export default Header;
