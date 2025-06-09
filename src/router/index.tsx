import { createBrowserRouter } from 'react-router';

import App from '../layouts/AppLayout';
import AdminLayout from '../layouts/AdminLayout';

import HomePage from '../pages/home/HomePage';
import AboutPage from '../pages/home/AboutPage';
import LoginPage from '../pages/auth/LoginPage';
// import RegisterPage from '../pages/auth/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage';

import DashboardPage from '../pages/admin/DashboardPage';
import AccountPage from '../pages/admin/AccountPage';
import MerchandisePage from '../pages/admin/MerchandisePage';
import ContractPage from '../pages/admin/ContractPage';
import PaymentPage from '../pages/admin/PaymentPage';
import ReportPage from '../pages/admin/ReportPage';
import SettingPage from '../pages/admin/SettingPage';

import AccountInfo from '../components/Profile/AccountInfo';
// import CompleteProfilePage from '../pages/company/CompleteProfilePage';
import CompanyInfo from '../components/Profile/CompanyInfo';
import CompaniesPage from '../pages/company/CompaniesPage';
import CompanyProfilePage from '../pages/company/CompanyProfilePage';
import CategoryPage from '../pages/admin/CategoryPage';
import CategoriesPage from '../pages/category/CategoriesPage';
import ProductsPage from '../pages/product/ProductsPage';
import ProductDetailPage from '../pages/product/ProductDetailPage';
import ProfilePage from '../pages/home/ProfilePage';
import CombinedRegisterPage from '../pages/auth/CombinedRegisterPage';

const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            { index: true, Component: HomePage },
            { path: 'about', Component: AboutPage },
            { path: 'categories', Component: CategoriesPage },
            {
                path: 'products',
                children: [
                    { index: true, Component: ProductsPage },
                    { path: ':productId', Component: ProductDetailPage },
                ],
            },
            {
                path: 'companies',
                children: [
                    { index: true, Component: CompaniesPage },
                    { path: ':companyId', Component: CompanyProfilePage },
                    { path: ':companyId/enterprise', Component: HomePage },
                ],
            },
            {
                path: 'profiles',
                Component: ProfilePage,
                children: [
                    { path: 'account', Component: AccountInfo },
                    { path: 'company', Component: CompanyInfo },
                ],
            },
            {
                path: 'auth',
                children: [
                    { path: 'login', Component: LoginPage },
                    { path: 'register', Component: CombinedRegisterPage },
                    // { path: 'complete-profile', Component: CompleteProfilePage },
                ],
            },
            { path: '*', Component: NotFoundPage },
        ],
    },
    {
        path: '/admin/dashboard',
        Component: AdminLayout,
        children: [
            { index: true, Component: DashboardPage },
            { path: 'account', Component: AccountPage },
            { path: 'merchandise', Component: MerchandisePage },
            { path: 'category', Component: CategoryPage },
            { path: 'contract', Component: ContractPage },
            { path: 'payments', Component: PaymentPage },
            { path: 'reports', Component: ReportPage },
            { path: 'settings', Component: SettingPage },
            { path: '*', Component: NotFoundPage },
        ],
    },
]);

export default router;
