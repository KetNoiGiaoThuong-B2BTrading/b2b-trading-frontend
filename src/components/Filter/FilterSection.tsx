// import { useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router';
// import api from '../../lib/axios';
// import { API_ENDPOINTS } from '../../lib/apiConfig';

// interface Subcategory {
//     categoryID: number;
//     categoryName: string;
// }

// interface Product {
//     productID: number;
//     image: string;
//     productName: string;
//     description: string;
//     unitPrice: number;
//     stockQuantity: number;
//     status: string;
//     createdDate: string;
// }

// interface Props {
//     onFilterChange: (products: Product[]) => void;
//     products: Product[];
// }

// const fallbackSubcategories: Subcategory[] = [
//     { categoryID: 1, categoryName: 'Lighting' },
//     { categoryID: 2, categoryName: 'Bathroom' },
//     { categoryID: 3, categoryName: 'Hardware' },
//     { categoryID: 4, categoryName: 'Kitchen' },
//     { categoryID: 5, categoryName: 'Other' },
// ];

// // const fallbackColors: string[] = ['red', 'brown', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'];

// const FilterSection = ({ onFilterChange, products }: Props) => {
//     const [searchParams] = useSearchParams();

//     const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
//     // const [colorFilters, setColorFilters] = useState<string[]>([]);
//     const [loading, setLoading] = useState(true);
//     // const [maxPrice, setMaxPrice] = useState(100);
//     const [range, setRange] = useState<[number, number]>([0, 10000000]);
//     const [filtersLoaded, setFiltersLoaded] = useState(false);

//     const [showSubcategories, setShowSubcategories] = useState(true);
//     const [showRange, setShowRange] = useState(true);
//     // const [showColorFilters, setShowColorFilters] = useState(true);
//     // const [showRatingFilters, setShowRatingFilters] = useState(true);

//     const [selectedSubcatIds, setSelectedSubcatIds] = useState<number[]>([]);
//     const [selectedFilterIds, setSelectedFilterIds] = useState<number[]>([]);
//     // const [selectedColors, setSelectedColors] = useState<string[]>([]);
//     // const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

//     const [minInput, setMinInput] = useState(range[0]);
//     const [maxInput, setMaxInput] = useState(range[1]);

//     useEffect(() => {
//         setMinInput(range[0]);
//         setMaxInput(range[1]);
//     }, [range]);

//     useEffect(() => {
//         const categoryFromUrl = searchParams.get('category');
//         if (categoryFromUrl && subcategories.length > 0) {
//             const matched = subcategories.find(
//                 (subcat) => subcat.categoryName.toLowerCase() === categoryFromUrl.toLowerCase(),
//             );
//             if (matched) {
//                 setSelectedSubcatIds([matched.categoryID]);
//             }
//         }
//     }, [searchParams, subcategories]);

//     useEffect(() => {
//         const savedFilters = localStorage.getItem('filters');
//         if (savedFilters) {
//             try {
//                 const parsed = JSON.parse(savedFilters);
//                 if (parsed.subcategories) setSelectedSubcatIds(parsed.subcategories);
//                 if (parsed.filters) setSelectedFilterIds(parsed.filters);
//                 // if (parsed.colors) setSelectedColors(parsed.colors);
//                 // if (parsed.ratings) setSelectedRatings(parsed.ratings);
//                 if (parsed.range) {
//                     setRange(parsed.range);
//                     setMinInput(parsed.range[0]);
//                     setMaxInput(parsed.range[1]);

//                     const activeFilters = {
//                         subcategories: parsed.subcategories || [],
//                         filters: parsed.filters || [],
//                         // colors: parsed.colors || [],
//                         // ratings: parsed.ratings || [],
//                         range: parsed.range,
//                     };
//                     fetchFilteredProducts(activeFilters);
//                 }
//             } catch (e) {
//                 console.error('Lỗi khi parse localStorage filters:', e);
//             }
//         }
//         setFiltersLoaded(true);
//     }, []);

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 const [subcatRes] = await Promise.all([
//                     api.get(API_ENDPOINTS.getAllCategories),
//                     // api.get(API_ENDPOINTS.getAllColors),
//                     // api.get(API_ENDPOINTS.getMaxPrice)
//                 ]);
//                 const allCategories = Array.isArray(subcatRes?.data) ? subcatRes.data : fallbackSubcategories;
//                 setSubcategories(allCategories.filter((c) => c.parentCategoryID !== null));
//                 // setColorFilters(Array.isArray(colorsRes?.data) ? colorsRes.data : fallbackColors);
//                 // const max = typeof priceRes?.data?.max === 'number' ? priceRes.data.max : 10000000;
//                 // setMaxPrice(max);
//                 // setRange((prev) => [prev[0], prev[1] > max ? max : prev[1]]);
//             } catch (err) {
//                 console.error('Error fetching filters:', err);
//                 setSubcategories(fallbackSubcategories);
//                 // setColorFilters(fallbackColors);
//                 // setMaxPrice(10000000);
//                 // setRange([0, 10000000]);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, []);

//     const fetchFilteredProducts = async (filters: any) => {
//         try {
//             // const res = await api.post(API_ENDPOINTS.getProductsByFilters, filters);
//             // const filtered = Array.isArray(res.data) ? res.data : res.data?.data || [];
//             const filtered = products.filter((p) => p.unitPrice >= filters.range[0] && p.unitPrice <= filters.range[1]);
//             onFilterChange(filtered);
//         } catch (err) {
//             console.error('Failed to fetch filtered products:', err);
//             const filteredFallback = products.filter(
//                 (p) => p.unitPrice >= filters.range[0] && p.unitPrice <= filters.range[1],
//             );
//             onFilterChange(filteredFallback);
//         }
//     };

//     useEffect(() => {
//         if (!filtersLoaded) return;

//         const activeFilters = {
//             subcategories: selectedSubcatIds,
//             filters: selectedFilterIds,
//             // colors: selectedColors,
//             // ratings: selectedRatings,
//             range,
//         };
//         fetchFilteredProducts(activeFilters);
//         localStorage.setItem('filters', JSON.stringify(activeFilters));
//     }, [selectedSubcatIds, selectedFilterIds, range]);

//     const handleClearAll = () => {
//         setSelectedSubcatIds([]);
//         setSelectedFilterIds([]);
//         // setSelectedColors([]);
//         // setSelectedRatings([]);
//         setRange([0, 10000000]);
//         localStorage.removeItem('filters');
//     };

//     const handleRangeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
//         if (e.key === 'Enter') {
//             const activeFilters = {
//                 subcategories: selectedSubcatIds,
//                 filters: selectedFilterIds,
//                 // colors: selectedColors,
//                 // ratings: selectedRatings,
//                 range,
//             };
//             fetchFilteredProducts(activeFilters);
//         }
//     };

//     if (loading || !filtersLoaded) return <div className="px-6 py-4 text-gray-500 text-sm">Loading filters...</div>;

//     return (
//         <div className="w-full md:w-71 px-7 py-1 shadow-lg">
//             <div className="flex justify-between items-center mt-2 mb-4">
//                 <p className="font-medium text-xl">Bộ lọc</p>
//                 <span className="text-blue-600 text-sm cursor-pointer" onClick={handleClearAll}>
//                     Xóa hết
//                 </span>
//             </div>
//             {/* Subcategories */}
//             <div className="mb-6">
//                 <div
//                     className="flex justify-between items-center mb-2 cursor-pointer"
//                     onClick={() => setShowSubcategories((prev) => !prev)}
//                 >
//                     <h2 className="font-medium">Lĩnh vực</h2>
//                     <svg
//                         className={`h-4 w-4 transition-transform ${showSubcategories ? 'rotate-0 text-blue-600' : 'rotate-180'}`}
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                     >
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                     </svg>
//                 </div>
//                 {showSubcategories && (
//                     <ul className="mt-2">
//                         {subcategories.map((subcat) => (
//                             <li key={subcat.categoryID} className="flex items-center justify-between py-1">
//                                 <label className="flex items-center">
//                                     <input
//                                         type="checkbox"
//                                         className="mr-2"
//                                         checked={selectedSubcatIds.includes(subcat.categoryID)}
//                                         onChange={(e) => {
//                                             if (e.target.checked)
//                                                 setSelectedSubcatIds((prev) => [...prev, subcat.categoryID]);
//                                             else
//                                                 setSelectedSubcatIds((prev) =>
//                                                     prev.filter((id) => id !== subcat.categoryID),
//                                                 );
//                                         }}
//                                     />
//                                     <span>{subcat.categoryName}</span>
//                                 </label>
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>

//             {/* Range */}
//             <div className="mb-6">
//                 <div
//                     className="flex justify-between items-center mb-2 cursor-pointer"
//                     onClick={() => setShowRange((prev) => !prev)}
//                 >
//                     <h3 className="font-medium">Giá</h3>
//                     <svg
//                         className={`h-4 w-4 transition-transform ${showRange ? 'rotate-0 text-blue-600' : 'rotate-180'}`}
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                     >
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                     </svg>
//                 </div>

//                 {showRange && (
//                     <div className="flex gap-2 items-center mb-2">
//                         <input
//                             type="number"
//                             value={minInput}
//                             onChange={(e) => {
//                                 const value = Number(e.target.value);
//                                 setMinInput(value);
//                                 setRange([value, maxInput]);
//                             }}
//                             onKeyDown={handleRangeEnter}
//                             className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
//                             placeholder="Từ"
//                         />
//                         <span className="text-gray-400">–</span>
//                         <input
//                             type="number"
//                             value={maxInput}
//                             onChange={(e) => {
//                                 const value = Number(e.target.value);
//                                 setMaxInput(value);
//                                 setRange([minInput, value]);
//                             }}
//                             onKeyDown={handleRangeEnter}
//                             className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
//                             placeholder="Đến"
//                         />
//                     </div>
//                 )}
//             </div>

//             {/* Color Filters */}
//             {/* <div className="mb-6">
//                 <div className="flex justify-between items-center mb-2 cursor-pointer" onClick={() => setShowColorFilters(prev => !prev)}>
//                 <h3 className="font-medium">Màu sắc</h3>
//                 <svg className={`h-4 w-4 transition-transform ${showColorFilters ? 'rotate-0 text-blue-600' : 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//                 </div>

//                 {showColorFilters && (
//                 <div className="grid grid-cols-4 gap-2">
//                     {colorFilters.map((color, idx) => {
//                     const isSelected = selectedColors.includes(color);
//                     return (
//                         <div
//                         key={idx}
//                         onClick={() =>
//                             setSelectedColors(prev =>
//                             isSelected ? prev.filter(c => c !== color) : [...prev, color]
//                             )
//                         }
//                         className={`w-6 h-6 rounded-full border-2 cursor-pointer transition
//                             ${isSelected ? 'border-blue-600' : 'border-gray-300'} hover:border-blue-400`}
//                         style={{ backgroundColor: color }}
//                         ></div>
//                     );
//                     })}
//                 </div>
//                 )}
//             </div> */}

//             {/* Rating */}
//             {/* <div className="mb-2">
//                 <div className="flex justify-between items-center mb-2 cursor-pointer" onClick={() => setShowRatingFilters(prev => !prev)} >
//                 <h3 className="font-medium">Đánh giá</h3>
//                 <svg className={`h-4 w-4 transition-transform ${showRatingFilters ? 'rotate-0 text-blue-600' : 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//                 </div>

//                 {showRatingFilters && (
//                 <ul>
//                     {[5, 4, 3, 2, 1].map((rating) => (
//                     <li key={rating} className="flex items-center justify-between py-1">
//                         <label className="flex items-center">
//                         <input
//                             type="checkbox"
//                             className="mr-2"
//                             checked={selectedRatings.includes(rating)}
//                             onChange={(e) => {
//                             if (e.target.checked)
//                                 setSelectedRatings(prev => [...prev, rating]);
//                             else
//                                 setSelectedRatings(prev => prev.filter(r => r !== rating));
//                             }}
//                         />
//                         <div className="flex">
//                             {Array(5)
//                             .fill(0)
//                             .map((_, i) => (
//                                 <svg
//                                 key={i}
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
//                                 viewBox="0 0 20 20"
//                                 fill="currentColor"
//                                 >
//                                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8
//                                 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54
//                                 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8
//                                 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0
//                                 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0
//                                 00.951-.69l1.07-3.292z" />
//                                 </svg>
//                             ))}
//                         </div>
//                         </label>
//                         <span className="text-gray-500 text-sm">{rating * 5}</span>
//                     </li>
//                     ))}
//                 </ul>
//                 )}
//             </div> */}
//         </div>
//     );
// };

// export default FilterSection;
