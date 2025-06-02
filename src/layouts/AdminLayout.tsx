import { Outlet } from "react-router";
import Sidebar from "../components/admin/dash/Sidebar";

export default function AdminLayout() {
    return (
        <div className="container-fluid">
            <div className="flex">
                <Sidebar />
                <div style={{ width: 'calc(100vw - 250px)' }} className="p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}