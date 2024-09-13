import { AdminForm } from "../components/auth/meseroForm/AdminForm";
import { useAuthStore } from "../store/useAuthStore";
import { AdminDashboard } from "../views/adminView/AdminDashboard";

export const AdminScreen = () => {

    const { adminLogin } = useAuthStore();

    return (
        <div>
            {
                (adminLogin ? <AdminDashboard /> : <AdminForm />)
            }

        </div>
    );
};
