import { Outlet } from 'react-router';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

export default function AppLayout() {
    return (
        <div className="w-full mx-auto">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}
