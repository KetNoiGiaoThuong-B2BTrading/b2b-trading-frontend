const API_BASE_URL = import.meta.env.VITE_PUBLIC_API_BASE_URL;
// console.log(API_BASE_URL);
export const API_ENDPOINTS = {
    // Auth
    register: `${API_BASE_URL}/auth/register`,
    login: `${API_BASE_URL}/auth/login`,
    logout: `${API_BASE_URL}/auth/logout`,

    updateUser: (user_id: number) => `${API_BASE_URL}/users/update/${user_id}`,

    // Companies
    getAllCompany: `${API_BASE_URL}/Company/all`,
    getCompanyInfoById: (user_id: number) => `${API_BASE_URL}/company/${user_id}`,
    updateCompanyInfo: (company_id: number) => `${API_BASE_URL}/company/${company_id}`,
    deleteCompanyInfo: (company_id: number) => `${API_BASE_URL}/company/${company_id}`,
    getInfoByEmailPhone: `${API_BASE_URL}/company/get-by-email-phone`,
    completeProfile: `${API_BASE_URL}/company/create`,
    getCompanyProfileById: (company_id: number) => `${API_BASE_URL}/Company/${company_id}`,
    // Products
    getAllProduct: `${API_BASE_URL}/product/all`,
    getProductById: (product_id: number) => `${API_BASE_URL}/product/${product_id}`,
    getProductsByCompanyId: (company_id: number) => `${API_BASE_URL}/product/get-by-company-id/${company_id}`,
    createProduct: `${API_BASE_URL}/product/create`,
    updateProduct: (product_id: number) => `${API_BASE_URL}/product/update/${product_id}`,
    deleteProduct: (product_id: number) => `${API_BASE_URL}/product/delete/${product_id}`,
    // Categories
    getAllCategory: `${API_BASE_URL}/Category/all`,
    // Events
    // getAllEvents: `${API_BASE_URL}/events`,
    // Articles
    // getAllArticles: `${API_BASE_URL}/articles`,
    // Brands
    // getAllBrands: `${API_BASE_URL}/brands`,
    // Colors
    // getAllColors: `${API_BASE_URL}/colors`,
    // getMaxPrice: `${API_BASE_URL}/maxPrice`,
    // getProductsByFilters: `${API_BASE_URL}/products/get-by-filters`,

    // Dashboard
    getDashboardStats: `${API_BASE_URL}/Admin/Dashboard/stats`,
    getRecentActivities: `${API_BASE_URL}/Admin/Dashboard/activities`,
    getDashboardCharts: `${API_BASE_URL}/Admin/Dashboard/charts`,

    // User Management
    getAllUsers: `${API_BASE_URL}/Admin/Users`,
    updateUserStatus: (userId: number) => `${API_BASE_URL}/Admin/Users/${userId}/status`,

    // Company Management
    getAllCompanies: `${API_BASE_URL}/Admin/Companies`,
    verifyCompany: (companyId: number) => `${API_BASE_URL}/Admin/Companies/${companyId}/verify`,

    // Category Management
    getAllCategories: `${API_BASE_URL}/Admin/Categories`,
    createCategory: `${API_BASE_URL}/Admin/Categories`,
    updateCategory: `${API_BASE_URL}/Admin/Categories`,
    deleteCategory: `${API_BASE_URL}/Admin/Categories`,

    // Category Management for business
    getAllCategoriesForBusiness: `${API_BASE_URL}/Category/all`,

    // Contract Management
    getAllContracts: `${API_BASE_URL}/Admin/Contracts`,
    updateContractStatus: (contractId: number) => `${API_BASE_URL}/Admin/Contracts/${contractId}/status`,

    // Product Management
    getAllProducts: `${API_BASE_URL}/Admin/Products`,
    getAllProductsForBusiness: `${API_BASE_URL}/product/all`,
    approveProduct: (productId: number) => `${API_BASE_URL}/Admin/Products/${productId}/approve`,

    // Quote Management
    getAllQuotes: `${API_BASE_URL}/admin/quotes`,
    updateQuoteStatus: (quoteId: number) => `${API_BASE_URL}/admin/quotes/${quoteId}/status`,

    // Content Management
    getAllContents: `${API_BASE_URL}/admin/contents`,
    createContent: `${API_BASE_URL}/admin/contents`,
    updateContent: (contentId: number) => `${API_BASE_URL}/admin/contents/${contentId}`,

    // Product Reviews & Questions
    updateProductReview: (productId: number) => `${API_BASE_URL}/products/${productId}/reviews`,
    updateProductQuestion: (productId: number) => `${API_BASE_URL}/products/${productId}/questions`,
    getProductQuestions: (productId: number) => `${API_BASE_URL}/products/${productId}/questions`,
};
