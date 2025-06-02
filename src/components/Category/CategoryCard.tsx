import React from 'react';

interface CategoryCardProps {
    categoryID: number;
    categoryName: string;
    categoryImage: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ categoryName, categoryImage }) => {
    return (
        <div className="relative rounded-lg overflow-hidden h-40 group hover:shadow-lg transition-shadow duration-300">
            <img src={categoryImage} alt={categoryName} className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110 group-hover:brightness-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 group-hover:opacity-90"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center">
                <span className="font-medium">{categoryName}</span>
            </div>
        </div>
    );
};
export default CategoryCard;
